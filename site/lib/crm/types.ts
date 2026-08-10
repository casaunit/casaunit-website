import { LeadPayload } from "@/types/lead";

export interface CRMResult {
  success: boolean;
  error?: string;
}

export interface CRMAdapter {
  name: string;
  sendLead(payload: LeadPayload): Promise<CRMResult>;
}
