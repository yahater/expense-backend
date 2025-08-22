import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getAllExpenses() {
    return this.expensesService.getAll();
  }

  @Post()
  createExpense(@Body() dto: { user_id: number; category_id: number; amount: number; description?: string; created_at: string; split_type: string; paid: boolean }) {
    return this.expensesService.create(dto);
  }

  @Patch(':id')
  updateExpense(@Param('id') id: string, @Body() dto: { paid?: boolean }) {
    return this.expensesService.update(id, dto);
  }

  @Delete(':id')
  deleteExpense(@Param('id') id: string) {
    return this.expensesService.delete(id);
  }
}
