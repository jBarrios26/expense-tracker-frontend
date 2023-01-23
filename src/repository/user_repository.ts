class UserRepository {
  getLocalRefreshToken(): string {
    const refreshToken = localStorage.getItem('refreshToken');
    return refreshToken ?? '';
  }

  setLocalRefreshToken(value: string): void {
    localStorage.setItem('refreshToken', value);
  }

  removeUser() {
    localStorage.removeItem('refreshToken');
  }
}

export default new UserRepository();
