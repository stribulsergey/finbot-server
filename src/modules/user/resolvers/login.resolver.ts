import { ApolloContext } from '@custom-types/common';
import { UserDto } from '@modules/user/user.dto';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import TgmBot from '../../../tgm-bot';

@Resolver()
export class LoginResolver {
  @Mutation(() => String, { nullable: false })
  async firstLogin(@Arg('telegramId') telegramId: number): Promise<String> {
    const user = await UserDto.findOne({ where: { telegramId } });

    if (!user) {
      return 'User not found';
    }

    user.password = getRandomArbitrary(100000, 999999).toString();
    await user.save();

    await TgmBot.api.sendMessage(user.telegramId, `Your password is: ${user.password}`);

    return 'Message was sent to your telegram account';
  }

  @Mutation(() => UserDto, { nullable: true })
  async login(
    @Arg('telegramId') telegramId: number,
    @Arg('password') password: string,
    @Ctx() ctx: ApolloContext,
  ): Promise<UserDto | null> {
    const user = await UserDto.findOne({ where: { telegramId } });

    if (!user) {
      return null;
    }

    const valid = password === user.password;

    if (!valid) {
      return null;
    }

    ctx.req!.session!.user = {
      id: user.id,
      role: user.role,
    };

    return user;
  }
}

export default LoginResolver;

function getRandomArbitrary(min: number, max: number) {
  return Math.ceil(Math.random() * (max - min) + min);
}
