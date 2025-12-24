export type UserLogin = {
  email: string;
  username: string;
};

export interface IUserProvider {
  logout: () => void;
  user: UserLogin;
  setUser: (user: UserLogin) => void;
  isAuthenticated: boolean;
}
