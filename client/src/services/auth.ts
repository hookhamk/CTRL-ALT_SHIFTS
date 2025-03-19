import { jwtDecode } from 'jwt-decode';

// Define the token structure
interface TokenData {
  id: string;
  email: string;
  access_level: boolean;
  first_name?: string;  // Added first_name
  company_id?: number;  // Added company_id
  exp: number;
}

class AuthService {
  getToken() {
    return localStorage.getItem('token');
  }

  login(token: string) {
    localStorage.setItem('token', token);
    window.location.reload(); // Force reload to update auth state
  }

  logout() {
    localStorage.removeItem('token');
    window.location.replace('/');
  }

  getProfile() {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      return jwtDecode<TokenData>(token);
    } catch (err) {
      console.error('Invalid token format', err);
      this.logout();
      return null;
    }
  }

  getUserId() {
    const profile = this.getProfile();
    return profile?.id || null;
  }

  isAdmin() {
    const profile = this.getProfile();
    return profile?.access_level === true;
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<TokenData>(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return true;
    }
  }
}

export default new AuthService();
