"use client";

import { useDrag } from "react-dnd";
import { Inquiry } from "@/interfaces/inquiry";
import { formatRelativeDate } from "@/lib/date-utils";

interface InquiryCardProps {
  inquiry: Inquiry;
}

export default function InquiryCard({ inquiry }: InquiryCardProps) {
  const isHighValue = inquiry.potentialValue > 50000;

  const [{ isDragging }, drag] = useDrag({
    type: "inquiry",
    item: { id: inquiry.id, phase: inquiry.phase },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag as any}
      className={`bg-white rounded-xl p-3 sm:p-4 border cursor-move transition-all duration-200 shadow-sm ${
        isHighValue ? "border-yellow-400" : "border-gray-300"
      } ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="flex justify-between items-center mb-3 gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
          {inquiry.clientName}
        </h3>
        {isHighValue && (
          <span className="px-2 py-1 text-xs font-semibold bg-yellow-400 text-yellow-700 rounded-full whitespace-nowrap">
            High Value
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-1">
          <span className="text-sm text-gray-600">Event Date:</span>
          <span className="text-sm font-medium text-gray-800">
            {formatRelativeDate(inquiry.eventDate)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-1">
          <span className="text-sm text-gray-600">Guests:</span>
          <span className="text-sm font-medium text-gray-800">
            {inquiry.guestCount}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-200 gap-1">
          <span className="text-sm text-gray-600">Value:</span>
          <span
            className={`text-base font-bold ${
              isHighValue ? "text-yellow-700" : "text-green-600"
            }`}
          >
            CHF {inquiry.potentialValue.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
