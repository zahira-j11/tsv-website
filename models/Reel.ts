import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReel extends Document {
  // 'hall-of-fame' = carousel card in Hall of Fame section
  // 'service' = one of 3 video thumbnails inside a service card
  type: 'hall-of-fame' | 'service';
  src: string;
  poster?: string;
  // Hall of Fame fields
  contentType?: string;     // 'Street Interview', 'Scripted Interaction', etc.
  distribution?: string;    // 'Organic' | 'Paid'
  clientName?: string;      // 'Habito', 'Plum', etc.
  clientLogoColor?: string; // hex colour for client logo circle
  viewCount?: string;       // '1M+', '1.5M+', '200K+'
  // Service fields
  serviceKey?: string;      // 'street-interviews' | 'ambassador' | 'trend-led' | 'scripted' | 'hi-fi-ads' | 'ugc'
  // Shared
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReelSchema = new Schema<IReel>(
  {
    type:            { type: String, enum: ['hall-of-fame', 'service'], default: 'hall-of-fame' },
    src:             { type: String, default: '' },
    poster:          { type: String, default: '' },
    contentType:     { type: String, default: '' },
    distribution:    { type: String, default: '' },
    clientName:      { type: String, default: '' },
    clientLogoColor: { type: String, default: '#7C01FF' },
    viewCount:       { type: String, default: '' },
    serviceKey:      { type: String, default: '' },
    order:           { type: Number, default: 0 },
    active:          { type: Boolean, default: true },
  },
  { timestamps: true }
);

ReelSchema.index({ type: 1, order: 1 });
ReelSchema.index({ serviceKey: 1, order: 1 });

const Reel: Model<IReel> = mongoose.models.Reel ?? mongoose.model<IReel>('Reel', ReelSchema);
export default Reel;
