export type Platform = 'whatsapp' | 'instagram' | 'telegram' | 'facebook';
export type ConversationStatus = 'active' | 'archived' | 'resolved';

export interface Conversation {
  id: string;
  platform: Platform;
  contactName: string;
  contactId: string;
  contactAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  botEnabled: boolean;
  averageResponseTime: number;
  totalMessages: number;
  status: ConversationStatus;
}

export interface ConversationsResponse {
  conversations: Conversation[];
  total: number;
  page: number;
  totalPages: number;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  timestamp: string;
  responseTime?: number;
  agentName?: string;
}

export interface MessagesResponse {
  messages: Message[];
}

export interface SendReplyRequest {
  text: string;
  agentId: string;
}

export interface SendReplyResponse {
  messageId: string;
  sent: boolean;
  timestamp: string;
}

export interface ToggleBotRequest {
  enabled: boolean;
}

export interface ToggleBotResponse {
  conversationId: string;
  botEnabled: boolean;
  message: string;
}
