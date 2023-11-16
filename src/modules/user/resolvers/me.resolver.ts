import { ApolloContext } from '@custom-types/common';
import { LoggerMiddleware } from '@middlewares/logger.middleware';
import { UserDto, UserRole } from '@modules/user/user.dto';
import { Authorized, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

@Resolver()
export class MeResolver {
  @UseMiddleware(LoggerMiddleware)
  @Authorized([UserRole.USER, UserRole.DEPOSIT_OPERATOR])
  @Query(() => UserDto, { nullable: true })
  async me(@Ctx() ctx: ApolloContext): Promise<UserDto | null> {
    if (!ctx.req?.session?.user?.id) {
      return null;
    }

    return UserDto.findOneBy({ id: +ctx.req.session.user.id });
  }
}

export default MeResolver;
