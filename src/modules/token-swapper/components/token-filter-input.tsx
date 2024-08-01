"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

import { MagnifyingGlassIcon } from "../assets/*";

interface TokenFilterInputProps {
  className?: string;
}

export const TokenFilterInput = ({ className }: TokenFilterInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cn(
        "px-4 h-12 w-full bg-transparent rounded-full border border-patara_gray_100 flex flex-row gap-3 items-center [&:has(input:focus)]:border-patara_gray_300 transition-colors",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="w-6 h-6 relative">
        <MagnifyingGlassIcon className="absolute absolute-center" />
      </div>
      <input
        type="text"
        placeholder="Search name or address"
        className="bg-transparent flex-1 placeholder:text-base placeholder:text-patara_gray_700"
        ref={inputRef}
      />
    </div>
  );
};
