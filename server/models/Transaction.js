import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    userId: String,
    cost: String,
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
