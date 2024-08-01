import { Controller, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { TokenDropdownEditor, TokenList } from "../components/*";
import { XIcon } from "../assets/x-icon";

import { FormView, type TokenSwapForm } from "../@types";
import { Separator } from "@/components/ui/separator";

export const TokenSelectionView = () => {
  const form = useFormContext<TokenSwapForm>();

  return (
    <div className="py-4">
      {/* Header */}
      <div className="px-4">
        <div className="relative mb-5 flex items-center justify-center h-10">
          <p className="text-lg font-semibold">Select Token</p>

          {/* X Button */}
          <div className="absolute right-0 h-full aspect-square flex items-center justify-center">
            <Controller
              name="currentView"
              control={form.control}
              render={({ field }) => (
                <Button
                  size="icon"
                  className="bg-transparent hover:bg-transparent shadow-none"
                  onClick={() => field.onChange(FormView.TRANSACTION)}
                >
                  <XIcon />
                </Button>
              )}
            />
          </div>
        </div>
      </div>

      {/* Token Selection */}
      <div className="space-y-4">
        {/* Token Dropdown Editor */}
        <div className="px-4">
          <TokenDropdownEditor />
        </div>
        <Separator className="bg-patara_gray_100" orientation="horizontal" />
        {/* Token List */}
        <div className="px-4">
          <div className="px-5 mb-5 flex justify-between">
            <p className="text-patara_gray_600 font-medium">Token</p>
            <p className="text-patara_gray_600 font-medium">Balance</p>
          </div>
          <TokenList />
        </div>
      </div>
    </div>
  );
};
