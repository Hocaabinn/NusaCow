# NusaCow

NusaCow is a Solana-based cattle investment platform that lets farmers raise capital by turning livestock into fractional onchain assets. The project pairs an Anchor smart contract with a Next.js frontend so users can create listings, buy shares, and track funding and profit distribution in one flow.

## Project Name & Description

**Project Name:** NusaCow

**Description:**  
NusaCow is a blockchain-based investment platform for real-world cattle financing. It supports a simple lifecycle:

1. A farmer initializes a cow campaign with metadata, share pricing, and a vault.
2. An investor buys fractional shares in the cow.
3. The farmer distributes profit back into the campaign vault.

The repository is built as a demo-ready Solana dApp for pitching, prototyping, and extending into a production product.

## Features

- Create cow campaigns onchain with structured metadata.
- Purchase fractional shares in an active cow listing.
- Track funding progress, share allocation, and campaign status.
- Distribute profit into the campaign vault from the farmer side.
- Wallet-connected frontend with Phantom support.
- Local IDL wiring for frontend and program metadata.
- Clean dashboard and marketplace views for demos and user flows.

## Tech Stack

- **Smart contract:** Anchor, Rust, Solana Program Library
- **Frontend:** Next.js 14, React 18, TypeScript
- **Wallet integration:** `@solana/wallet-adapter-react`, `@solana/wallet-adapter-wallets`
- **Chain access:** `@solana/web3.js`, `@coral-xyz/anchor`
- **Styling and UI:** Tailwind CSS, Framer Motion
- **Testing:** Anchor test framework, Mocha, Chai, ts-mocha
- **Build tools:** PostCSS, Autoprefixer

## Installation

### Prerequisites

- Node.js and npm
- Rust
- Solana CLI
- Anchor CLI
- A Solana wallet such as Phantom

### 1. Clone the repository

```bash
git clone <repo-url>
cd NusaCow
```

### 2. Install Anchor workspace dependencies

```bash
cd anchor
yarn install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Build and test the program

```bash
cd ../anchor
anchor build
anchor test
```

### 5. Run the frontend

```bash
cd ../frontend
npm run dev
```

Open the app at the local URL printed by Next.js.

## Usage

### Smart contract flow

The onchain program exposes three main instructions:

- `initialize_cow` to create a new cow campaign
- `invest_in_cow` to buy shares in a campaign
- `distribute_profit` to deposit profit into the vault

### Frontend flow

- Open the homepage to see the featured cow campaign.
- Visit the listing page to browse active campaigns.
- Open the dashboard to review the campaign flow and farmer console.
- Connect a Phantom wallet to interact with Solana-aware features.

### Example commands

```bash
# build the Anchor program
cd anchor
anchor build

# run the program tests
anchor test

# start the frontend
cd ../frontend
npm run dev
```

## Configuration

The frontend reads the following environment variable:

- `NEXT_PUBLIC_SOLANA_RPC_URL` - optional Solana RPC endpoint. If omitted, the app falls back to `https://api.devnet.solana.com`.

Additional Solana/Anchor configuration lives in `anchor/Anchor.toml`:

- default cluster: `Localnet`
- local wallet path: `~/.config/solana/id.json`
- local program id: `Fg6PaFpoGXkYsidMpWxTWqkZkD7jJ9z5v7hK6W1n1BfP`

Notes:

- The frontend currently uses a lightweight local IDL stub in `idl/NusaCow.json`.
- After rebuilding the program, copy the generated IDL into `idl/NusaCow.json` if you want the UI to stay aligned with the latest contract interface.
- Remote images are enabled in `frontend/next.config.mjs`, so the listing cards can load hosted livestock photos.

## Contributing

Contributions are welcome. A good workflow is:

1. Create a feature branch.
2. Make focused changes in either `anchor/` or `frontend/`.
3. Run the relevant build and test commands.
4. Keep changes small, readable, and aligned with the existing code style.
5. Open a pull request with a clear summary of the behavior changed.

Please include tests or validation steps when you modify onchain logic, wallet flows, or shared program metadata.

## License

No license file is currently included in this repository. Until a license is added, the project should be treated as all rights reserved.

Copyright © 2026 NusaCow contributors.
