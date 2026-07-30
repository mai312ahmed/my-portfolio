export interface Localized<T> {
  en: T;
  ar: T;
}

export type LocalizedString = string | Localized<string>;
export type LocalizedArray<T> = T[] | Localized<T[]>;

export interface ProjectLinks {
  'Apple store'?: string;
  'Google play'?: string;
  github?: string;
  web?: string;
  [key: string]: string | undefined; // Allow flexible dynamic string keys
}

export interface Project {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  status?: LocalizedString;
  technologies?: LocalizedArray<string>;
  tags?: string[];
  order?: number;
  logo?: string;
  imageUrls?: string[];
  icon?: string;
  features?: LocalizedArray<string>;
  languages?: LocalizedString;
  client?: LocalizedString;
  projectLinks?: ProjectLinks;
  links?: ProjectLinks;
}
