import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductStatSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    yearlySalesTotal: {
      type: Number,
      required: true,
    },
    yearlyTotalSoldUnits: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
    },
    monthlyData: {
      type: [
        {
          month: {
            type: String,
            required: true,
          },
          totalSales: {
            type: Number,
            required: true,
          },
          totalUnits: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
    dailyData: {
      type: [
        {
          date: {
            type: String,
            required: true,
          },
          totalSales: {
            type: Number,
            required: true,
          },
          totalUnits: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProductStat", ProductStatSchema);
