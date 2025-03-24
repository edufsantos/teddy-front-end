import { Config } from '@/shared/constants/config';
import { HttpClient } from '@/shared/http/http-client';
import { LoggerInterface } from '@/shared/utils/logger';
import { LoginRequest } from '../models/login-request';

class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly logger: LoggerInterface,
  ) {}

  async loginWithCredentials(request: LoginRequest): Promise<void> {
    try {
      this.logger.info(`Logging in user: ${request.name}`);
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a delay
      localStorage.setItem(Config.AUTH_TOKEN, 'fake-token'); // Simulate a successful login
      localStorage.setItem(Config.CURRENT_USER_NAME, request.name); // Simulate storing the username
    } catch (error) {
      this.logger.error(`Login failed: ${error}`);
      throw new Error('Invalid credentials');
    }
  }
}

export { AuthService };
