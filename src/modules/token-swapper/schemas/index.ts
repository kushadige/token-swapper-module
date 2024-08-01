import { z } from "zod";

import { FormView, TransactionType } from "../@types";

export const TokenSchema = z.object({
  name: z.string(),
  symbol: z.string().min(1),
  logoURI: z.string(),
  address: z.string(),
  amount: z.number(),
  price: z.number(),
});

export const TransactionSummarySchema = z
  .object({
    sourceToken: TokenSchema,
    targetToken: TokenSchema,
    transactionType: z.enum([TransactionType.BUY, TransactionType.SELL]),
    transactionAmount: z.number().gt(0, {
      message: "Transaction amount must be greater than 0",
    }),
    exchangeRate: z.number().min(0),
  })
  .superRefine((data, ctx) => {
    // Check source token and target token are different
    if (data.sourceToken.address === data.targetToken.address) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Source token and target token must be different",
        path: ["sourceToken", "targetToken"],
      });
    }
  });

export const TransactionSettingsSchema = z
  .object({
    directRouteOnly: z.boolean(),
    slippageMode: z.enum(["auto", "fixed"]),
    slippageRate: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Check if slippage rate is required when slippage mode is fixed
    if (data.slippageMode === "fixed" && !data.slippageRate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Slippage rate is required",
        path: ["slippageRate"],
      });
    }
    // Check if slippage rate is less than 0 when slippage mode is fixed
    if (
      data.slippageMode === "fixed" &&
      data.slippageRate &&
      +data.slippageRate < 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Slippage rate must be greater than 0",
        path: ["slippageRate"],
      });
    }
  });

const BaseSchema = z.object({
  activeTransactionItemType: z.enum(["source", "target"]),
  tokens: z.array(TokenSchema),
  tokenDropdownItems: z.array(TokenSchema),
});

export const TokenSwapFormSchema = z.discriminatedUnion("currentView", [
  z
    .object({
      currentView: z.literal(FormView.TRANSACTION),
      transactionSummary: TransactionSummarySchema,
    })
    .merge(BaseSchema),
  z
    .object({
      currentView: z.literal(FormView.SETTINGS),
      transactionSettings: TransactionSettingsSchema,
    })
    .merge(BaseSchema),
  z
    .object({
      currentView: z.literal(FormView.TOKEN_SELECTION),
    })
    .merge(BaseSchema),
]);
