"use client";

import { useEffect } from "react";
import { ApiResponse } from "@/interfaces/api";
import { get } from "@/lib/fetcher";
import Header from "@/components/Header";
import KanbanBoard from "@/components/KanbanBoard";
import FilterPanel from "@/components/FilterPanel";
import { useInquiryStore } from "@/store/inquiryStore";

export default function Home() {
  const setInquiries = useInquiryStore((state) => state.setInquiries);
  const filters = useInquiryStore((state) => state.filters);
  const setFilters = useInquiryStore((state) => state.setFilters);
  const setLoading = useInquiryStore((state) => state.setLoading);

  useEffect(() => {
    const fetchInquiries = async () => {
      setLoading(true);
      try {
        const params: Record<string, string | number | undefined> = {};
        if (filters.clientName) params.clientName = filters.clientName;
        if (filters.dateFrom) params.dateFrom = filters.dateFrom;
        if (filters.dateTo) params.dateTo = filters.dateTo;
        if (filters.minValue !== undefined) params.minValue = filters.minValue;

        const result = await get<ApiResponse>("/api/inquiries", params);
        setInquiries(result.data);
      } catch (err) {
        console.error("Failed to fetch inquiries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [setInquiries, setLoading, filters]);

  return (
    <>
      <Header />
      <main className="min-h-screen py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-4">
          <FilterPanel filters={filters} onFiltersChange={setFilters} />
          <KanbanBoard />
        </div>
      </main>
    </>
  );
}
