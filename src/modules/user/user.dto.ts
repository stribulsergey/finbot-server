import { TransactionDto } from '@modules/transaction/transaction.dto';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
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
import { BalanceDto } from '../balance/balance.dto';
import { CountryDto } from '../country/country.dto';
import { OperationDto } from '../operation/operation.dto';

export enum UserRole {
  ADMIN = 'admin',
  DEPOSIT_OPERATOR = 'deposit_operator',
  USER = 'user',
}

export enum CommissionType {
  BASE = 'base',
  PREMIUM = 'premium',
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User roles',
});

@ObjectType()
@Entity({ name: 'users' })
export class UserDto extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column({ nullable: false })
  name: string;

  @Field({ nullable: false })
  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Field({ nullable: false })
  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: false,
    default: UserRole.USER,
  })
  role: UserRole;

  @Field({ nullable: true })
  @Column({ name: 'referral_id', nullable: true })
  referralId: number;

  @Field({ nullable: false })
  @Column({ length: 2, nullable: false })
  language: string;

  @Field({ nullable: true })
  @Column({ name: 'referral_code', nullable: true, unique: true })
  referralCode: string;

  @Field({ nullable: false })
  @Column({ name: 'referral_count', nullable: false, default: '0:0:0' })
  referralCount: string;

  @Field({ nullable: false })
  @Column({ name: 'telegram_id', unique: true, nullable: false, type: 'bigint' })
  telegramId: number;

  @Field({ nullable: false })
  @Column({ name: 'guest_country_id', nullable: false, default: 1 })
  guestCountryId: number;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'text' })
  description: string;

  @Field({ nullable: true })
  @Column({ type: 'json', nullable: true, default: '{}' })
  addresses: string;

  @Field({ nullable: false })
  @Column({ name: 'operatorTax', nullable: false, default: 40 })
  operatorTax: number;

  @Column({
    name: 'commission_type',
    type: 'enum',
    enum: CommissionType,
    nullable: false,
    default: CommissionType.BASE,
  })
  commissionType: CommissionType;

  @ManyToOne(() => CountryDto, (country) => country.guests, { eager: true })
  @JoinColumn({ name: 'guest_country_id' })
  guestCountry: CountryDto;

  @Field(() => [UserDto], { nullable: true })
  @OneToMany(() => UserDto, (referral) => referral.referral)
  referrals: UserDto[];

  @Field(() => UserDto, { nullable: true })
  @ManyToOne(() => UserDto, (user) => user.referrals)
  @JoinColumn({ name: 'referral_id' })
  referral: UserDto;

  @OneToMany(() => BalanceDto, (balance) => balance.user)
  public balances: BalanceDto[];

  @OneToMany(() => OperationDto, (operation) => operation.user)
  public operations: OperationDto[];

  @OneToMany(() => OperationDto, (operation) => operation.operator)
  public operatorOperations: OperationDto[];

  @OneToMany(() => TransactionDto, (transaction) => transaction.user)
  public transactions: TransactionDto[];

  @Field({ nullable: true })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
