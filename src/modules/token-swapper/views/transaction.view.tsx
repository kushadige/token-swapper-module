"use client";

import { useFormContext } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import {
  Toolbar,
  TransactionPanel,
  TransactionPercentageSelector,
  TokenBalance,
} from "../components/*";

import { TransactionType, type TokenSwapForm } from "../@types";

export const TransactionView = ({
  transactionType,
}: {
  transactionType: TransactionType;
}) => {
  const form = useFormContext<TokenSwapForm>();

  // Check if form is processing
  const isProcessing = form.formState.isSubmitting;

  return (
    <div className="relative p-4 flex flex-col gap-4">
      {/* Toolbar */}
      <div className="absolute top-0 -right-2 translate-x-full">
        <Toolbar />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <TokenBalance />
        <TransactionPercentageSelector />
      </div>

      {/* Transaction Panel */}
      <div className="space-y-2">
        <TransactionPanel transactionType={transactionType} />

        <Button
          type="submit"
          disabled={isProcessing}
          className="h-[3.75rem] w-full bg-patara_blue_50 shadow-none text-patara_blue font-semibold hover:bg-patara_blue_50/80"
        >
          {isProcessing && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Swap
        </Button>
      </div>
    </div>
  );
};
