import prisma from "../../prisma/client.js";

// Create category
export async function createCategory(req, res) {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Category name is required" });
        }

        const category = await prisma.category.create({
            data: {
                name,
                description
            }
        });

        res.status(201).json({ category });
    } catch (err) {
        console.error("Create category error:", err);

        if (err.code === 'P2002') {
            return res.status(409).json({ error: "Category with this name already exists" });
        }

        res.status(500).json({
            error: "Internal Server Error",
            message: err.message
        });
    }
}

