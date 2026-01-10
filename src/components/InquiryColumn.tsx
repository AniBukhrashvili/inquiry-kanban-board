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
}: InquiryColumnProps) {
  const moveInquiry = useInquiryStore((state) => state.moveInquiry);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "inquiry",
    drop: async (item: { id: string; phase: InquiryPhase }) => {
      if (item.phase !== phase) {
        await moveInquiry(item.id, item.phase, phase);
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
      ref={drop as any}
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
          <InquiryCard key={inquiry.id} inquiry={inquiry} />
        ))}
        {inquiries.length === 0 && (
          <div className="text-center text-gray-400 py-8 text-sm">
            Drop inquiries here
          </div>
        )}
      </div>
    </div>
  );
}
