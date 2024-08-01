import {
  FormView,
  TransactionType,
  type Token,
  type TokenSwapForm,
  type TransactionSummary,
  type TransactionSettings,
} from "../@types";

export const initialToken: Token = {
  name: "",
  symbol: "",
  logoURI: "",
  address: "",
  amount: 0,
  price: 0,
};

export const initialTransactionSummary: TransactionSummary = {
  sourceToken: initialToken,
  targetToken: initialToken,
  transactionType: TransactionType.SELL,
  transactionAmount: 0,
  exchangeRate: 0,
};

export const initialTransactionSettings: TransactionSettings = {
  directRouteOnly: false,
  slippageMode: "auto",
  slippageRate: undefined,
};

export const initialTokenSwapForm: TokenSwapForm = {
  currentView: FormView.TRANSACTION,
  tokens: [],
  tokenDropdownItems: [],
  activeTransactionItemType: "source",

  transactionSummary: initialTransactionSummary,
  transactionSettings: initialTransactionSettings,
};
