export class PaginatedRequest {
  skip: number;
  take: number;

  constructor(meta: { skip: number; take: number }) {
    this.skip = meta.skip;
    this.take = meta.take;
  }
}
