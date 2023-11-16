import { CoinDto } from '@modules/coin/coin.dto';
import { OperationDto } from '@modules/operation/operation.dto';
import { UserDto } from '@modules/user/user.dto';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TransactionType {
  DEBIT,
  CREDIT,
  DISTRIBUTION,
}

@Entity({ name: 'transactions' })
export class TransactionDto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: TransactionType,
    nullable: false,
  })
  type: TransactionType;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ name: 'coin_id' })
  coinId: number;

  @Column({ name: 'operation_id', nullable: true })
  operationId: number | null;

  @Column({ type: 'text', nullable: false, default: '' })
  comment: string;

  @ManyToOne(() => UserDto, (user) => user.transactions)
  @JoinColumn({ name: 'user' })
  public user: UserDto;

  @ManyToOne(() => CoinDto, (coin) => coin.transactions, { eager: true })
  @JoinColumn({ name: 'coin_id' })
  coin: CoinDto;

  @ManyToOne(() => OperationDto, (operation) => operation.transactions, { eager: true })
  @JoinColumn({ name: 'operation_id' })
  operation: OperationDto;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
