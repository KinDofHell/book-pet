import { model, models, Schema } from "mongoose";
import { ObjectType } from "@clerk/backend";
import { DateTime } from "asn1js";
import { DEFAULT_CATEGORY_ID } from "@/constants";

export interface IGlossaryItem extends Document {
  _id: string;
  title: string;
  description: string;
  history: string;
  additional?: string;
  imageUrl: string;
  categoryId: string;
  isVisible: boolean;
  tableInfo: { [key: string]: string }[];
  updatedAt?: Date;
}

const TableInfoSchema = new Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

const GlossaryItemSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    history: { type: String, required: true },
    additional: { type: String },
    imageUrl: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: DEFAULT_CATEGORY_ID,
    },
    isVisible: { type: Boolean, default: false },
    tableInfo: [TableInfoSchema],
  },
  { timestamps: true },
);

const GlossaryItem =
  models.GlossaryItem || model("GlossaryItem", GlossaryItemSchema);

export default GlossaryItem;
