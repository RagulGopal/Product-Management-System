import prisma from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (product.userId !== req.user.userId) {
      return res.status(403).json({ message: "Access denied." });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    if (!name || !description || price === undefined || stock === undefined) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({ message: "Price must be a positive number." });
    }

    if (typeof stock !== "number" || stock < 0 || !Number.isInteger(stock)) {
      return res.status(400).json({ message: "Stock must be a non-negative integer." });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        userId: req.user.userId,
      },
    });

    return res.status(201).json({ message: "Product created successfully.", product });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    const existing = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existing) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (existing.userId !== req.user.userId) {
      return res.status(403).json({ message: "Access denied." });
    }

    if (!name || !description || price === undefined || stock === undefined) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({ message: "Price must be a positive number." });
    }

    if (typeof stock !== "number" || stock < 0 || !Number.isInteger(stock)) {
      return res.status(400).json({ message: "Stock must be a non-negative integer." });
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: { name, description, price, stock },
    });

    return res.status(200).json({ message: "Product updated successfully.", product });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existing) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (existing.userId !== req.user.userId) {
      return res.status(403).json({ message: "Access denied." });
    }

    await prisma.product.delete({
      where: { id: parseInt(id, 10) },
    });

    return res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};
