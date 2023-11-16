import { CoinDto } from '@modules/coin/coin.dto';
import { CountryDto } from '@modules/country/country.dto';
import { TransactionDto } from '@modules/transaction/transaction.dto';
import { UserDto } from '@modules/user/user.dto';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum OperationType {
  DEPOSIT = 'deposit',
  SPEND = 'spend',
  EXCHANGE = 'exchange',
  SEND = 'send',
  RECEIVE = 'receive',
  WITHDRAW = 'withdraw',
  ATM = 'atm',
}

export enum OperationStatus {
  NEW = 'new',
  SPEND_PREPARATION = 'spend_preparation',
  SUCCESS = 'success',
  CANCELED_BY_USER = 'canceled_by_user',
  CANCELED_BY_USER_INSUFFICIENT_BALANCE = 'canceled_by_user_insufficient_balance',
  CANCELED_BY_OPERATOR_INSUFFICIENT_BALANCE = 'canceled_by_operator_insufficient_balance',
  CANCELED_BY_OPERATOR = 'canceled_by_operator',
  IN_PROGRESS = 'in_progress',
  SUCCESSFULLY_PAID = 'successfully_paid',
  OPERATION_FAILED = 'operation_failed',
  WRONG_AMOUNT_INPUT_VALUE = 'wrong_amount_input_value',
  WRONG_AMOUNT_PENDING = 'wrong_amount_pending',
  WRONG_AMOUNT_CONFIRMED = 'wrong_amount_confirmed',

  ATM_WAITING_OPERATOR_QR = 'atm_waiting_operator_qr',
  ATM_WAITING_USER_START = 'atm_waiting_user_start',
}

@ObjectType()
@Entity({ name: 'operations' })
export class OperationDto extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column({
    name: 'type',
    type: 'enum',
    enum: OperationType,
    nullable: false,
  })
  type: OperationType;

  @Field({ nullable: false })
  @Column({
    name: 'status',
    type: 'enum',
    enum: OperationStatus,
    nullable: false,
    default: OperationStatus.NEW,
  })
  status: OperationStatus;

  @Field({ nullable: true })
  @Column({ type: 'float' })
  amount: number;

  @Field({ nullable: true })
  @Column({ name: 'in_amount', type: 'float', nullable: true })
  inAmount: number;

  @Field({ nullable: true })
  @Column({ type: 'float', nullable: true })
  correctedAmount?: number;

  @Field({ nullable: false })
  @Column({ name: 'amount_with_tax', type: 'float', nullable: false, default: 0 })
  amountWithTax: number;

  @Field({ nullable: true })
  @Column({ name: 'country_id', nullable: true })
  countryId: number;

  @Field({ nullable: true })
  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Field({ nullable: true })
  @Column({ name: 'user_to_id', nullable: true })
  userToId: number;

  @Field({ nullable: true })
  @Column({ name: 'operator_id', nullable: true })
  operatorId: number;

  @Column({ name: 'group_id', type: 'bigint', nullable: true })
  groupId: number;

  @Column({ name: 'group_message_id', nullable: true })
  groupMessageId: number;

  @Column({ name: 'channel_id', type: 'bigint', nullable: true })
  channelId: number;

  @Column({ name: 'channel_message_id', nullable: true })
  channelMessageId: number;

  @Column({ name: 'info_message_id', nullable: true })
  infoMessageId: number;

  @Field({ nullable: true })
  @Column({ name: 'file_id', nullable: true })
  fileId: string;

  @Field({ nullable: true })
  @Column({ name: 'in_coin_id', nullable: true })
  inCoinId: number;

  @Field({ nullable: true })
  @Column({ name: 'out_coin_id', nullable: true })
  outCoinId: number;

  @Field({ nullable: true })
  @Column({ name: 'file_url', nullable: true })
  fileUrl: string;

  @Field({ nullable: true })
  @Column({ name: 'proof_file_url', nullable: true })
  proofFileUrl: string;

  @Field({ nullable: true })
  @Column({ name: 'proof_file_id', nullable: true })
  proofFileId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  data: string;

  @Field({ nullable: true })
  @Column({ type: 'float', nullable: true })
  rate: number;

  @Field({ nullable: true })
  @Column({ type: 'float', nullable: true })
  rateWithTax: number;

  @Column({ nullable: false, default: false })
  isActive: boolean;

  @ManyToOne(() => CountryDto, (country) => country.operations, { eager: true })
  @JoinColumn({ name: 'country_id' })
  country: CountryDto;

  @ManyToOne(() => CoinDto, (coin) => coin.operations, { eager: true })
  @JoinColumn({ name: 'in_coin_id' })
  inCoin: CoinDto;

  @ManyToOne(() => CoinDto, (coin) => coin.operations, { eager: true })
  @JoinColumn({ name: 'out_coin_id' })
  outCoin: CoinDto;

  @ManyToOne(() => UserDto, (user) => user.operations, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserDto;

  @ManyToOne(() => UserDto, (user) => user.operations)
  @JoinColumn({ name: 'user_to_id' })
  userTo: UserDto;

  @ManyToOne(() => UserDto, (user) => user.operatorOperations, { eager: true })
  @JoinColumn({ name: 'operator_id' })
  operator: UserDto;

  @OneToMany(() => TransactionDto, (transaction) => transaction.operation)
  transactions: TransactionDto[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
