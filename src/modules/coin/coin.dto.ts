import { BalanceDto } from '@modules/balance/balance.dto';
import { CountryDto } from '@modules/country/country.dto';
import { OperationDto } from '@modules/operation/operation.dto';
import { TransactionDto } from '@modules/transaction/transaction.dto';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({
  name: 'coins',
  orderBy: { order: 'ASC' },
})
export class CoinDto extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 6, nullable: false, unique: true })
  symbol: string;

  @Field()
  @Column({ length: 3, nullable: true })
  short: string;

  @Field()
  @Column({ nullable: false, unique: true })
  name: string;

  @Field()
  @Column({ nullable: false })
  flag: string;

  @Field()
  @Column({ name: 'is_symbol_first', nullable: false, default: false })
  isSymbolFirst: boolean;

  @Field()
  @Column({ name: 'is_depositable', nullable: false, default: false })
  isDepositable: boolean;

  @Field()
  @Column({ name: 'is_fiat', nullable: false, default: true })
  isFiat: string;

  @Column({ nullable: false, default: 0 })
  order: number;

  @Field()
  @Column({ type: 'float', nullable: false, default: 1 })
  rate: number;

  @OneToMany(() => BalanceDto, (balance) => balance.coin)
  public balances: BalanceDto[];

  @OneToMany(() => CountryDto, (country) => country.paymentCoin)
  public countries: CountryDto[];

  @OneToMany(() => OperationDto, (operation) => operation.outCoin)
  public operations: OperationDto[];

  @OneToMany(() => TransactionDto, (transaction) => transaction.coin)
  public transactions: TransactionDto[];
}
