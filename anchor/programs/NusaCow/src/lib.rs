use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod state;

pub use instructions::claim::*;
pub use instructions::init::*;
pub use instructions::invest::*;

declare_id!("Fg6PaFpoGXkYsidMpWxTWqkZkD7jJ9z5v7hK6W1n1BfP");

#[program]
pub mod nusa_cow {
    use super::*;

    pub fn initialize_cow(ctx: Context<InitializeCow>, params: InitializeCowParams) -> Result<()> {
        instructions::init::handle_initialize_cow(ctx, params)
    }

    pub fn invest_in_cow(ctx: Context<InvestInCow>, shares_to_buy: u64) -> Result<()> {
        instructions::invest::handle_invest_in_cow(ctx, shares_to_buy)
    }

    pub fn distribute_profit(ctx: Context<DistributeProfit>, amount: u64) -> Result<()> {
        instructions::claim::handle_distribute_profit(ctx, amount)
    }
}
