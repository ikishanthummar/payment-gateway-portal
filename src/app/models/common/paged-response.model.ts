export interface PagedResponse<T> {
  items: T[];
  totalRecords: number;
  page: number;
  pageSize: number;
}
