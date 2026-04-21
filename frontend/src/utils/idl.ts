export const nusaCowIdl = {
  version: "0.1.0",
  name: "nusa_cow",
  address: "Fg6PaFpoGXkYsidMpWxTWqkZkD7jJ9z5v7hK6W1n1BfP",
  instructions: [
    { name: "initialize_cow" },
    { name: "invest_in_cow" },
    { name: "distribute_profit" },
  ],
};

export function getNusaCowProgramMeta() {
  return {
    programName: nusaCowIdl.name,
    programId: nusaCowIdl.address,
  };
}

export { nusaCowIdl };
