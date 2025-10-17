import { useState } from "react";
import { useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../ABI/abi";
import { useAccount, useReadContract } from "wagmi";
import { formatEther } from "viem";

const TOKEN_ADDRESS = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14" as const;

////////////////////////
////Withdraw function///
////////////////////////

export const useWithdraw = () => {
  const [amount, setAmount] = useState("");

  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  const withdraw = async () => {
    if (!amount) return;

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "withdraw",
      args: [parseEther(amount)],
    });
  };

  return {
    amount,
    setAmount,
    withdraw,
    isPending,
    isSuccess,
    error,
  };
};

////////////////////////
////Approve for ERC20///
////////////////////////

const ERC20_ABI = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

export const useApprove = () => {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  const approve = async (amount: string) => {
    if (!amount) return;

    writeContract({
      address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
      abi: ERC20_ABI,
      functionName: "approve",
      args: [CONTRACT_ADDRESS, parseEther(amount)],
    });
  };

  return { approve, isPending, isSuccess, error };
};

////////////////////////
////Deposit Function///
////////////////////////

export const useDeposit = () => {
  const [amount, setAmount] = useState("");
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  const deposit = async (amount: string) => {
    if (!amount) return;

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "deposit",
      args: [parseEther(amount)],
    });
  };

  return {
    amount,
    setAmount,
    deposit,
    isPending,
    isSuccess,
    error,
  };
};

////////////////////////
////Balance function////
////////////////////////

export const useTokenBalance = () => {
  const { address } = useAccount();

  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  const formattedBalance =
    data !== undefined
      ? parseFloat(formatEther(data as bigint)).toFixed(4)
      : "0.0000";

  return {
    balance: data as bigint | undefined,
    formattedBalance,
    isLoading,
    error,
  };
};

/////////////////////////////
////Batch Aridrop function///
/////////////////////////////

export const useBatchAirdrop = () => {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  const batchAirdrop = async (
    recipients: readonly `0x${string}`[],
    amounts: string[],
  ) => {
    if (recipients.length !== amounts.length || recipients.length === 0) return;

    const parsedAmounts = amounts.map((amt) => parseEther(amt));

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "batchAirdrop",
      args: [recipients, parsedAmounts],
    });
  };

  return { batchAirdrop, isPending, isSuccess, error };
};
