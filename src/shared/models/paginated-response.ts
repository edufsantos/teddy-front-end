/* eslint-disable @typescript-eslint/no-explicit-any */
export class PaginatedResponse<T> {
  rows: T[];
  count: number;
  skip: number;
  take: number;

  constructor(rows: T[], meta: { count: number; skip: number; take: number }) {
    this.count = meta.count;
    this.skip = meta.skip;
    this.take = meta.take;
    this.rows = rows;
  }

  static fromApiResponse<T>(
    responseData: any,
    dataMapper: (data: T) => T,
  ): PaginatedResponse<T> {
    const data = (responseData.rows as T[]).map(dataMapper);

    const meta = {
      count: responseData.count as number,
      skip: responseData.skip as number,
      take: responseData.take as number,
    };

    return new PaginatedResponse(data, meta);
  }
}
