"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { formatNumber } from "../utils";

import { type TokenSwapForm } from "../@types";

export const TokenBalance = () => {
  const form = useFormContext<TokenSwapForm>();

  // Watch source token
  const sourceToken = useWatch({
    name: "transactionSummary.sourceToken",
    control: form.control,
  });

  return (
    <div>
      <p className="font-medium text-sm">
        {sourceToken.symbol ? (
          <>
            Balance: <span>{formatNumber(sourceToken.amount)}</span>{" "}
            <span>{sourceToken.symbol}</span>
          </>
        ) : (
          "Select a token"
        )}
      </p>
    </div>
  );
};
