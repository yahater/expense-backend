import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { SupabaseService } from './supabase.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes env variables available everywhere
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
  ],
  controllers: [UsersController, CategoriesController, ExpensesController],
  providers: [SupabaseService, UsersService, CategoriesService, ExpensesService],
})
export class AppModule {}
