export const CONTRACT_ADDRESS =
  "0x242034EB9f55B60A12b8BF94A923aB106b1f834b" as const;

export const CONTRACT_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
  },
  {
    name: "batchAirdrop",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "recipients", type: "address[]", internalType: "address[]" },
      { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
    ],
    outputs: [],
  },
  {
    name: "deposit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256", internalType: "uint256" }],
    outputs: [],
  },
  {
    name: "token",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IERC20" }],
  },
  {
    name: "vaults",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
  },
  {
    name: "withdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256", internalType: "uint256" }],
    outputs: [],
  },
] as const;
