import { create } from "zustand";
import { Inquiry } from "@/interfaces/inquiry";
import { InquiryPhase } from "@/types/inquiry";
import { patch } from "@/lib/fetcher";

interface InquiryStore {
  inquiries: Inquiry[];
  setInquiries: (inquiries: Inquiry[]) => void;
  moveInquiry: (
    inquiryId: string,
    fromPhase: InquiryPhase,
    toPhase: InquiryPhase
  ) => Promise<void>;
}

export const useInquiryStore = create<InquiryStore>((set) => ({
  inquiries: [],
  setInquiries: (inquiries) => set({ inquiries }),
  moveInquiry: async (inquiryId, fromPhase, toPhase) => {
    if (fromPhase === toPhase) return;

    set((state) => ({
      inquiries: state.inquiries.map((inquiry) =>
        inquiry.id === inquiryId && inquiry.phase === fromPhase
          ? { ...inquiry, phase: toPhase, updatedAt: new Date().toISOString() }
          : inquiry
      ),
    }));

    try {
      await patch(`/api/inquiries/${inquiryId}`, { phase: toPhase });
    } catch (error) {
      console.error("Failed to move inquiry:", error);
      set((state) => ({
        inquiries: state.inquiries.map((inquiry) =>
          inquiry.id === inquiryId && inquiry.phase === toPhase
            ? { ...inquiry, phase: fromPhase }
            : inquiry
        ),
      }));
    }
  },
}));
