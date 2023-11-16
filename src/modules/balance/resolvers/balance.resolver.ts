import { ApolloContext } from '@custom-types/common';
import { LoggerMiddleware } from '@middlewares/logger.middleware';
import { BalanceDto } from '@modules/balance/balance.dto';
import balanceService from '@modules/balance/balance.service';
import { UserRole } from '@modules/user/user.dto';
import { Authorized, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

@Resolver()
export class BalanceResolver {
  @UseMiddleware(LoggerMiddleware)
  @Authorized([UserRole.USER])
  @Query(() => [BalanceDto])
  async userBalances(@Ctx() ctx: ApolloContext): Promise<BalanceDto[]> {
    return balanceService.getUserBalances(+ctx.req.session.user!.id);
  }
}

export default BalanceResolver;
