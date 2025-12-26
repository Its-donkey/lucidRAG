export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'viewer';
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
