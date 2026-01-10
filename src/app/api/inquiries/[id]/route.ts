import { NextRequest, NextResponse } from "next/server";
import { mockInquiries } from "@/data/mockInquiries";
import { InquiryPhase } from "@/types/inquiry";
import { delay } from "@/lib/delay";

let inquiries = [...mockInquiries];

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await delay(500);

  try {
    const { id } = params;
    const body = await request.json();

    const inquiryIndex = inquiries.findIndex((inq) => inq.id === id);

    if (inquiryIndex === -1) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    const existingInquiry = inquiries[inquiryIndex];

    if (body.phase !== undefined) {
      const validPhases: InquiryPhase[] = [
        "new",
        "sent_to_hotels",
        "offers_received",
        "completed",
      ];

      if (!validPhases.includes(body.phase)) {
        return NextResponse.json(
          {
            error: "Invalid phase",
            validPhases,
          },
          { status: 400 }
        );
      }
    }

    const {
      id: _id,
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      ...updatableFields
    } = body;

    const updatedInquiry = {
      ...existingInquiry,
      ...updatableFields,
      id: existingInquiry.id,
      createdAt: existingInquiry.createdAt,
      updatedAt: new Date().toISOString(),
    };

    inquiries[inquiryIndex] = updatedInquiry;

    return NextResponse.json({
      data: updatedInquiry,
      message: "Inquiry updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update inquiry" },
      { status: 500 }
    );
  }
}
