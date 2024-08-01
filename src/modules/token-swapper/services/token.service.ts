import tokens from "../data/sonarwatch.sui.tokenlist.json";

import { TransactionType, type Token, type SonarToken } from "../@types";

export class TokenService {
  // Get tokens from Sonarwatch token list
  static getTokens(): SonarToken[] {
    return tokens.tokens;
  }

  // Update token balances
  static updateTokens(
    tokens: Token[],
    sourceToken: Token,
    targetToken: Token,
    transactionAmount: number,
    exchangeRate: number,
    transactionType: TransactionType
  ) {
    const newTokens = tokens.map((token) => {
      if (token.address === sourceToken.address) {
        return {
          ...token,
          amount:
            transactionType === TransactionType.SELL
              ? token.amount - transactionAmount
              : token.amount + transactionAmount / exchangeRate,
        };
      }
      if (token.address === targetToken.address) {
        return {
          ...token,
          amount:
            transactionType === TransactionType.SELL
              ? token.amount + transactionAmount * exchangeRate
              : token.amount - transactionAmount,
        };
      }
      return token;
    });

    return newTokens;
  }
}
