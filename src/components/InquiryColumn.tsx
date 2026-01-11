"use client";

import { useDrop } from "react-dnd";
import { InquiryPhase } from "@/types/inquiry";
import { Inquiry } from "@/interfaces/inquiry";
import InquiryCard from "./InquiryCard";
import { useInquiryStore } from "@/store/inquiryStore";

interface InquiryColumnProps {
  phase: InquiryPhase;
  title: string;
  inquiries: Inquiry[];
  onCardClick?: (inquiry: Inquiry) => void;
  isLoading?: boolean;
}

const PHASE_COLORS: Record<InquiryPhase, string> = {
  new: "bg-blue-500",
  sent_to_hotels: "bg-yellow-500",
  offers_received: "bg-orange-500",
  completed: "bg-green-500",
};

export default function InquiryColumn({
  phase,
  title,
  inquiries,
  onCardClick,
  isLoading = false,
}: InquiryColumnProps) {
  const updateInquiry = useInquiryStore((state) => state.updateInquiry);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "inquiry",
    drop: async (item: { id: string; phase: InquiryPhase }) => {
      if (item.phase !== phase) {
        await updateInquiry(item.id, { phase });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const count = inquiries.length;
  const totalValue = inquiries.reduce(
    (sum, inquiry) => sum + inquiry.potentialValue,
    0
  );

  const isActive = isOver && canDrop;

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`flex-shrink-0 w-80 rounded-xl border bg-slate-50 p-2 transition-all duration-200 ${
        isActive ? "ring-2 ring-blue-300" : ""
      }`}
    >
      <div className="mb-4 border-b p-2">
        <h2 className="text-lg font-bold mb-2 flex items-center gap-1">
          <span
            className={`w-2 h-2 rounded-full ${PHASE_COLORS[phase]}`}
          ></span>
          {title}
        </h2>
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium">
            {count} {count === 1 ? "inquiry" : "inquiries"}
          </span>
          <span className="font-semibold">
            CHF {totalValue.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="space-y-3 min-h-[200px]">
        {inquiries.map((inquiry) => (
          <InquiryCard
            key={inquiry.id}
            inquiry={inquiry}
            onCardClick={onCardClick}
          />
        ))}

        {inquiries.length === 0 && isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
          </div>
        )}

        {inquiries.length === 0 && !isLoading && (
          <div className="text-center text-gray-400 py-8 text-sm">
            No inquiries found
          </div>
        )}
      </div>
    </div>
  );
}
