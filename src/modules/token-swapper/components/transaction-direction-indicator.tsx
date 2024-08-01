import { TransactionType } from "../@types";

import { ArrowDownIcon, ArrowUpIcon } from "../assets/*";

interface TransactionDirectionIndicatorProps {
  transactionType: TransactionType;
}

export const TransactionDirectionIndicator = ({
  transactionType,
}: TransactionDirectionIndicatorProps) => {
  const Icon =
    transactionType === TransactionType.BUY ? ArrowUpIcon : ArrowDownIcon;

  return (
    <div className="bg-patara_gray_50 rounded-full p-1 w-12 h-12 flex items-center justify-center">
      <div className="bg-patara_gray_100 w-full h-full rounded-full flex items-center justify-center">
        <Icon />
      </div>
    </div>
  );
};
