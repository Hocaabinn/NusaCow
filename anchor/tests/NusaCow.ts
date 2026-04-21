import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";

describe("NusaCow", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.NusaCow as Program;

  it("loads the program workspace", async () => {
    assert.ok(program.programId);
  });
});
