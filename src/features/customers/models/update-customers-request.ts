export class UpdateCustomerRequest {
  id: number;
  name?: string;
  salary?: number;
  company_price?: number;

  constructor(
    id: number,
    name?: string,
    salary?: number,
    company_price?: number,
  ) {
    this.id = id;
    this.name = name ?? undefined;
    this.salary = salary ?? undefined;
    this.company_price = company_price ?? undefined;
  }
}
