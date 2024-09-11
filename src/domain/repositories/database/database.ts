export interface DatabaseRepository {
  authenticate(): Promise<void>;
}
