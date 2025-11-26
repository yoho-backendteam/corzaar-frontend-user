
export interface QueryFormData {
  senderId: string;
  senderRole: string;
  message: string;

  queries?: {
    senderRole: string;
    query: string;
    response: string;
    status: string;
    date: Date | string;
  };

  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  category?: string;
}




export interface QueryState {
  form: QueryFormData;
  loading: boolean;
  error: string | null;
  success: boolean;
}
