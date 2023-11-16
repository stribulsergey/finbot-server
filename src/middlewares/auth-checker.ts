import { ApolloContext } from '@custom-types/common';
import { UserRole } from '@modules/user/user.dto';
import { AuthChecker } from 'type-graphql';

const customAuthChecker: AuthChecker<ApolloContext> = ({ root, args, context, info }, roles) => {
  if (!context.req.session.user?.role) {
    return false;
  }
  return roles.indexOf(context.req.session.user.role) !== -1 || context.req.session.user.role === UserRole.ADMIN;
};

export default customAuthChecker;
