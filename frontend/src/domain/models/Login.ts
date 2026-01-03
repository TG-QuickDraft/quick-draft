export type UserLogin = {
  email: string;
  roles: string[];
};

export interface IUserProvider {
  isAuthenticated: boolean;
  login: (loginRequest: LoginRequest) => Promise<void>;
  logout: () => void;
  roles: string[];
}

export type LoginRequest = {
  email: string;
  senha: string;
};