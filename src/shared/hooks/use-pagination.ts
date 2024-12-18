"use clients";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createFilterMapper } from "../lib/create-filter-mapper";

export const usePagination = () => {
  const [page, setPage] = useState(1);
  const pageSize = 25;
  const mounded = useRef(false);
  const searchParams = useSearchParams();

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
  }, []);

  return {
    page,
    pageSize,
    handlePageChange,
  };
};
