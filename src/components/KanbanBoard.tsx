"use client";

import { useState } from "react";
import { InquiryPhase } from "@/types/inquiry";
import { Inquiry } from "@/interfaces/inquiry";
import { useInquiryStore } from "@/store/inquiryStore";
import InquiryColumn from "./InquiryColumn";
import InquiryModal from "./InquiryModal";

const PHASES: { phase: InquiryPhase; title: string }[] = [
  { phase: "new", title: "New" },
  { phase: "sent_to_hotels", title: "Sent to Hotels" },
  { phase: "offers_received", title: "Offers Received" },
  { phase: "completed", title: "Completed" },
];

export default function KanbanBoard() {
  const inquiries = useInquiryStore((state) => state.inquiries);
  const isLoading = useInquiryStore((state) => state.isLoading);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getInquiriesByPhase = (phase: InquiryPhase): Inquiry[] => {
    return inquiries.filter((inquiry) => inquiry.phase === phase);
  };

  const handleCardClick = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInquiry(null);
  };

  return (
    <>
      <div className="w-full overflow-x-auto pb-4">
        <div className="flex gap-4 justify-center min-w-max p-2">
          {PHASES.map(({ phase, title }) => (
            <InquiryColumn
              key={phase}
              phase={phase}
              title={title}
              inquiries={getInquiriesByPhase(phase)}
              onCardClick={handleCardClick}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
      <InquiryModal
        inquiry={selectedInquiry}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
