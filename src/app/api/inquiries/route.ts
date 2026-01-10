import { NextRequest, NextResponse } from "next/server";
import { mockInquiries } from "@/data/mockInquiries";
import { InquiryFilters } from "@/interfaces/inquiry";
import { delay } from "@/lib/delay";

export async function GET(request: NextRequest) {
  await delay(500);

  try {
    const searchParams = request.nextUrl.searchParams;
    const filters: InquiryFilters = {};

    const clientName = searchParams.get("clientName");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");
    const minValue = searchParams.get("minValue");

    if (clientName) filters.clientName = clientName;
    if (dateFrom) filters.dateFrom = dateFrom;
    if (dateTo) filters.dateTo = dateTo;
    if (minValue) filters.minValue = parseInt(minValue, 10);

    let filteredInquiries = [...mockInquiries];

    if (filters.clientName) {
      filteredInquiries = filteredInquiries.filter((inquiry) =>
        inquiry.clientName
          .toLowerCase()
          .includes(filters.clientName!.toLowerCase())
      );
    }

    if (filters.dateFrom) {
      filteredInquiries = filteredInquiries.filter(
        (inquiry) => inquiry.eventDate >= filters.dateFrom!
      );
    }

    if (filters.dateTo) {
      filteredInquiries = filteredInquiries.filter(
        (inquiry) => inquiry.eventDate <= filters.dateTo!
      );
    }

    if (filters.minValue !== undefined) {
      filteredInquiries = filteredInquiries.filter(
        (inquiry) => inquiry.potentialValue >= filters.minValue!
      );
    }

    return NextResponse.json({
      data: filteredInquiries,
      count: filteredInquiries.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}
