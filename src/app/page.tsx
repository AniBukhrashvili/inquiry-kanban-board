"use client";

import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ApiResponse } from "@/interfaces/api";
import { get } from "@/lib/fetcher";
import KanbanBoard from "@/components/KanbanBoard";
import FilterPanel from "@/components/FilterPanel";
import { useInquiryStore } from "@/store/inquiryStore";

export default function Home() {
  const setInquiries = useInquiryStore((state) => state.setInquiries);
  const filters = useInquiryStore((state) => state.filters);
  const setFilters = useInquiryStore((state) => state.setFilters);

  useEffect(() => {
    const fetchInquiries = async () => {
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
      }
    };

    fetchInquiries();
  }, [setInquiries, filters]);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="min-h-screen py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Inquiry Kanban Board
          </h1>
          <FilterPanel filters={filters} onFiltersChange={setFilters} />
          <KanbanBoard />
        </div>
      </main>
    </DndProvider>
  );
}
