// src/expenses/expenses.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
  ) {}

  async create(
    createExpenseDto: CreateExpenseDto,
    user: User,
  ): Promise<Expense> {
    const expense = this.expensesRepository.create({
      ...createExpenseDto,
      user,
    });
    return this.expensesRepository.save(expense);
  }

  async findAllByUser(userId: string): Promise<Expense[]> {
    return this.expensesRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: string, userId: string): Promise<Expense> {
    const expense = await this.expensesRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  async remove(id: string, userId: string): Promise<void> {
    const expense = await this.findOne(id, userId);
    await this.expensesRepository.remove(expense);
  }

  async updatePaymentStatus(reference: string, status: string): Promise<void> {
    const expense = await this.expensesRepository.findOne({
      where: { paystackReference: reference },
    });

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    expense.paymentStatus = status;
    await this.expensesRepository.save(expense);
  }
}
