"use client";

import { Controller, useFormContext } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { FormView, type TokenSwapForm } from "../@types";

import { ArrowClockwiseIcon, GearIcon } from "../assets/*";

export const Toolbar = () => {
  const form = useFormContext<TokenSwapForm>();

  // Check if form is processing
  const isProcessing = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-2">
      {/* Settings Button */}
      <Controller
        name="currentView"
        control={form.control}
        render={({ field }) => (
          <Button
            type="button"
            size="icon"
            disabled={isProcessing}
            className="bg-patara_gray_100 text-inherit rounded-lg hover:bg-patara_gray_200"
            onClick={() => field.onChange(FormView.SETTINGS)}
          >
            <GearIcon />
          </Button>
        )}
      />

      {/* Transaction Type Toggler */}
      <Controller
        name="transactionSummary.transactionType"
        control={form.control}
        disabled={isProcessing}
        render={({ field }) => (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                disabled={isProcessing}
                className="bg-patara_gray_100 text-inherit rounded-lg hover:bg-patara_gray_200"
                onClick={() =>
                  field.onChange(field.value === "buy" ? "sell" : "buy")
                }
              >
                <ArrowClockwiseIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>
                {field.value === "buy" ? "Switch to sell" : "Switch to buy"}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      />
    </div>
  );
};
