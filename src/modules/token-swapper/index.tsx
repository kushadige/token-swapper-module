"use client";

import { useEffect, useMemo } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

import { TransactionView, SettingsView, TokenSelectionView } from "./views/*";
import { TokenService } from "./services/token.service";
import { TokenSwapFormSchema } from "./schemas";
import { initialTokenSwapForm } from "./constants/*";
import { deepFindByKey, generateTokensWithBalance } from "./utils";

import {
  FormView,
  TransactionType,
  type TokenSwapForm,
  type TransactionSettings,
} from "./@types";

export const TokenSwapper = () => {
  const { toast } = useToast();

  // Get initial form values
  const defaultValues: TokenSwapForm = useMemo(
    () => ({
      ...initialTokenSwapForm,
    }),
    [initialTokenSwapForm]
  );

  // Initialize form
  const form = useForm<TokenSwapForm>({
    resolver: zodResolver(TokenSwapFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // Watch current view
  const currentView = useWatch({
    name: "currentView",
    control: form.control,
  });

  // Watch transaction type
  const transactionType = useWatch({
    name: "transactionSummary.transactionType",
    control: form.control,
  });

  // Set initial state to memoize form values on back navigation
  const initialState = useMemo(() => {
    switch (currentView) {
      case FormView.TRANSACTION:
        return {
          ...form.getValues().transactionSummary,
        };
      case FormView.SETTINGS:
        return {
          ...form.getValues().transactionSettings,
        };
      default:
        return {};
    }
  }, [currentView]);

  // Get error messages from form state
  const errors = useMemo(() => {
    return deepFindByKey<string>(form.formState.errors, "message");
  }, [form.formState.errors]);

  // Generate tokens with balance on initial load
  useEffect(() => {
    const initialTokens = TokenService.getTokens();
    const tokens = generateTokensWithBalance(initialTokens);

    form.setValue("tokens", tokens);
    form.setValue("tokenDropdownItems", tokens.slice(0, 8));
    form.setValue("transactionSummary.sourceToken", tokens[0]);
    form.setValue("transactionSummary.targetToken", tokens[1]);
    form.setValue("transactionSummary.transactionAmount", tokens[0].amount);
  }, []);

  // Handle errors on form submissions and display toast
  useEffect(() => {
    if (errors.length > 0) {
      for (const error of errors) {
        toast({
          variant: "destructive",
          title: error,
        });
      }
    }
  }, [errors]);

  // Render view based on current form view
  const renderWiew = () => {
    switch (currentView) {
      case FormView.SETTINGS:
        return (
          <SettingsView initialState={initialState as TransactionSettings} />
        );
      case FormView.TOKEN_SELECTION:
        return <TokenSelectionView />;
      default:
        return <TransactionView transactionType={transactionType} />;
    }
  };

  // Handle form submission
  const onSubmit = async (data: TokenSwapForm) => {
    switch (currentView) {
      case FormView.SETTINGS:
        form.setValue("currentView", FormView.TRANSACTION);
        break;
      case FormView.TRANSACTION:
        const sourceToken = data.transactionSummary.sourceToken;
        const targetToken = data.transactionSummary.targetToken;
        const transactionType = data.transactionSummary.transactionType;
        const transactionAmount = data.transactionSummary.transactionAmount;
        const exchangeRate = data.transactionSummary.exchangeRate;

        // Mock processing state
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Update tokens
        const updatedTokens = TokenService.updateTokens(
          data.tokens,
          sourceToken,
          targetToken,
          transactionAmount,
          exchangeRate,
          transactionType
        );

        // Update tokens
        form.setValue("tokens", updatedTokens);
        form.setValue("tokenDropdownItems", updatedTokens.slice(0, 8));
        form.setValue(
          "transactionSummary.sourceToken",
          updatedTokens.find((token) => token.symbol === sourceToken.symbol)!
        );
        form.setValue(
          "transactionSummary.targetToken",
          updatedTokens.find((token) => token.symbol === targetToken.symbol)!
        );

        // Toast transaction summary
        toast({
          variant: "default",
          title: "Transaction submitted successfully",
          description: (
            <div>
              <p className="text-sm">
                Summary:{" "}
                {transactionType === TransactionType.SELL
                  ? sourceToken.symbol
                  : targetToken.symbol}{" "}
                to{" "}
                {transactionType === TransactionType.SELL
                  ? targetToken.symbol
                  : sourceToken.symbol}
              </p>
              <p className="text-sm">
                {sourceToken.symbol}:{" "}
                {transactionType === TransactionType.SELL ? "-" : "+"}
                {transactionType === TransactionType.SELL
                  ? transactionAmount
                  : transactionAmount / exchangeRate}
                <br />
                {targetToken.symbol}:{" "}
                {transactionType === TransactionType.SELL ? "+" : "-"}
                {transactionType === TransactionType.SELL
                  ? transactionAmount * exchangeRate
                  : transactionAmount}
              </p>
            </div>
          ),
          duration: 4000,
        });
    }
  };

  return (
    <TooltipProvider>
      <FormProvider {...form}>
        <form
          className="bg-patara_gray_50 rounded-xl w-[30rem] h-fit"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {renderWiew()}
        </form>
      </FormProvider>
      <Toaster />
    </TooltipProvider>
  );
};
