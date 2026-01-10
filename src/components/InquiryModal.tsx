"use client";

import { useState, useEffect } from "react";
import { Inquiry } from "@/interfaces/inquiry";
import { InquiryPhase } from "@/types/inquiry";
import { useInquiryStore } from "@/store/inquiryStore";
import Portal from "./ui/Portal";
import Select from "./ui/Select";
import Badge from "./ui/Badge";
import { formatDate } from "@/lib/date-utils";
import CloseIcon from "@/assets/svgs/CloseIcon";
import HotelIcon from "@/assets/svgs/HotelIcon";

interface InquiryModalProps {
  inquiry: Inquiry | null;
  isOpen: boolean;
  onClose: () => void;
}

const PHASE_OPTIONS: { value: InquiryPhase; label: string }[] = [
  { value: "new", label: "New" },
  { value: "sent_to_hotels", label: "Sent to Hotels" },
  { value: "offers_received", label: "Offers Received" },
  { value: "completed", label: "Completed" },
];

export default function InquiryModal({
  inquiry,
  isOpen,
  onClose,
}: InquiryModalProps) {
  const [selectedPhase, setSelectedPhase] = useState<InquiryPhase | "">("");
  const [isSaving, setIsSaving] = useState(false);
  const updateInquiry = useInquiryStore((state) => state.updateInquiry);

  useEffect(() => {
    if (inquiry) {
      setSelectedPhase(inquiry.phase);
    }
  }, [inquiry]);

  if (!isOpen || !inquiry) return null;

  const handlePhaseChange = async (newPhase: InquiryPhase) => {
    if (newPhase === inquiry.phase) return;

    setIsSaving(true);
    try {
      await updateInquiry(inquiry.id, { phase: newPhase });
      setSelectedPhase(newPhase);
    } catch (error) {
      console.error("Failed to update phase:", error);
      setSelectedPhase(inquiry.phase);
    } finally {
      setIsSaving(false);
    }
  };

  const isHighValue = inquiry.potentialValue > 50000;

  return (
    <Portal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-800">
                Inquiry Details
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close modal"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">
                {inquiry.id}
              </span>
              {isHighValue && <Badge title="High Value" />}
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <InquiryModalField
                label="Client Name"
                value={inquiry.clientName}
                className="text-lg font-semibold text-gray-800"
              />
              <InquiryModalField
                label="Contact Person"
                value={inquiry.contactPerson}
              />
              <InquiryModalField label="Event Type" value={inquiry.eventType} />
              <InquiryModalField
                label="Event Date"
                value={formatDate(inquiry.eventDate)}
              />
              <InquiryModalField
                label="Guest Count"
                value={inquiry.guestCount.toString()}
              />
              <InquiryModalField
                label="Potential Value"
                value={`CHF ${inquiry.potentialValue.toLocaleString()}`}
                className={`text-lg font-bold ${
                  isHighValue ? "text-yellow-700" : "text-green-600"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Phase
              </label>
              <Select
                value={selectedPhase}
                onChange={(value: string) =>
                  handlePhaseChange(value as InquiryPhase)
                }
                disabled={isSaving}
                options={PHASE_OPTIONS}
              />
            </div>

            <InquiryModalField
              label="Associated Hotels"
              value=""
              variant="secondary"
              hotels={inquiry.hotels}
            />

            <InquiryModalField
              label="Notes"
              value={inquiry.notes || ""}
              variant="secondary"
            />

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Created:</span>
                <span className="text-gray-800 font-medium">
                  {formatDate(inquiry.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Last Updated:</span>
                <span className="text-gray-800 font-medium">
                  {formatDate(inquiry.updatedAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-2xl flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              aria-label="Close modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export const InquiryModalField = ({
  label,
  value,
  className,
  variant = "default",
  hotels,
}: {
  label: string;
  value: string;
  className?: string;
  variant?: "default" | "highlight" | "secondary";
  hotels?: string[];
}) => {
  if (variant === "secondary") {
    if (hotels !== undefined) {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            {label}
          </label>
          {hotels && hotels.length > 0 ? (
            <ul className="space-y-2">
              {hotels.map((hotel, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <HotelIcon className="w-5 h-5 text-blue-500" />
                  <span className="text-base text-gray-800">{hotel}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">No hotels associated</p>
          )}
        </div>
      );
    }

    return (
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          {label}
        </label>
        <div className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 min-h-[100px]">
          <p className="text-base text-gray-800 whitespace-pre-wrap">
            {value || <span className="text-gray-400 italic">No notes</span>}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <p className={`mt-1 text-base text-gray-800 ${className || ""}`}>
        {value}
      </p>
    </div>
  );
};
