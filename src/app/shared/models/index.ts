export type MemberStatus   = 'active' | 'expiring' | 'expired' | 'inactive';
export type Gender         = 'male' | 'female';
export type PlanDuration   = 'monthly' | 'quarterly' | 'semi_annual' | 'annual';
export type PaymentMethod  = 'cash' | 'card' | 'transfer';
export type PaymentStatus  = 'paid' | 'pending' | 'refunded';
export type DiscountType   = 'percentage' | 'fixed';

export interface Sport {
  id: number; name: string; status: 'active' | 'inactive'; memberCount?: number; color?: string;
}
export interface Member {
  id: number; fullName: string; phone: string; email?: string; dateOfBirth?: string;
  gender: Gender; sportId: number; sport?: Sport; photo?: string; notes?: string;
  status: MemberStatus; createdAt: string;
}
export interface MembershipPlan {
  id: number; name: string; duration: PlanDuration; daysCount: number; price: number; status: 'active' | 'inactive';
}
export interface ActiveMembership {
  id: number; memberId: number; member?: Member; planId: number; plan?: MembershipPlan;
  startDate: string; endDate: string; daysLeft: number; status: MemberStatus; finalPrice: number;
}
export interface Payment {
  id: number; invoiceNumber: string; memberId: number; member?: Member; planName: string;
  amount: number; discount: number; finalAmount: number; method: PaymentMethod; status: PaymentStatus;
  paidAt: string; notes?: string;
}
export interface Offer {
  id: number; name: string; discountType: DiscountType; discountValue: number;
  startDate: string; endDate: string; status: 'active' | 'scheduled' | 'expired'; description?: string;
}
export interface DashboardStats {
  totalMembers: number; activeMembers: number; expiringThisWeek: number;
  expiredMembers: number; monthlyRevenue: number; revenueGrowth: number; todayRevenue: number;
}
export interface PaginatedResponse<T> {
  data: T[]; total: number; page: number; perPage: number; totalPages: number;
}
