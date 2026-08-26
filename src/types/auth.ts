export interface User {
  id: number;
  name: string;
  email: string;
  coin_balance: number;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}
