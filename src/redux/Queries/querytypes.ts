
export interface QueryFormData {
  senderId: string;
  senderRole: string;
  query?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  category?: string;
  subject?: string;
  message?: string;
}


export interface QueryState {
  form: QueryFormData;
  loading: boolean;
  error: string | null;
  success: boolean;
}
