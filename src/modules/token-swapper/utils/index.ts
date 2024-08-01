import { type AnyObject, type SonarToken } from "../@types";

// Generate tokens with random balance and price
export const generateTokensWithBalance = (tokens: SonarToken[]) => {
  return tokens.map((token) => ({
    name: token.name,
    symbol: token.symbol,
    logoURI: token.logoURI,
    address: token.address,
    amount: getRandomNumber(10, 10000, 4),
    price: getRandomNumber(0.1, 10, 6),
  }));
};

// Generate random number between min and max
export const getRandomNumber = (
  min: number,
  max: number,
  decimals: number = 2
): number => {
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(decimals));
};

// Format number to have commas
export const formatNumber = (num: number) => {
  if (num === 0) {
    return "0,00";
  }

  if (num < 1) {
    const trimmedPrice = num.toString().replace(/\.?0+$/, "");
    return trimmedPrice.replace(".", ",");
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 5,
  }).format(num);

  return formattedPrice;
};

// Deep find object by key
export const deepFindByKey = <T>(
  obj: AnyObject,
  keyToFind: string,
  values: T[] = []
): T[] => {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      deepFindByKey(obj[key], keyToFind, values);
    } else if (key === keyToFind) {
      values.push(obj[key]);
    }
  }
  return values;
};
