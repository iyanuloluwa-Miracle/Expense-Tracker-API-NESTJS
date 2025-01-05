import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum ExpenseCategory {
  GROCERIES = 'GROCERIES',
  LEISURE = 'LEISURE',
  ELECTRONICS = 'ELECTRONICS',
  UTILITIES = 'UTILITIES',
  CLOTHING = 'CLOTHING',
  HEALTH = 'HEALTH',
  OTHERS = 'OTHERS',
}

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: ExpenseCategory,
  })
  category: ExpenseCategory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.expenses)
  user: User;

  @Column()
  userId: string;

  @Column({ nullable: true })
  paystackReference: string;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
    default: 'PENDING',
  })
  paymentStatus: string;
}
