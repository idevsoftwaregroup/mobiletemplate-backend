import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../Services/products.services.js";

export const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProducts();

    const result = products.map((product) => ({
      ...product,

      imageUrl: product.imageUrl
        ? `http://localhost:3000${product.imageUrl}`
        : null,
    }));

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};

export const createProductController = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const product = await createProduct({
      ...req.body,

      imageUrl: req.file ? `/uploads/products/${req.file.filename}` : null,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, {
      ...req.body,
      imageUrl: req.file
        ? `/uploads/products/${req.file.filename}`
        : req.body.imageUrl,
    });

    res.status(200).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await deleteProduct(req.params.id);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};
