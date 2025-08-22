import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class ExpensesService {
  private supabase;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getAll() {
    const { data, error } = await this.supabase
      .from('expenses')
      .select(`
        id,
        amount,
        description,
        paid,
        split_type,
        created_at,
        added_at,
        users (id, name),
        categories (id, name)
      `);
    if (error) throw error;
    return data;
  }

  async create(dto: {
    user_id: number;
    category_id: number;
    amount: number;
    description?: string;
    created_at: string;  // user-selected date
    split_type: string;
    paid: boolean;
  }) {
    // Always add the system timestamp on creation
    const payload = {
      ...dto,
      added_at: new Date().toISOString() // current date & time in ISO 8601 format
    };

    const { data, error } = await this.supabase.from('expenses').insert(payload).select();
    if (error) throw error;
    return data;
  }

  async update(id: string, dto: { paid?: boolean }) {
    const { data, error } = await this.supabase.from('expenses').update(dto).eq('id', id);
    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { data, error } = await this.supabase.from('expenses').delete().eq('id', id);
    if (error) throw error;
    return data;
  }
}
