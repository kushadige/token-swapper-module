import { z } from "zod";

import {
  TransactionSettingsSchema,
  TransactionSummarySchema,
} from "../schemas";

export interface Token {
  name: string;
  symbol: string;
  logoURI: string;
  address: string;
  amount: number;
  price: number;
}

export interface SonarToken {
  chainId: number;
  address: string;
  decimals: number;
  name: string;
  symbol: string;
  logoURI: string;
  tags?: string[];
  extensions?: {
    coingeckoId?: string;
  };
}

export interface TokenSwapForm {
  currentView: FormView;
  tokens: Token[];
  tokenDropdownItems: Token[];
  activeTransactionItemType: "source" | "target";

  transactionSummary: TransactionSummary;
  transactionSettings: TransactionSettings;
}

export type TransactionSummary = z.infer<typeof TransactionSummarySchema>;

export type TransactionSettings = z.infer<typeof TransactionSettingsSchema>;

export type AnyObject = { [key: string]: any };

export enum FormView {
  TRANSACTION = "transaction",
  SETTINGS = "settings",
  TOKEN_SELECTION = "token-selection",
}

export enum TransactionType {
  BUY = "buy",
  SELL = "sell",
}
