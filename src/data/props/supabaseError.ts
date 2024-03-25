export interface SupabaseError extends Error {
    message: string;
    details?: string;
    hint?: string;
    code?: string;
  }