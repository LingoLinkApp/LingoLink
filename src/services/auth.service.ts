export abstract class AuthService {
  public static async login(email: string, password: string) {
    // Login logic
  }

  public static async register(email: string, username: string, password: string, passwordConfirm: string) {
    const response = await fetch(
      'http://localhost:3333/api/v1/auth/register',
      {
        method: 'POST',
        body: JSON.stringify({email, username, password, password_confirmation: passwordConfirm}),
      }
    )
    return await response.json()
  }

  public static async logout() {
    // Logout logic
  }
}
