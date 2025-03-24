export class Customer {
  id: number;
  name: string;
  salary: number;
  company_price: number;
  created_at: Date;

  constructor(
    id: number,
    name: string,
    salary: number,
    company_price: number,
    created_at: Date,
  ) {
    this.id = id;
    this.name = name;
    this.salary = salary;
    this.company_price = company_price;
    this.created_at = created_at;
  }

  static fromApiResponse(responseData: Record<string, unknown>) {
    return new Customer(
      responseData.id as number,
      responseData.name as string,
      responseData.salary as number,
      responseData.company_price as number,
      new Date(responseData.created_at as string),
    );
  }
}
