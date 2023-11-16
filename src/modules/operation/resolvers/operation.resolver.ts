import { ApolloContext } from '@custom-types/common';
import { LoggerMiddleware } from '@middlewares/logger.middleware';
import { OperationDto } from '@modules/operation/operation.dto';
import operationService from '@modules/operation/operation.service';
import { UserRole } from '@modules/user/user.dto';
import { Authorized, Ctx, Field, Int, ObjectType, Query, Resolver, UseMiddleware } from 'type-graphql';

@ObjectType()
export class ActiveOperationsResponse {
  @Field(() => [OperationDto])
  operations: OperationDto[];

  @Field(() => Int)
  count: number;
}

@Resolver()
export class OperationResolver {
  @UseMiddleware(LoggerMiddleware)
  @Authorized([UserRole.USER, UserRole.DEPOSIT_OPERATOR])
  @Query(() => ActiveOperationsResponse, { nullable: true })
  async activeOperations(@Ctx() ctx: ApolloContext): Promise<ActiveOperationsResponse> {
    const ops = await operationService.getActiveByOperator(+ctx.req.session.user!.id, { outCoin: true });
    return { operations: ops[0], count: ops[1] };
  }
}

export default OperationResolver;
