import { model, models, Schema } from "mongoose";

export interface INote extends Document {
  _id: string;
  title: string;
  text: string;
  relatedGlossaryItemId?: string;
}

const NoteSchema = new Schema({
  title: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  relatedGlossaryItem: { type: Schema.Types.ObjectId, ref: "GlossaryItem" },
});

const Note = models.Note || model("Note", NoteSchema);

export default Note;
