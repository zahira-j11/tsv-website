import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * One row per audit application, qualified or not.
 *
 * Applications used to go only to an email that needs RESEND_API_KEY, falling
 * back to console.log — which meant that until that key exists, every lead was
 * lost to the log retention window. The declined screen promises "we'll keep
 * your details", so they are kept here regardless of how notification is set up.
 */
export interface IAuditApplication extends Document {
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  website: string;
  platforms: string[];
  budget: string;
  teamSize: string;
  challenge: string;
  /** Whether the budget gate let them through to the calendar. */
  qualified: boolean;
  /** The month being sold when they applied, as YYYY-MM. */
  month: string;
  createdAt: Date;
  updatedAt: Date;
}

const AuditApplicationSchema = new Schema<IAuditApplication>(
  {
    name:      { type: String, required: true },
    email:     { type: String, required: true, index: true },
    company:   { type: String, default: '' },
    jobTitle:  { type: String, default: '' },
    website:   { type: String, default: '' },
    platforms: { type: [String], default: [] },
    budget:    { type: String, default: '' },
    teamSize:  { type: String, default: '' },
    challenge: { type: String, default: '' },
    qualified: { type: Boolean, required: true, index: true },
    month:     { type: String, required: true, index: true },
  },
  { timestamps: true }
);

const AuditApplication: Model<IAuditApplication> =
  mongoose.models.AuditApplication ??
  mongoose.model<IAuditApplication>('AuditApplication', AuditApplicationSchema);

export default AuditApplication;
