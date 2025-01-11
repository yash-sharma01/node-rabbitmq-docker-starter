export namespace APIResponseTypes {
  export type Paginate = {
    nextPage: number | null;
    previousPage: number;
    hasMore: boolean;
    total: number;
  };

  export type Success = {
    message: string;
    data: any;
    paginate: Paginate | null;
  };
}
