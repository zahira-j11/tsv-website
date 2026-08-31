import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * One row per audit booked, fed by a HubSpot workflow webhook.
 *
 * We store the bookings rather than a running counter on purpose: a counter
 * drifts (a re-fired webhook double-counts, a cancellation never comes back),
 * whereas rows keyed by bookingId make both directions idempotent — booking
 * twice is a no-op, cancelling deletes the row and returns the spot.
 */
export interface IAuditBooking extends Document {
  /** HubSpot's identifier for the booking — the uniqueness key. */
  bookingId: string;
  /** Which month the slot belongs to, as YYYY-MM. */
  month: string;
  email?: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AuditBookingSchema = new Schema<IAuditBooking>(
  {
    bookingId: { type: String, required: true, unique: true, index: true },
    month:     { type: String, required: true, index: true },
    email:     { type: String, default: '' },
    name:      { type: String, default: '' },
  },
  { timestamps: true }
);

const AuditBooking: Model<IAuditBooking> =
  mongoose.models.AuditBooking ?? mongoose.model<IAuditBooking>('AuditBooking', AuditBookingSchema);

export default AuditBooking;
