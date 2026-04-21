use anchor_lang::prelude::*;

pub const BREED_TYPE_MAX_LEN: usize = 32;
pub const LOCATION_CODE_MAX_LEN: usize = 16;
pub const URI_MAX_LEN: usize = 128;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Debug, PartialEq, Eq, InitSpace)]
pub enum CowStatus {
    Funding,
    Active,
    ReadyForSale,
    Closed,
}

#[account]
#[derive(InitSpace)]
pub struct CowAccount {
    pub owner: Pubkey,
    pub vault: Pubkey,
    pub status: CowStatus,
    pub price_per_share: u64,
    pub total_shares: u64,
    pub shares_sold: u64,
    pub target_amount: u64,
    pub collected_amount: u64,
    pub total_profit_distributed: u64,
    pub initial_weight: u32,
    #[max_len(BREED_TYPE_MAX_LEN)]
    pub breed_type: String,
    #[max_len(LOCATION_CODE_MAX_LEN)]
    pub location_code: String,
    #[max_len(URI_MAX_LEN)]
    pub certificate_uri: String,
    pub bump: u8,
}

impl CowAccount {
    pub const SEED_PREFIX: &'static [u8] = b"cow";
    pub const SPACE: usize = 8 + Self::INIT_SPACE;
}

#[account]
#[derive(InitSpace)]
pub struct InvestmentState {
    pub investor: Pubkey,
    pub cow_account: Pubkey,
    pub shares_owned: u64,
    pub total_claimed_profit: u64,
    pub bump: u8,
}

impl InvestmentState {
    pub const SEED_PREFIX: &'static [u8] = b"investment";
    pub const SPACE: usize = 8 + Self::INIT_SPACE;
}
