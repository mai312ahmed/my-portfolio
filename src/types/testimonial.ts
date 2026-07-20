import type { LocalizedString } from './project';

export interface Testimonial {
  id?: string;
  writer: LocalizedString;
  content: LocalizedString;
  rating: number;
  date?: {
    seconds: number;
    nanoseconds: number;
  };
}
