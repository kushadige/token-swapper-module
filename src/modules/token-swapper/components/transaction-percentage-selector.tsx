"use client";

import { Controller, useFormContext, useWatch } from "react-hook-form";

import { TransactionType, type TokenSwapForm } from "../@types";
import { cn } from "@/lib/utils";

const percentages = [25, 50, 75, 100];

export const TransactionPercentageSelector = () => {
  const form = useFormContext<TokenSwapForm>();

  // Check if form is processing
  const isProcessing = form.formState.isSubmitting;

  // Watch source token
  const sourceToken = useWatch({
    name: "transactionSummary.sourceToken",
    control: form.control,
  });

  // Watch target token
  const targetToken = useWatch({
    name: "transactionSummary.targetToken",
    control: form.control,
  });

  // Watch transaction type
  const transactionType = form.watch("transactionSummary.transactionType");

  return (
    <div className="flex flex-row gap-2">
      {percentages.map((percentage) => (
        <Controller
          key={percentage}
          name="transactionSummary.transactionAmount"
          control={form.control}
          render={({ field }) => {
            let isActive = false;
            if (transactionType === TransactionType.SELL) {
              isActive =
                Math.round((field.value * 100) / sourceToken.amount) ===
                percentage;
            } else {
              isActive =
                Math.round((field.value * 100) / targetToken.amount) ===
                percentage;
            }
            return (
              <button
                type="button"
                className={cn(
                  `w-10 h-8 bg-transparent rounded-lg text-xs font-medium 
                flex items-center justify-center border border-patara_gray_75 select-none
                hover:border-patara_blue/30 cursor-pointer transition-all duration-200 ease-in-out active:scale-95`,
                  isActive && "bg-patara_blue_50 text-patara_blue",
                  isProcessing && "opacity-50 pointer-events-none"
                )}
                onClick={() => {
                  if (transactionType === TransactionType.SELL) {
                    field.onChange((sourceToken.amount * percentage) / 100);
                    return;
                  }
                  field.onChange((targetToken.amount * percentage) / 100);
                }}
              >
                {percentage === 100 ? "MAX" : `${percentage}%`}
              </button>
            );
          }}
        />
      ))}
    </div>
  );
};
