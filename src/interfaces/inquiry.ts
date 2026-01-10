import { InquiryPhase } from "@/types/inquiry";

export interface Inquiry {
  id: string;
  clientName: string;
  contactPerson: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  potentialValue: number;
  phase: InquiryPhase;
  hotels: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryFilters {
  clientName?: string;
  dateFrom?: string;
  dateTo?: string;
  minValue?: number;
}
