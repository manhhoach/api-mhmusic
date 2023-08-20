export const getPagination = (pageSize: number, pageIndex: number) => {
  const limit = pageSize;
  const skip = (pageIndex - 1) * limit;
  return { skip, limit };
};

export const getPagingData = (data: any, pageIndex: number, limit: number) => {
  const records = data[0], count = data[1];
  const currentPage = pageIndex ? pageIndex : 1;
  const totalPages = Math.ceil(count / limit);
  return { totalItems: count, totalPages, currentPage, data: records };
};
