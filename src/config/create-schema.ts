import authChecker from '@middlewares/auth-checker';
import BalanceResolver from '@modules/balance/resolvers/balance.resolver';
import OperationResolver from '@modules/operation/resolvers/operation.resolver';
import LoginResolver from '@modules/user/resolvers/login.resolver';
import MeResolver from '@modules/user/resolvers/me.resolver';
import { buildSchema, BuildSchemaOptions } from 'type-graphql';

const createSchema = async () => {
  return await buildSchema({
    resolvers: [MeResolver, LoginResolver, BalanceResolver, OperationResolver],
    authChecker,
  } as BuildSchemaOptions);
};

export default createSchema;
