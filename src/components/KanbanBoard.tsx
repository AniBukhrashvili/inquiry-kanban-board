"use client";

import { InquiryPhase } from "@/types/inquiry";
import { Inquiry } from "@/interfaces/inquiry";
import { useInquiryStore } from "@/store/inquiryStore";
import InquiryColumn from "./InquiryColumn";

const PHASES: { phase: InquiryPhase; title: string }[] = [
  { phase: "new", title: "New" },
  { phase: "sent_to_hotels", title: "Sent to Hotels" },
  { phase: "offers_received", title: "Offers Received" },
  { phase: "completed", title: "Completed" },
];

export default function KanbanBoard() {
  const inquiries = useInquiryStore((state) => state.inquiries);

  const getInquiriesByPhase = (phase: InquiryPhase): Inquiry[] => {
    return inquiries.filter((inquiry) => inquiry.phase === phase);
  };

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex gap-4 justify-center min-w-max p-2">
        {PHASES.map(({ phase, title }) => (
          <InquiryColumn
            key={phase}
            phase={phase}
            title={title}
            inquiries={getInquiriesByPhase(phase)}
          />
        ))}
      </div>
    </div>
  );
}
