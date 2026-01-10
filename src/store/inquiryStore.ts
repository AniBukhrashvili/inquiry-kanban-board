import { create } from "zustand";
import { Inquiry } from "@/interfaces/inquiry";
import { InquiryPhase } from "@/types/inquiry";
import { patch } from "@/lib/fetcher";

type UpdatableInquiryFields = Omit<Inquiry, "id" | "createdAt">;

interface InquiryStore {
  inquiries: Inquiry[];
  setInquiries: (inquiries: Inquiry[]) => void;
  updateInquiry: (
    inquiryId: string,
    updates: Partial<UpdatableInquiryFields>
  ) => Promise<void>;
}

export const useInquiryStore = create<InquiryStore>((set, get) => ({
  inquiries: [],
  setInquiries: (inquiries) => set({ inquiries }),
  updateInquiry: async (inquiryId, updates) => {
    const state = get();
    const originalInquiry = state.inquiries.find((inq) => inq.id === inquiryId);
    if (!originalInquiry) {
      throw new Error(`Inquiry with id ${inquiryId} not found`);
    }

    const updatePayload = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      inquiries: state.inquiries.map((inquiry) =>
        inquiry.id === inquiryId ? { ...inquiry, ...updatePayload } : inquiry
      ),
    }));

    try {
      await patch(`/api/inquiries/${inquiryId}`, updates);
    } catch (error) {
      console.error("Failed to update inquiry:", error);
      set((state) => ({
        inquiries: state.inquiries.map((inquiry) =>
          inquiry.id === inquiryId ? originalInquiry : inquiry
        ),
      }));
      throw error;
    }
  },
}));
