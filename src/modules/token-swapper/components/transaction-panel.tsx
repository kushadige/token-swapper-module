"use client";

import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { TransactionItem } from "./transaction-item";
import { TransactionDirectionIndicator } from "./transaction-direction-indicator";

import { TransactionType, type TokenSwapForm } from "../@types";

export const TransactionPanel = ({
  transactionType,
}: {
  transactionType: TransactionType;
}) => {
  const form = useFormContext<TokenSwapForm>();

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

  // Watch transaction amount
  const transactionAmount = useWatch({
    name: "transactionSummary.transactionAmount",
    control: form.control,
  });

  // Update exchange rate and transaction amount on token change
  useEffect(() => {
    // Update exchange rate
    form.setValue(
      "transactionSummary.exchangeRate",
      sourceToken.price / targetToken.price
    );

    // Update transaction amount
    if (transactionType === TransactionType.SELL) {
      form.setValue("transactionSummary.transactionAmount", sourceToken.amount);
      return;
    }
    form.setValue("transactionSummary.transactionAmount", targetToken.amount);
  }, [transactionType, sourceToken.amount, targetToken.amount]);

  return (
    <div className="relative flex flex-col gap-2">
      <TransactionItem
        type="source"
        token={sourceToken}
        amount={
          transactionType === TransactionType.BUY
            ? sourceToken.amount
            : transactionAmount
        }
        price={
          transactionType === TransactionType.BUY
            ? sourceToken.amount * sourceToken.price
            : transactionAmount * sourceToken.price
        }
        transactionType={transactionType}
      />
      <div className="absolute absolute-center z-10">
        <TransactionDirectionIndicator transactionType={transactionType} />
      </div>
      <TransactionItem
        type="target"
        token={targetToken}
        amount={
          transactionType === TransactionType.SELL
            ? targetToken.amount
            : transactionAmount
        }
        price={
          transactionType === TransactionType.SELL
            ? targetToken.amount * targetToken.price
            : transactionAmount * targetToken.price
        }
        transactionType={transactionType}
      />
    </div>
  );
};
