import { HttpClient } from '@/shared/http/http-client';
import { LoggerInterface } from '@/shared/utils/logger';

import { User } from '../models/user-model';
import { Config } from '@/shared/constants/config';

class UserService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly logger: LoggerInterface,
  ) {}

  async me(): Promise<User | undefined> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
      const userName = localStorage.getItem(Config.CURRENT_USER_NAME);
      const token = localStorage.getItem(Config.AUTH_TOKEN);

      if (!userName || !token) {
        return undefined;
      }
      return User.fromApiResponse({
        id: 1,
        name: userName,
        email: `${userName}@mail.com`,
      });
    } catch (error) {
      this.logger.error(`User not found: ${error}`);
      throw new Error('User not found');
    }
  }
}

export { UserService };
