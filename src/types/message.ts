export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp?: {
    seconds: number;
    nanoseconds: number;
  };
}
