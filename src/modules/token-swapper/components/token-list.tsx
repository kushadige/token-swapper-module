"use client";

import Image from "next/image";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { formatNumber } from "../utils";

import { FormView, type Token, type TokenSwapForm } from "../@types";

export const TokenList = () => {
  const form = useFormContext<TokenSwapForm>();

  // Watch tokens
  const tokens = useWatch({
    name: "tokens",
    control: form.control,
  });

  // Watch transaction item type
  const transactionItemType = useWatch({
    control: form.control,
    name: "activeTransactionItemType",
  });

  // Set token name to watch
  const tokenToWatch =
    transactionItemType === "source"
      ? "transactionSummary.sourceToken"
      : "transactionSummary.targetToken";

  // Watch token
  const activeToken = useWatch({
    control: form.control,
    name: tokenToWatch,
  });

  return (
    <ScrollArea className="h-[25.25rem]">
      <div className="space-y-1">
        {tokens.map((token) => (
          <Controller
            key={token.address}
            name={tokenToWatch}
            control={form.control}
            render={({ field }) => (
              <TokenListItem
                onClick={() => {
                  field.onChange(token);
                  form.setValue("currentView", FormView.TRANSACTION);
                }}
                token={token}
                isActive={token.address === activeToken.address}
              />
            )}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

interface TokenListItemProps {
  token: Token;
  isActive: boolean;
  onClick: () => void;
}

export const TokenListItem = ({
  token,
  isActive,
  onClick,
}: TokenListItemProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "px-5 py-3 h-16 relative flex flex-row justify-between bg-patara_gray_75 rounded-lg hover:bg-patara_gray_100 hover:cursor-pointer",
        isActive && "bg-patara_gray_100"
      )}
    >
      {/* Token */}
      <div className="h-full flex flex-row gap-2">
        {/* Logo */}
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
        {/* Name */}
        <div className="flex flex-col justify-between">
          <p className="text-sm font-medium">{token.symbol}</p>
          <p className="text-xs">{token.name}</p>
        </div>
      </div>

      {/* Balance */}
      <div className="h-full flex flex-col items-end justify-between">
        {/* Amount */}
        <p className="text-sm font-medium">{formatNumber(token.amount)}</p>
        {/* Price */}
        <p className="text-xs">${formatNumber(token.price * token.amount)}</p>
      </div>
    </div>
  );
};
