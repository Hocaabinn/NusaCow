use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

use crate::errors::NusaCowError;
use crate::state::{CowAccount, CowStatus, InvestmentState};

#[derive(Accounts)]
pub struct InvestInCow<'info> {
    #[account(mut)]
    pub investor: Signer<'info>,
    #[account(
        mut,
        seeds = [
            CowAccount::SEED_PREFIX,
            cow_account.owner.as_ref(),
            cow_account.breed_type.as_bytes(),
            cow_account.location_code.as_bytes(),
        ],
        bump = cow_account.bump
    )]
    pub cow_account: Account<'info, CowAccount>,
    #[account(
        init,
        payer = investor,
        space = InvestmentState::SPACE,
        seeds = [
            InvestmentState::SEED_PREFIX,
            cow_account.key().as_ref(),
            investor.key().as_ref(),
        ],
        bump
    )]
    pub investment_state: Account<'info, InvestmentState>,
    #[account(mut, constraint = cow_vault.key() == cow_account.vault @ NusaCowError::InvalidMint)]
    pub cow_vault: Account<'info, TokenAccount>,
    #[account(mut, constraint = investor_token_account.owner == investor.key() @ NusaCowError::Unauthorized)]
    pub investor_token_account: Account<'info, TokenAccount>,
    #[account(constraint = investor_token_account.mint == usdc_mint.key() @ NusaCowError::InvalidMint)]
    pub usdc_mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[event]
pub struct InvestedInCow {
    pub cow_account: Pubkey,
    pub investor: Pubkey,
    pub shares_purchased: u64,
    pub payment_amount: u64,
}

pub fn handle_invest_in_cow(ctx: Context<InvestInCow>, shares_to_buy: u64) -> Result<()> {
    require!(shares_to_buy > 0, NusaCowError::InvalidShareAmount);

    let cow = &mut ctx.accounts.cow_account;
    require!(cow.status == CowStatus::Funding, NusaCowError::CowNotFunding);

    let updated_shares = cow
        .shares_sold
        .checked_add(shares_to_buy)
        .ok_or(NusaCowError::MathOverflow)?;
    require!(
        updated_shares <= cow.total_shares,
        NusaCowError::InsufficientSharesAvailable
    );

    let payment_amount = shares_to_buy
        .checked_mul(cow.price_per_share)
        .ok_or(NusaCowError::MathOverflow)?;

    let transfer_accounts = Transfer {
        from: ctx.accounts.investor_token_account.to_account_info(),
        to: ctx.accounts.cow_vault.to_account_info(),
        authority: ctx.accounts.investor.to_account_info(),
    };
    token::transfer(
        CpiContext::new(ctx.accounts.token_program.to_account_info(), transfer_accounts),
        payment_amount,
    )?;

    let investment_state = &mut ctx.accounts.investment_state;
    investment_state.investor = ctx.accounts.investor.key();
    investment_state.cow_account = cow.key();
    investment_state.shares_owned = 0;
    investment_state.total_claimed_profit = 0;
    investment_state.bump = ctx.bumps.investment_state;

    investment_state.shares_owned = investment_state
        .shares_owned
        .checked_add(shares_to_buy)
        .ok_or(NusaCowError::MathOverflow)?;

    cow.shares_sold = updated_shares;
    cow.collected_amount = cow
        .collected_amount
        .checked_add(payment_amount)
        .ok_or(NusaCowError::MathOverflow)?;

    if cow.shares_sold == cow.total_shares {
        cow.status = CowStatus::Active;
    }

    emit!(InvestedInCow {
        cow_account: cow.key(),
        investor: ctx.accounts.investor.key(),
        shares_purchased: shares_to_buy,
        payment_amount,
    });

    Ok(())
}
