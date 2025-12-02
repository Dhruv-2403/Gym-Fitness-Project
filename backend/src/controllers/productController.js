import prisma from "../prisma/client.js";

export async function getProducts(req, res) {
    try {
        const { category, search } = req.query;

        const where = {};
        if (category) {
            where.categoryId = parseInt(category);
        }
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { description: { contains: search } }
            ];
        }

        const products = await prisma.product.findMany({
            where,
            include: { category: true },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ products });
    } catch (err) {
        console.error("Get products error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
            include: { category: true }
        });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ product });
    } catch (err) {
        console.error("Get product error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function createProduct(req, res) {
    try {
        const { name, description, price, imageUrl, stock, categoryId } = req.body;

        if (!name || !price || !categoryId) {
            return res.status(400).json({ error: "Name, price, and categoryId are required" });
        }

        const category = await prisma.category.findUnique({
            where: { id: parseInt(categoryId) }
        });

        if (!category) {
            return res.status(404).json({ error: `Category with ID ${categoryId} not found. Please create a category first.` });
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                imageUrl,
                stock: parseInt(stock) || 0,
                categoryId: parseInt(categoryId)
            },
            include: { category: true }
        });

        res.status(201).json({ product });
    } catch (err) {
        console.error("Create product error:", err);


        if (err.code === 'P2002') {
            return res.status(409).json({ error: "Product with this name already exists" });
        }
        if (err.code === 'P2003') {
            return res.status(400).json({ error: "Invalid category ID" });
        }

        res.status(500).json({
            error: "Internal Server Error",
            message: err.message
        });
    }
}

export async function getCategories(req, res) {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' }
        });
        res.json({ categories });
    } catch (err) {
        console.error("Get categories error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

