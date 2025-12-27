export interface DashboardStats {
  totalConversations: number;
  activeConversations: number;
  averageResponseTime: number;
  botEnabledCount: number;
  platformStats: {
    whatsapp: number;
    instagram: number;
    telegram: number;
    facebook: number;
  };
  todayMessages: number;
}
