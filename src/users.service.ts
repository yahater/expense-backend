import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UsersService {
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
    const { data, error } = await this.supabase.from('users').select('*');
    if (error) throw error;
    return data;
  }

  async create(dto: { name: string; email: string }) {
    const { data, error } = await this.supabase.from('users').insert(dto);
    if (error) throw error;
    return data;
  }

  async update(id: string, dto: { name?: string; email?: string }) {
    const { data, error } = await this.supabase.from('users').update(dto).eq('id', id);
    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { data, error } = await this.supabase.from('users').delete().eq('id', id);
    if (error) throw error;
    return data;
  }
}
