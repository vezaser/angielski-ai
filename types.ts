
export interface Word {
  id: string;
  english: string;
  polish: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export type AppMode = 'HOME' | 'CATEGORY_SELECT' | 'LEARN' | 'TEST' | 'DICTIONARY' | 'PROGRESS';

export interface AppState {
  mode: AppMode;
  selectedCategory: Category | null;
  words: Word[];
}
