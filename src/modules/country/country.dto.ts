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
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'countries' })
export class CountryDto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ name: 'is_active', nullable: false, default: false })
  isActive: boolean;

  @Column({ name: 'coin_id', nullable: false })
  coinId: number;

  @Column({ name: 'channel_id', nullable: true })
  channelId: string;

  @Column({ name: 'group_id', nullable: true })
  groupId: string;

  @Column({ name: 'deposit_channel_id', nullable: true })
  depositChannelId: string;

  @Column({ name: 'deposit_group_id', nullable: true })
  depositGroupId: string;

  @Column({ name: 'payment_tax', type: 'float', nullable: false, default: 0 })
  paymentTax: number;

  @Column({ name: 'features', nullable: false, default: 'pay' })
  features: string;

  @OneToMany(() => UserDto, (user) => user.guestCountry)
  guests: UserDto[];

  @OneToMany(() => OperationDto, (operation) => operation.country)
  operations: OperationDto[];

  @ManyToOne(() => CoinDto, (coin) => coin.countries, { eager: true })
  @JoinColumn({ name: 'coin_id' })
  paymentCoin: CoinDto;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
