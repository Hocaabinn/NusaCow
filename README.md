# NusaCow

NusaCow is a Solana-based cattle investment platform that lets farmers raise capital by fractionalizing livestock into onchain shares. This repository is structured for pitching, prototyping, and extending into a production-ready dApp.

## Project Structure

```text
NusaCow
├── anchor/      # Anchor workspace for the Solana smart contract
├── frontend/    # Next.js 14 app for dashboard, listing, and wallet UX
├── idl/         # Generated Anchor IDL copied for frontend consumption
└── README.md    # Project overview for judges and contributors
```

## Smart Contract

The Anchor program is split into focused modules:

- `init.rs`: initializes a cow campaign and creates its vault.
- `invest.rs`: records investor participation and transfers funds into the vault.
- `claim.rs`: handles farmer-side profit distribution into the vault.
- `state.rs`: defines `CowAccount`, `InvestmentState`, and enums.
- `errors.rs`: centralizes custom Anchor error codes.

## Frontend

The Next.js app includes:

- landing page and listing flow
- dashboard shell for farmer and judge demos
- Solana wallet provider setup
- program metadata helpers using the local IDL
- reusable `NusaCowInvestmentCard` for hero and listing views

## Getting Started

### Anchor

```bash
cd anchor
yarn install
anchor build
anchor test
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Notes

- `idl/NusaCow.json` is currently a placeholder so the frontend wiring has a stable interface.
- Replace the placeholder IDL after running `anchor build`.
- The smart contract is scaffolded for the main business flow, but investor profit claim settlement logic can be added as the next milestone.
