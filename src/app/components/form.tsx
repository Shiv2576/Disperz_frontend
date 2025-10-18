"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useTokenBalance,
  useApprove,
  useDeposit,
  useBatchAirdrop,
} from "../contract/function";
import { formatEther } from "viem";

export const Form = () => {
  const [activeTab, setActiveTab] = useState<"deposit" | "airdrop">("deposit");

  // Deposit Tab Hooks
  const { balance, isLoading: balanceLoading } = useTokenBalance();
  const {
    approve,
    isPending: approvePending,
    isSuccess: approveSuccess,
  } = useApprove();
  const {
    amount: depositAmount,
    setAmount: setDepositAmount,
    deposit,
    isPending: depositPending,
    isSuccess: depositSuccess,
  } = useDeposit();

  // Airdrop Tab Hooks
  const {
    batchAirdrop,
    isPending: airdropPending,
    isSuccess: airdropSuccess,
  } = useBatchAirdrop();
  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");

  const handleApprove = () => {
    if (depositAmount) approve(depositAmount);
  };

  const handleDeposit = () => {
    if (depositAmount) deposit(depositAmount);
  };

  const handleBatchAirdrop = () => {
    const recipientList = recipients
      .split("\n")
      .filter((r) => r.trim()) as `0x${string}`[];
    const amountList = amounts.split("\n").filter((a) => a.trim());

    if (
      recipientList.length === amountList.length &&
      recipientList.length > 0
    ) {
      batchAirdrop(recipientList, amountList);
    }
  };

  return (
    <div
      className="w-3xl max-w-md ml-10 -mt-40 p-10 rounded-lg shadow-lg"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-[#C0A080]">
        <button
          onClick={() => setActiveTab("deposit")}
          className={`py-2 px-4 font-semibold transition`}
          style={{
            color: activeTab === "deposit" ? "#000000" : "#C0A080",
            borderBottom:
              activeTab === "deposit"
                ? "2px solid #C0A080"
                : "2px solid transparent",
          }}
        >
          Deposit
        </button>
        <button
          onClick={() => setActiveTab("airdrop")}
          className={`py-2 px-4 font-semibold transition`}
          style={{
            color: activeTab === "airdrop" ? "#000000" : "#C0A080",
            borderBottom:
              activeTab === "airdrop"
                ? "2px solid #C0A080"
                : "2px solid transparent",
          }}
        >
          Batch Airdrop
        </button>
      </div>

      {/* Fixed-height container with smooth transitions */}
      <div className="relative" style={{ height: "420px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {activeTab === "deposit" && (
              <DepositTabContent
                balance={balance}
                balanceLoading={balanceLoading}
                depositAmount={depositAmount}
                setDepositAmount={setDepositAmount}
                approvePending={approvePending}
                approveSuccess={approveSuccess}
                depositPending={depositPending}
                depositSuccess={depositSuccess}
                handleApprove={handleApprove}
                handleDeposit={handleDeposit}
              />
            )}
            {activeTab === "airdrop" && (
              <AirdropTabContent
                recipients={recipients}
                setRecipients={setRecipients}
                amounts={amounts}
                setAmounts={setAmounts}
                airdropPending={airdropPending}
                airdropSuccess={airdropSuccess}
                handleBatchAirdrop={handleBatchAirdrop}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// ── Deposit Tab ───────────────────────────────────────
const DepositTabContent = ({
  balance,
  balanceLoading,
  depositAmount,
  setDepositAmount,
  approvePending,
  approveSuccess,
  depositPending,
  depositSuccess,
  handleApprove,
  handleDeposit,
}: {
  balance: bigint | undefined;
  balanceLoading: boolean;
  depositAmount: string;
  setDepositAmount: (val: string) => void;
  approvePending: boolean;
  approveSuccess: boolean;
  depositPending: boolean;
  depositSuccess: boolean;
  handleApprove: () => void;
  handleDeposit: () => void;
}) => (
  <div className="space-y-4 text-black h-full flex flex-col">
    <div className="p-4 rounded-lg" style={{ backgroundColor: "#F5F5F5" }}>
      <p className="text-sm text-black opacity-70">Your Balance</p>
      <p className="text-2xl font-bold text-black">
        {balanceLoading
          ? "Loading..."
          : balance
            ? parseFloat(formatEther(balance)).toFixed(4)
            : "0.0000"}
      </p>
    </div>

    <div>
      <label
        className="block text-sm font-medium mb-2"
        style={{ color: "#000000" }}
      >
        Amount
      </label>
      <input
        type="number"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        placeholder="Enter amount"
        className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:outline-none"
        style={{
          border: "1px solid #C0A080",
          backgroundColor: "#F5F5F5",
          color: "#000000",
        }}
      />
    </div>

    <button
      onClick={handleApprove}
      disabled={approvePending || !depositAmount}
      className="w-full px-4 py-2 text-black font-semibold rounded-lg transition disabled:cursor-not-allowed"
      style={{
        backgroundColor: "#C0A080",
        opacity: approvePending || !depositAmount ? 0.6 : 1,
      }}
    >
      {approvePending ? "Approving..." : "Approve"}
    </button>
    {approveSuccess && (
      <p className="text-sm font-semibold text-green-700">
        Approval successful!
      </p>
    )}

    <button
      onClick={handleDeposit}
      disabled={depositPending || !depositAmount}
      className="w-full px-4 py-2 text-black font-semibold rounded-lg transition disabled:cursor-not-allowed"
      style={{
        backgroundColor: "#000000",
        color: "#FFFFFF",
        opacity: depositPending || !depositAmount ? 0.6 : 1,
      }}
    >
      {depositPending ? "Depositing..." : "Deposit"}
    </button>
    {depositSuccess && (
      <p className="text-sm font-semibold text-green-700">
        Deposit successful!
      </p>
    )}
  </div>
);

// ── Airdrop Tab ───────────────────────────────────────
const AirdropTabContent = ({
  recipients,
  setRecipients,
  amounts,
  setAmounts,
  airdropPending,
  airdropSuccess,
  handleBatchAirdrop,
}: {
  recipients: string;
  setRecipients: (val: string) => void;
  amounts: string;
  setAmounts: (val: string) => void;
  airdropPending: boolean;
  airdropSuccess: boolean;
  handleBatchAirdrop: () => void;
}) => {
  const recipientCount = recipients.split("\n").filter((r) => r.trim()).length;
  const amountCount = amounts.split("\n").filter((a) => a.trim()).length;

  return (
    <div className="space-y-4 text-black h-full flex flex-col">
      <div>
        <label className="block text-sm font-medium mb-2 text-black">
          Recipients (one per line)
        </label>
        <textarea
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          placeholder="0x123...\n0x456..."
          className="w-full px-4 py-2 rounded-lg font-mono text-sm focus:ring-2 focus:outline-none h-24"
          style={{
            border: "1px solid #C0A080",
            backgroundColor: "#F5F5F5",
            color: "#000000",
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-black">
          Amounts (one per line)
        </label>
        <textarea
          value={amounts}
          onChange={(e) => setAmounts(e.target.value)}
          placeholder="1.5\n2.0..."
          className="w-full px-4 py-2 rounded-lg font-mono text-sm focus:ring-2 focus:outline-none h-24"
          style={{
            border: "1px solid #C0A080",
            backgroundColor: "#F5F5F5",
            color: "#000000",
          }}
        />
      </div>

      <div
        className="p-3 rounded-lg text-sm"
        style={{
          backgroundColor: "#F5F5F5",
          color: "#000000",
        }}
      >
        Recipients: {recipientCount} | Amounts: {amountCount}
      </div>

      <button
        onClick={handleBatchAirdrop}
        disabled={airdropPending || recipientCount === 0 || amountCount === 0}
        className="w-full px-4 py-2 text-black font-semibold rounded-lg transition disabled:cursor-not-allowed"
        style={{
          backgroundColor: "#C0A080",
          opacity: airdropPending || recipientCount === 0 ? 0.6 : 1,
        }}
      >
        {airdropPending ? "Processing..." : "Send Airdrop"}
      </button>

      {airdropSuccess && (
        <p className="text-sm font-semibold text-green-700">
          Airdrop successful!
        </p>
      )}
    </div>
  );
};
