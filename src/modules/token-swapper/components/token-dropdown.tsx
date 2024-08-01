"use client";

import Image from "next/image";
import { useFormContext, useWatch } from "react-hook-form";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";

import { CaretDownIcon } from "../assets/*";
import { initialToken } from "../constants/*";

import { type TokenSwapForm, type Token } from "../@types";

interface TokenDropdownProps {
  token: Token;
  isSource: boolean;
}

export const TokenDropdown = ({ token, isSource }: TokenDropdownProps) => {
  const form = useFormContext<TokenSwapForm>();

  // Watch dropdown items
  const dropdownItems = useWatch({
    name: "tokenDropdownItems",
    control: form.control,
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          id="token-dropdown"
          onClick={(e) => e.stopPropagation()}
          className="min-w-[7.5rem] w-fit h-10 rounded-full bg-patara_gray_50 p-1 border border-patara_gray_100 flex items-center gap-2 hover:border-patara_blue transition-colors"
        >
          <div className="relative overflow-hidden h-full aspect-square rounded-full bg-patara_gray_500">
            {token.logoURI && (
              <Image
                fill
                priority
                src={token.logoURI}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={token.symbol}
              />
            )}
          </div>
          <div className="flex items-center justify-between flex-1 gap-3">
            <p className="text-base font-semibold">{token.symbol}</p>
            <CaretDownIcon className="mr-3" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        onClick={(e) => e.stopPropagation()}
        className="p-1 w-40"
        side="bottom"
        align="center"
      >
        <Command>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {dropdownItems.map((item) => (
                <CommandItem
                  key={item.address}
                  value={item.address}
                  onSelect={(address) => {
                    // Find selected token
                    const selectedToken = dropdownItems.find(
                      (t) => t.address === address
                    );
                    if (!selectedToken) return;

                    // Check if selected token is the same as the current token
                    if (selectedToken.address === token?.address) {
                      form.setValue(
                        isSource
                          ? "transactionSummary.sourceToken"
                          : "transactionSummary.targetToken",
                        initialToken
                      );
                      return;
                    }

                    // Update source/target token with selected token
                    form.setValue(
                      isSource
                        ? "transactionSummary.sourceToken"
                        : "transactionSummary.targetToken",
                      selectedToken
                    );
                  }}
                  asChild
                >
                  <PopoverClose className="w-full">
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        token?.address === item.address
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {item.symbol}
                  </PopoverClose>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
