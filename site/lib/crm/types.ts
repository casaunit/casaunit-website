import { LeadPayload } from "@/types/lead";
import { LandlordLeadPayload } from "@/types/landlordLead";

export interface CRMResult {
  success: boolean;
  error?: string;
}

export interface CRMAdapter {
  name: string;
  sendLead(payload: LeadPayload | LandlordLeadPayload): Promise<CRMResult>;
}
