"use client";

import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ApiResponse } from "@/interfaces/api";
import { get } from "@/lib/fetcher";
import KanbanBoard from "@/components/KanbanBoard";
import { useInquiryStore } from "@/store/inquiryStore";

export default function Home() {
  const setInquiries = useInquiryStore((state) => state.setInquiries);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const result = await get<ApiResponse>("/api/inquiries");
        setInquiries(result.data);
      } catch (err) {
        console.error("Failed to fetch inquiries:", err);
      }
    };

    fetchInquiries();
  }, [setInquiries]);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="min-h-screen py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Inquiry Kanban Board
          </h1>

          <KanbanBoard />
        </div>
      </main>
    </DndProvider>
  );
}
