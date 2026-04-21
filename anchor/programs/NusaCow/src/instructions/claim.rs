use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

use crate::errors::NusaCowError;
use crate::state::{CowAccount, CowStatus};

#[derive(Accounts)]
pub struct DistributeProfit<'info> {
    #[account(mut)]
    pub farmer: Signer<'info>,
    #[account(mut, has_one = owner @ NusaCowError::Unauthorized)]
    pub cow_account: Account<'info, CowAccount>,
    /// CHECK: Matches `farmer` via `has_one = owner`; kept explicit for readability.
    #[account(address = cow_account.owner)]
    pub owner: UncheckedAccount<'info>,
    #[account(mut, constraint = cow_vault.key() == cow_account.vault @ NusaCowError::InvalidMint)]
    pub cow_vault: Account<'info, TokenAccount>,
    #[account(mut, constraint = farmer_token_account.owner == farmer.key() @ NusaCowError::Unauthorized)]
    pub farmer_token_account: Account<'info, TokenAccount>,
    #[account(constraint = farmer_token_account.mint == usdc_mint.key() @ NusaCowError::InvalidMint)]
    pub usdc_mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
}

#[event]
pub struct ProfitDistributed {
    pub cow_account: Pubkey,
    pub owner: Pubkey,
    pub amount: u64,
    pub total_profit_distributed: u64,
}

pub fn handle_distribute_profit(ctx: Context<DistributeProfit>, amount: u64) -> Result<()> {
    require!(amount > 0, NusaCowError::InvalidProfitAmount);
    require!(
        ctx.accounts.farmer.key() == ctx.accounts.cow_account.owner,
        NusaCowError::Unauthorized
    );

    let transfer_accounts = Transfer {
        from: ctx.accounts.farmer_token_account.to_account_info(),
        to: ctx.accounts.cow_vault.to_account_info(),
        authority: ctx.accounts.farmer.to_account_info(),
    };
    token::transfer(
        CpiContext::new(ctx.accounts.token_program.to_account_info(), transfer_accounts),
        amount,
    )?;

    let cow = &mut ctx.accounts.cow_account;
    cow.total_profit_distributed = cow
        .total_profit_distributed
        .checked_add(amount)
        .ok_or(NusaCowError::MathOverflow)?;

    if cow.status == CowStatus::Funding && cow.shares_sold == cow.total_shares {
        cow.status = CowStatus::Active;
    }

    emit!(ProfitDistributed {
        cow_account: cow.key(),
        owner: cow.owner,
        amount,
        total_profit_distributed: cow.total_profit_distributed,
    });

    Ok(())
}
