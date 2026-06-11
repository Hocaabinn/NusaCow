# NusaCow 🐄

> **Decentralized cattle investment platform for Indonesian farmers — built on Solana.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-nusacow--rwa.vercel.app-blue)](https://nusacow-rwa.vercel.app)
[![Built on Solana](https://img.shields.io/badge/chain-Solana-9945FF)](https://solana.com)
[![Framework: Anchor](https://img.shields.io/badge/contract-Anchor-orange)](https://www.anchor-lang.com/)

NusaCow is a Solana-based cattle investment platform that lets farmers raise capital by turning livestock into fractional onchain assets. The project pairs an Anchor smart contract with a Next.js frontend so users can create listings, buy shares, and track funding and profit distribution in one flow.

---

## The Problem

Over 26 million smallholder farming households in Indonesia rely on cattle as a primary income source — yet access to formal livestock financing remains severely limited. Most farmers depend on informal lenders charging 40–60% annual interest, or wait years to save capital independently.

NusaCow addresses this directly: farmers tokenize their cattle as on-chain assets, investors buy fractional shares transparently, and profits are distributed back through the smart contract once the cattle cycle completes.

---

## Live Demo

🌐 **[nusacow-rwa.vercel.app](https://nusacow-rwa.vercel.app)**

> Screenshots below. Connect a Phantom wallet on Solana Devnet to interact with the full flow.

### Homepage — Featured Campaign

![NusaCow Homepage](https://nusacow-rwa.vercel.app/og-image.png)

> _The homepage shows the featured cow campaign with funding progress, share price, and a call-to-action to invest._

### Marketplace — Browse Active Listings

> _The listing page displays all active cow campaigns with metadata: target amount, shares available, price per share, and campaign status._

### Dashboard — Farmer Console

> _The dashboard gives farmers a full view of their campaign: total raised, shares sold, and the distribute-profit action._

---

## How It Works

```
Farmer creates campaign → Investors buy shares → Cattle cycle completes → Farmer distributes profit
```

1. A farmer calls `initialize_cow` with metadata, share pricing, and a vault.
2. Investors call `invest_in_cow` to purchase fractional shares.
3. At the end of the cycle, the farmer calls `distribute_profit` to pay back investors.

All state lives on-chain. No intermediary holds funds.

---

## Features

- Create cow campaigns onchain with structured metadata
- Purchase fractional shares in an active cow listing
- Track funding progress, share allocation, and campaign status
- Distribute profit into the campaign vault from the farmer side
- Wallet-connected frontend with Phantom support
- Local IDL wiring for frontend and program metadata
- Clean dashboard and marketplace views for demos and user flows

---

## Tech Stack

| Layer | Technology |
|---|---|
| Smart contract | Anchor, Rust, Solana Program Library |
| Frontend | Next.js 14, React 18, TypeScript |
| Wallet | `@solana/wallet-adapter-react`, `@solana/wallet-adapter-wallets` |
| Chain access | `@solana/web3.js`, `@coral-xyz/anchor` |
| Styling | Tailwind CSS, Framer Motion |
| Testing | Anchor test framework, Mocha, Chai, ts-mocha |

---

## Installation

### Prerequisites

- Node.js and npm
- Rust
- Solana CLI
- Anchor CLI
- A Solana wallet (Phantom recommended)

### 1. Clone the repository

```bash
git clone https://github.com/Hocaabinn/NusaCow.git
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

---

## Smart Contract

The onchain program exposes three main instructions:

```rust
// Create a new cow campaign
initialize_cow(metadata, share_price, total_shares)

// Investor buys shares in a campaign
invest_in_cow(campaign_pubkey, share_amount)

// Farmer distributes profit back to vault
distribute_profit(campaign_pubkey, amount)
```

---

## Configuration

The frontend reads one environment variable:

```bash
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
```

If omitted, it falls back to Solana Devnet automatically.

Anchor config lives in `anchor/Anchor.toml`:

```toml
[programs.localnet]
nusa_cow = "Fg6PaFpoGXkYsidMpWxTWqkZkD7jJ9z5v7hK6W1n1BfP"

[provider]
cluster = "Localnet"
wallet = "~/.config/solana/id.json"
```

> **Note:** After rebuilding the program, copy the generated IDL into `idl/NusaCow.json` to keep the frontend aligned with the latest contract interface.

---

## Roadmap

- [ ] USDC settlement support
- [ ] Multi-asset support (goats, poultry)
- [ ] Mobile-first investor flow
- [ ] Audit-grade smart contract security review
- [ ] On-chain profit distribution automation
- [ ] Integration with Indonesian rural cooperative systems

---

## Contributing

Contributions are welcome. A good workflow:

1. Create a feature branch
2. Make focused changes in either `anchor/` or `frontend/`
3. Run the relevant build and test commands
4. Keep changes small, readable, and aligned with the existing code style
5. Open a pull request with a clear summary of the behavior changed

Please include tests or validation steps when you modify onchain logic, wallet flows, or shared program metadata.

---

## License

This project is licensed under the [MIT License](./LICENSE).

Copyright © 2026 NusaCow Contributors.
