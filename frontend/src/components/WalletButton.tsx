"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function WalletButton() {
  return (
    <div className="rounded-full border border-white/30 bg-white/40 p-1 backdrop-blur-lg">
      <WalletMultiButton className="!bg-[#143116] !text-[#FFFDD0] hover:!bg-[#1B5D57]" />
    </div>
  );
}
