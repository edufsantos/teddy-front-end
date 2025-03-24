// Example to user model -> one tips is to change to another feature folder
export class User {
  id: string;
  name: string;
  email: string;

  constructor(id: string, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

  static fromApiResponse(responseData: Record<string, unknown>) {
    return new User(
      responseData.id as string,
      responseData.email as string,
      responseData.name as string,
    );
  }
}
