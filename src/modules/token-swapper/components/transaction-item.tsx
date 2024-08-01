"use client";

import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

import { TokenDropdown } from "./token-dropdown";
import { formatNumber } from "../utils";

import {
  FormView,
  TransactionType,
  type Token,
  type TokenSwapForm,
} from "../@types";
import { useMemo } from "react";

interface TransactionItemProps {
  type: "source" | "target";
  token: Token;
  amount: number;
  price: number;
  transactionType: TransactionType;
}

export const TransactionItem = ({
  type,
  token,
  amount,
  price,
  transactionType,
}: TransactionItemProps) => {
  const form = useFormContext<TokenSwapForm>();

  const isProcessing = form.formState.isSubmitting;
  const isSource = type === "source";
  const isBuy = transactionType === TransactionType.BUY;

  // Transaction type label (Buy/Sell)
  const transactionTypeLabel = useMemo(() => {
    if (isSource) {
      return isBuy ? "Buy" : "Sell";
    }
    return isBuy ? "Sell" : "Buy";
  }, [isSource, isBuy]);

  return (
    <Controller
      name="currentView"
      control={form.control}
      render={({ field }) => (
        <div
          onClick={() => field.onChange(FormView.TOKEN_SELECTION)}
          onMouseEnter={() => form.setValue("activeTransactionItemType", type)}
          className={cn(
            "h-[7.5rem] px-4 py-3.5 rounded-lg bg-patara_gray_75 flex items-center justify-between border border-transparent hover:border-patara_blue hover:cursor-pointer transition-colors [&:has(#token-dropdown:hover)]:border-transparent",
            isProcessing && "opacity-50 pointer-events-none"
          )}
        >
          {/* Left Side */}
          <div>
            <TokenDropdown token={token} isSource={isSource} />
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-2.5 items-end">
            <span className="text-sm font-medium text-patara_gray_600">
              {transactionTypeLabel}
            </span>
            <p className="text-2xl font-medium text-patara_black">
              {formatNumber(amount)}
            </p>
            <p className="text-sm font-medium text-patara_black">
              ${formatNumber(price)}
            </p>
          </div>
        </div>
      )}
    />
  );
};
