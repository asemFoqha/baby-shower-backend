import { Schema, model, InferSchemaType } from 'mongoose';

const RSVPSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  numberOfGuests: { type: Number, required: true },
  isComing: { type: Boolean, required: true },
});

export type RSVP = InferSchemaType<typeof RSVPSchema>;

const RSVPModule = model<RSVP>('RSVPs', RSVPSchema);

export default RSVPModule;
