export type UserLogin = {
  email: string;
  username: string;
};

export interface IUserProvider {
  isAuthenticated: boolean;
  login: (loginRequest: LoginRequest) => Promise<void>;
  logout: () => void;
}

export type LoginRequest = {
  email: string;
  senha: string;
};