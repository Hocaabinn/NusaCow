use anchor_lang::prelude::*;

#[error_code]
pub enum NusaCowError {
    #[msg("Only the cow owner can perform this action.")]
    Unauthorized,
    #[msg("Price per share must be greater than zero.")]
    InvalidPricePerShare,
    #[msg("Total shares must be greater than zero.")]
    InvalidTotalShares,
    #[msg("Initial weight must be greater than zero.")]
    InvalidInitialWeight,
    #[msg("Breed type is required.")]
    InvalidBreedType,
    #[msg("Location code is required.")]
    InvalidLocationCode,
    #[msg("Certificate URI is required.")]
    InvalidCertificateUri,
    #[msg("Share amount must be greater than zero.")]
    InvalidShareAmount,
    #[msg("Profit amount must be greater than zero.")]
    InvalidProfitAmount,
    #[msg("Cow is not currently fundraising.")]
    CowNotFunding,
    #[msg("Not enough shares are available.")]
    InsufficientSharesAvailable,
    #[msg("Math overflow occurred.")]
    MathOverflow,
    #[msg("The provided token account uses the wrong mint.")]
    InvalidMint,
}
