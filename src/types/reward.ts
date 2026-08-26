export interface Reward {
  id: number;
  name: string;
  description: string | null;
  coin_cost: number;
  is_active: boolean;
}

export interface RedeemResponse {
  success: boolean;
  reward_name: string;
  coins_spent: number;
  new_balance: number;
  redeemed_at: string;
}

export interface Redemption {
  id: number;
  reward_name: string;
  coins_spent: number;
  status: string;
  created_at: string;
}
