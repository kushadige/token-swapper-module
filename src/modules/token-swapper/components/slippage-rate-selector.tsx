"use client";

import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";

import { type TokenSwapForm } from "../@types";

const className = `
  w-10 h-8 bg-transparent rounded-lg text-xs font-medium 
  flex items-center justify-center border border-patara_gray_100 select-none
  hover:border-patara_blue/30 cursor-pointer transition-all duration-200 ease-in-out active:scale-95
`;

export const SlippageRateSelector = () => {
  const form = useFormContext<TokenSwapForm>();

  const error = form.formState.errors.transactionSettings?.slippageRate;

  return (
    <div className="flex flex-row gap-2">
      <Controller
        name="transactionSettings.slippageRate"
        control={form.control}
        render={({ field }) => (
          <button
            type="button"
            className={cn(className, error && "border-patara_red")}
            onClick={() => field.onChange("0.3")}
          >
            0.3%
          </button>
        )}
      />

      <Controller
        name="transactionSettings.slippageRate"
        control={form.control}
        render={({ field }) => (
          <button
            type="button"
            className={cn(className, error && "border-patara_red")}
            onClick={() => field.onChange("0.5")}
          >
            0.5%
          </button>
        )}
      />

      <Controller
        name="transactionSettings.slippageRate"
        control={form.control}
        render={({ field }) => (
          <button
            type="button"
            className={cn(className, error && "border-patara_red")}
            onClick={() => field.onChange("1")}
          >
            1%
          </button>
        )}
      />

      <Controller
        name="transactionSettings.slippageRate"
        control={form.control}
        render={({ field }) => (
          <input
            type="number"
            placeholder="Custom"
            value={field.value || ""}
            data-value={!!field.value}
            onChange={(e) => field.onChange(e.target.value)}
            step="0.01"
            min={0}
            className={cn(
              className,
              "block w-16 appearance-none text-center placeholder:text-patara_gray_600  data-[value=true]:border-patara_blue",
              error && "border-patara_red"
            )}
          />
        )}
      />
    </div>
  );
};
