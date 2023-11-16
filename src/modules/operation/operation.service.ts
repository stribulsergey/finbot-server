import { OperationDto } from '@modules/operation/operation.dto';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';

const getById = async (
  id: number | null | undefined,
  relations?: FindOptionsRelations<OperationDto>,
): Promise<OperationDto | null> => {
  if (!id) return null;

  return await OperationDto.findOne({ where: { id }, relations });
};

const getActiveByOperator = async (
  userId: number,
  relations?: FindOptionsRelations<OperationDto>,
  skip?: number,
  take?: number,
): Promise<[OperationDto[], number]> => {
  return OperationDto.findAndCount({
    where: [
      { operatorId: userId, isActive: true },
      { userId, isActive: true },
    ],
    order: { createdAt: 'DESC' },
    relations,
    skip,
    take,
  });
};

export default {
  getById,
  getActiveByOperator,
};
