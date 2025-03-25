export class CreateCustomersRequest {
  name: string;
  salary: number;
  company_price: number;

  constructor(name: string, salary: number, company_price: number) {
    this.name = name;
    this.salary = salary;
    this.company_price = company_price;
  }
}
