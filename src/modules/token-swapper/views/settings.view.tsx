import { Controller, useFormContext, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { SlippageRateSelector } from "../components/*";

import {
  FormView,
  type TransactionSettings,
  type TokenSwapForm,
} from "../@types";

import { XIcon } from "../assets/*";

interface SettingsViewProps {
  initialState: TransactionSettings;
}

export const SettingsView = ({ initialState }: SettingsViewProps) => {
  const form = useFormContext<TokenSwapForm>();

  // Watch slippage mode
  const slippageMode = useWatch({
    name: "transactionSettings.slippageMode",
    control: form.control,
  });

  // Undo changes and close settings view
  const onCloseTransactionSettings = () => {
    form.resetField("transactionSettings", {
      defaultValue: initialState,
    });
    form.setValue("currentView", FormView.TRANSACTION);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="relative mb-5 flex items-center justify-center h-10">
        <p className="text-lg font-semibold">General Settings</p>

        {/* X Button */}
        <div className="absolute right-0 h-full aspect-square flex items-center justify-center">
          <Button
            size="icon"
            className="bg-transparent hover:bg-transparent shadow-none"
            onClick={onCloseTransactionSettings}
          >
            <XIcon />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {/* Slippage Mode Setting */}
        <div className="w-full min-h-16 px-4 py-[1.125rem] rounded-lg bg-patara_gray_75 flex flex-col items-start gap-4">
          <div className="w-full flex items-center justify-between">
            <p className="font-medium">Slippage Mode</p>
            <div className="flex flex-row gap-2">
              <Controller
                name="transactionSettings.slippageMode"
                control={form.control}
                render={({ field }) => (
                  <div className="relative min-w-16 h-9 rounded-lg bg-patara_gray_100 text-patara_gray_600 flex items-center justify-center [&:has(input:checked)]:bg-patara_blue_400 [&:has(input:checked)]:text-patara_gray_50 transition-colors">
                    <input
                      type="radio"
                      value="auto"
                      checked={field.value === "auto"}
                      onChange={() => {
                        form.setValue(
                          "transactionSettings.slippageRate",
                          undefined
                        );
                        field.onChange("auto");
                      }}
                      className="appearance-none absolute cursor-pointer w-full h-full peer"
                    />
                    <p className="text-sm">Auto</p>
                  </div>
                )}
              />
              <Controller
                name="transactionSettings.slippageMode"
                control={form.control}
                render={({ field }) => (
                  <div className="relative min-w-16 h-9 rounded-lg bg-patara_gray_100 text-patara_gray_600 flex items-center justify-center [&:has(input:checked)]:bg-patara_blue_400 [&:has(input:checked)]:text-patara_gray_50 transition-colors">
                    <input
                      type="radio"
                      value="fixed"
                      checked={field.value === "fixed"}
                      onChange={() => field.onChange("fixed")}
                      className="appearance-none absolute cursor-pointer w-full h-full peer"
                    />
                    <p className="text-sm">Fixed</p>
                  </div>
                )}
              />
            </div>
          </div>
          {slippageMode === "fixed" && (
            <div className="w-full flex items-center justify-between">
              <p className="font-medium">Slippage Rate</p>
              <SlippageRateSelector />
            </div>
          )}
        </div>

        {/* Direct Route Only Setting */}
        <div className="w-full h-16 px-4 py-[1.125rem] rounded-lg bg-patara_gray_75 flex items-center justify-between">
          <p className="font-medium">Direct Route Only</p>
          <Controller
            name="transactionSettings.directRouteOnly"
            control={form.control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>
        <Button
          type="submit"
          className="h-[3.75rem] w-full bg-patara_blue_50 shadow-none text-patara_blue font-semibold hover:bg-patara_blue_50/80"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};
