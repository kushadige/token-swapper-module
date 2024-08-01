"use client";

import Image from "next/image";
import { useFormContext, useWatch } from "react-hook-form";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
} from "@/components/ui/popover";

import { CaretDownIcon } from "../assets/*";
import { TokenFilterInput } from "./token-filter-input";

import { type TokenSwapForm } from "../@types";

export const TokenDropdownEditor = () => {
  const form = useFormContext<TokenSwapForm>();

  // Watch dropdown items
  const dropdownItems = useWatch({
    name: "tokenDropdownItems",
    control: form.control,
  });

  return (
    <div className="space-y-4">
      {/* Input Fields */}
      <div className="flex flex-row gap-2">
        {/* Token Filter */}
        <TokenFilterInput />
        {/* Dropdown Editor */}
        <div className="w-20 shrink-0 select-none">
          <DropdownEditor />
        </div>
      </div>

      {/* Current Dropdown Items */}
      {dropdownItems.length === 0 && (
        <p className="text-sm px-4">No tokens selected.</p>
      )}
      <ScrollArea className="h-[7.5rem]">
        <div className="grid grid-cols-4 gap-4 w-fit">
          {dropdownItems.map((token) => (
            <div
              key={token.address}
              className="w-[5.5rem] h-12 p-2 bg-patara_gray_75 border border-patara_gray_100 rounded-full flex flex-row items-center gap-2 overflow-hidden"
            >
              {/* Logo */}
              <div className="relative overflow-hidden shrink-0 h-full aspect-square rounded-full bg-patara_gray_500">
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

              {/* Name */}
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max py-2">
                  <p className="text-sm font-medium">{token.symbol}</p>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const DropdownEditor = () => {
  const form = useFormContext<TokenSwapForm>();

  // Watch tokens
  const tokens = useWatch({
    name: "tokens",
    control: form.control,
  });

  // Watch dropdown items
  const currentDropdownItems = useWatch({
    name: "tokenDropdownItems",
    control: form.control,
  });

  // Get current dropdown item addresses
  const currentDropdownItemAddresses = currentDropdownItems.map(
    (item) => item.address
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full h-full rounded-full p-2 bg-patara_gray_75 flex flex-row items-center justify-between hover:cursor-pointer border border-transparent hover:border-patara_blue transition-colors">
          <div className="relative overflow-hidden h-full aspect-square rounded-full bg-patara_gray_500">
            {tokens.length > 0 && tokens[0].logoURI && (
              <Image
                fill
                priority
                src={tokens[0].logoURI}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={tokens[0].symbol}
              />
            )}
          </div>
          <CaretDownIcon className="mr-1" />
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
              {tokens.map((token) => (
                <CommandItem
                  key={token.address}
                  value={token.address}
                  onSelect={(tokenAddress) => {
                    // Find selected token
                    const selectedToken = tokens.find(
                      (t) => t.address === tokenAddress
                    );
                    if (!selectedToken) return;

                    // Check if selected token is already in the dropdown items
                    if (
                      currentDropdownItemAddresses.includes(
                        selectedToken.address
                      )
                    ) {
                      // Remove selected token from dropdown items
                      form.setValue(
                        "tokenDropdownItems",
                        currentDropdownItems.filter(
                          (item) => item.address !== selectedToken.address
                        )
                      );
                      return;
                    }

                    // Add selected token to dropdown items
                    form.setValue("tokenDropdownItems", [
                      ...currentDropdownItems,
                      selectedToken,
                    ]);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentDropdownItemAddresses.includes(token.address)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {token.symbol}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
