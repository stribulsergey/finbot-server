import { CoinDto } from '@modules/coin/coin.dto';
import { UserDto } from '@modules/user/user.dto';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'balances' })
export class BalanceDto extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'user_id' })
  userId: number;

  @Field()
  @Column({ name: 'coin_id' })
  coinId: number;

  @Field()
  @Column({ type: 'float', nullable: false, default: 0 })
  amount: number;

  @Field()
  @Column({ type: 'float', nullable: false, default: 0 })
  amountReferrals: number;

  @Field(() => UserDto)
  @ManyToOne(() => UserDto, (user) => user.balances)
  @JoinColumn({ name: 'user_id' })
  public user: UserDto;

  @Field(() => CoinDto)
  @ManyToOne(() => CoinDto, (coin) => coin.balances)
  @JoinColumn({ name: 'coin_id' })
  public coin: CoinDto;
}
