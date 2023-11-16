import { UserDto } from '@modules/user/user.dto';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';

const getByTelegramId = async (
  telegramId: number | undefined,
  relations?: FindOptionsRelations<UserDto>,
): Promise<UserDto | null> => {
  if (!telegramId) return null;
  return await UserDto.findOne({ where: { telegramId }, relations });
};

const getByTelegramIdOrFail = async (
  telegramId: number | undefined,
  relations?: FindOptionsRelations<UserDto>,
): Promise<UserDto> => {
  const user = await getByTelegramId(telegramId, relations);
  if (!user) {
    throw new Error('error.userNotFound');
  }
  return user;
};

const getById = async (id: number | undefined, relations?: FindOptionsRelations<UserDto>): Promise<UserDto | null> => {
  if (!id) return null;
  return await UserDto.findOne({ where: { id }, relations });
};

const getByIdOrFail = async (id: number | undefined, relations?: FindOptionsRelations<UserDto>): Promise<UserDto> => {
  const user = await getById(id, relations);
  if (!user) {
    throw new Error('error.userNotFound');
  }
  return user;
};

const getByUsernameOrTelegramId = async (
  search: string | undefined,
  relations?: FindOptionsRelations<UserDto>,
): Promise<UserDto | null> => {
  if (!search) return null;

  if (search.indexOf('@') === 0) {
    search = search.slice(1);
  }

  let user: UserDto | null;
  const telegramId = parseInt(search);
  if (telegramId) {
    user = await getByTelegramId(telegramId, relations);
  } else {
    user = await getByUsername(search, relations);
  }

  return user;
};

const getByUsernameOrTelegramIdOrFail = async (
  search: string | undefined,
  relations?: FindOptionsRelations<UserDto>,
): Promise<UserDto> => {
  const user = await getByUsernameOrTelegramId(search, relations);
  if (!user) {
    throw new Error('error.userNotFound');
  }
  return user;
};

const getByUsername = async (
  username: string | undefined,
  relations?: FindOptionsRelations<UserDto>,
): Promise<UserDto | null> => {
  if (!username) return null;
  return await UserDto.findOne({ where: { username }, relations });
};

const getByUsernameOrFail = async (
  username: string | undefined,
  relations?: FindOptionsRelations<UserDto>,
): Promise<UserDto> => {
  const user = await getByUsername(username, relations);
  if (!user) {
    throw new Error('error.userNotFound');
  }
  return user;
};

export default {
  getById,
  getByIdOrFail,
  getByTelegramId,
  getByTelegramIdOrFail,
  getByUsername,
  getByUsernameOrFail,
  getByUsernameOrTelegramId,
  getByUsernameOrTelegramIdOrFail,
};
