import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // sort is an object that looks like => { field: 'userId', sort: 'asc' }
    const { page = 0, pageSize = 20, sort = null, search = "" } = req.query;

    // we want sort to look like this => { userId: 1 }

    function formatSortObject(sortString) {
      if (!sortString) return null;
      const parsedSort = JSON.parse(sortString);
      return { [parsedSort.field]: parsedSort.sort === "asc" ? 1 : -1 };
    }

    const transactions = await Transaction.find({
      $or: [
        { userId: { $regex: new RegExp(search, "i") } },
        { cost: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(formatSortObject(sort))
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
