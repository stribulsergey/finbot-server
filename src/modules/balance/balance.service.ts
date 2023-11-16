import { BalanceDto } from '@modules/balance/balance.dto';
import { add } from 'mathjs';

const getUserCoinBalance = async (userId: number, coinId: number): Promise<number> => {
  const balance = await BalanceDto.findOneBy({ userId, coinId });
  return balance?.amount || 0;
};

const getUserBalances = async (userId: number): Promise<BalanceDto[]> => {
  return BalanceDto.find({ where: { userId }, relations: { coin: true } });
};

const getOrCreate = async (userId: number, coinId: number): Promise<BalanceDto> => {
  let balance = await BalanceDto.findOneBy({ userId, coinId });
  if (balance) {
    return balance;
  }

  balance = new BalanceDto();
  balance.coinId = coinId;
  balance.userId = userId;
  return balance.save();
};

const addAmount = async (
  userId: number,
  coinId: number,
  amount: number,
  isDistribution: boolean = false,
): Promise<BalanceDto> => {
  const balance = await getOrCreate(userId, coinId);

  if (isDistribution) {
    balance.amountReferrals = add(balance.amountReferrals, amount);
  } else {
    balance.amount = add(balance.amount, amount);
  }

  return balance.save();
};

export default {
  getUserCoinBalance,
  getUserBalances,
  addAmount,
  getOrCreate,
};
