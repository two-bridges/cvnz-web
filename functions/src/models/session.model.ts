
export interface ISession {
  loggedIn: boolean,
  isLoggingIn: boolean,
  user: {
    first_name: string,
    last_name: string,
    email: string,
    avatar: string,
    bio: string,
    role: string,
  }
}
