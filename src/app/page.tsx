"use client";

import { useState, useEffect } from "react";
import { Inquiry } from "@/interfaces/inquiry";
import { ApiResponse } from "@/interfaces/api";
import { get } from "@/lib/fetcher";
import InquiryCard from "@/components/InquiryCard";

export default function Home() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

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
  }, []);

  return (
    <main className="min-h-screen py-4 sm:py-6 lg:py-8">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Inquiry Kanban Board
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inquiries.map((inquiry) => (
            <InquiryCard key={inquiry.id} inquiry={inquiry} />
          ))}
        </div>
      </div>
    </main>
  );
}
