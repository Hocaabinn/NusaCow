use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};

use crate::errors::NusaCowError;
use crate::state::{
    CowAccount, CowStatus, BREED_TYPE_MAX_LEN, LOCATION_CODE_MAX_LEN, URI_MAX_LEN,
};

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct InitializeCowParams {
    pub price_per_share: u64,
    pub total_shares: u64,
    pub initial_weight: u32,
    pub breed_type: String,
    pub location_code: String,
    pub certificate_uri: String,
}

#[derive(Accounts)]
#[instruction(params: InitializeCowParams)]
pub struct InitializeCow<'info> {
    #[account(mut)]
    pub farmer: Signer<'info>,
    #[account(
        init,
        payer = farmer,
        space = CowAccount::SPACE,
        seeds = [
            CowAccount::SEED_PREFIX,
            farmer.key().as_ref(),
            params.breed_type.as_bytes(),
            params.location_code.as_bytes(),
        ],
        bump
    )]
    pub cow_account: Account<'info, CowAccount>,
    #[account(
        init,
        payer = farmer,
        token::mint = usdc_mint,
        token::authority = cow_account,
        seeds = [b"vault", cow_account.key().as_ref()],
        bump
    )]
    pub cow_vault: Account<'info, TokenAccount>,
    pub usdc_mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[event]
pub struct CowInitialized {
    pub cow_account: Pubkey,
    pub owner: Pubkey,
    pub target_amount: u64,
    pub total_shares: u64,
}

pub fn handle_initialize_cow(
    ctx: Context<InitializeCow>,
    params: InitializeCowParams,
) -> Result<()> {
    require!(params.price_per_share > 0, NusaCowError::InvalidPricePerShare);
    require!(params.total_shares > 0, NusaCowError::InvalidTotalShares);
    require!(params.initial_weight > 0, NusaCowError::InvalidInitialWeight);
    require!(
        !params.breed_type.trim().is_empty() && params.breed_type.len() <= BREED_TYPE_MAX_LEN,
        NusaCowError::InvalidBreedType
    );
    require!(
        !params.location_code.trim().is_empty()
            && params.location_code.len() <= LOCATION_CODE_MAX_LEN,
        NusaCowError::InvalidLocationCode
    );
    require!(
        !params.certificate_uri.trim().is_empty() && params.certificate_uri.len() <= URI_MAX_LEN,
        NusaCowError::InvalidCertificateUri
    );

    let target_amount = params
        .price_per_share
        .checked_mul(params.total_shares)
        .ok_or(NusaCowError::MathOverflow)?;

    let cow = &mut ctx.accounts.cow_account;
    cow.owner = ctx.accounts.farmer.key();
    cow.vault = ctx.accounts.cow_vault.key();
    cow.status = CowStatus::Funding;
    cow.price_per_share = params.price_per_share;
    cow.total_shares = params.total_shares;
    cow.shares_sold = 0;
    cow.target_amount = target_amount;
    cow.collected_amount = 0;
    cow.total_profit_distributed = 0;
    cow.initial_weight = params.initial_weight;
    cow.breed_type = params.breed_type;
    cow.location_code = params.location_code;
    cow.certificate_uri = params.certificate_uri;
    cow.bump = ctx.bumps.cow_account;

    emit!(CowInitialized {
        cow_account: cow.key(),
        owner: cow.owner,
        target_amount,
        total_shares: cow.total_shares,
    });

    Ok(())
}
