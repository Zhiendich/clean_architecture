export interface DatabaseRepository {
  authenticate(): Promise<void>;
}

export interface GenericRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findById(id: number): Promise<T | null>;
  findOne(where: Record<string, string>): Promise<T | null>;
  update(id: number, updates: Partial<T>): Promise<number[]>;
  delete(id: number): Promise<number>;
}
