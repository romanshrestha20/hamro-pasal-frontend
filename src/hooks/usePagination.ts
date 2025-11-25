import { useState, useMemo } from "react";

export function usePagination<T>(data: T[], perPage = 12) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / perPage);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return data.slice(start, start + perPage);
  }, [data, page, perPage]);

  return { page, setPage, paginated, totalPages };
}
