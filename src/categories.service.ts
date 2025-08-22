import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class CategoriesService {
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
    const { data, error } = await this.supabase.from('categories').select('*');
    if (error) throw error;
    return data;
  }

  async create(dto: { name: string }) {
    const { data, error } = await this.supabase.from('categories').insert(dto);
    if (error) throw error;
    return data;
  }

  async update(id: string, dto: { name?: string }) {
    const { data, error } = await this.supabase.from('categories').update(dto).eq('id', id);
    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { data, error } = await this.supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
    return data;
  }
}
