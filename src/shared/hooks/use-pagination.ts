"use clients";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createFilterMapper } from "../lib";

export const usePagination = (
  itemsCount: number | undefined,
  pageSize: number = 10,
) => {
  const [page, setPage] = useState(1);
  const mounded = useRef(false);
  const searchParams = useSearchParams();
  const totalPages = itemsCount ? Math.ceil(itemsCount / pageSize) : 0;

  const filterMapper = createFilterMapper<{
    page: number;
    pageSize: number;
  }>();

  const handlePageChange = (page: number, total?: number) => {
    if (!total) return;

    if (page >= 1 && page <= total) {
      setPage(page);
    }
  };

  useEffect(() => {
    if (!mounded.current) {
      mounded.current = true;
      const filters = filterMapper.toFilters(searchParams);
      if (filters.page) {
        setPage(filters.page);
      }
    }
    // eslint-disable-next-line
  }, []);

  return {
    page,
    pageSize,
    handlePageChange,
    totalPages,
  };
};
