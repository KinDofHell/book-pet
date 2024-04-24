import { model, models, Schema, Types } from "mongoose";

export interface INote extends Document {
  _id: string;
  title: string;
  text: string;
  userId: Types.ObjectId; // Update the type here
  relatedGlossaryItemId?: string;
}

const NoteSchema = new Schema<INote>({
  title: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  relatedGlossaryItemId: {
    type: Schema.Types.ObjectId,
    ref: "GlossaryItem",
    index: true,
  },
});

export default models.Note || model<INote>("Note", NoteSchema);
