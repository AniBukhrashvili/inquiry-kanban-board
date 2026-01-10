"use client";

import { useState, useEffect } from "react";
import { Inquiry } from "@/interfaces/inquiry";
import { ApiResponse } from "@/interfaces/api";
import { get } from "@/lib/fetcher";

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
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Inquiry Kanban Board
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id}>
              <h2>{inquiry.clientName}</h2>
              <p>{inquiry.contactPerson}</p>
              <p>{inquiry.eventType}</p>
              <p>{inquiry.eventDate}</p>
              <p>{inquiry.guestCount}</p>
              <p>{inquiry.potentialValue}</p>
              <p>{inquiry.phase}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
