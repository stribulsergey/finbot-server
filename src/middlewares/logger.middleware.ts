import getLogger from '@utils/logger';
import { MiddlewareFn } from 'type-graphql';

const logger = getLogger('LOGGER_RESOLVER');
export const LoggerMiddleware: MiddlewareFn = async ({ info, root, context, args }, next) => {
  logger.info({ message: { name: `${info.parentType.name}.${info.fieldName}`, ...args } });
  await next();
};
