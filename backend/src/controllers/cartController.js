import prisma from "../prisma/client.js";

export async function getCart(req, res) {
    try {
        const userId = req.user?.user_id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const cartItems = await prisma.cartItem.findMany({
            where: { userId },
            include: { product: { include: { category: true } } }
        });

        const total = cartItems.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity);
        }, 0);

        res.json({ cartItems, total });
    } catch (err) {
        console.error("Get cart error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export async function addToCart(req, res) {
    try {
        const userId = req.user?.user_id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { productId, quantity = 1 } = req.body;

        if (!productId) {
            return res.status(400).json({ error: "Product ID is required" });
        }

        const product = await prisma.product.findUnique({
            where: { id: parseInt(productId) }
        });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const existingItem = await prisma.cartItem.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId: parseInt(productId)
                }
            }
        });

        let cartItem;
        if (existingItem) {
          
            cartItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + parseInt(quantity) },
                include: { product: { include: { category: true } } }
            });
        } else {
            cartItem = await prisma.cartItem.create({
                data: {
                    userId,
                    productId: parseInt(productId),
                    quantity: parseInt(quantity)
                },
                include: { product: { include: { category: true } } }
            });
        }

        res.status(201).json({ cartItem });
    } catch (err) {
        console.error("Add to cart error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function updateCartItem(req, res) {
    try {
        const userId = req.user?.user_id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ error: "Quantity must be at least 1" });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: { id: parseInt(id), userId }
        });

        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        const updated = await prisma.cartItem.update({
            where: { id: parseInt(id) },
            data: { quantity: parseInt(quantity) },
            include: { product: { include: { category: true } } }
        });

        res.json({ cartItem: updated });
    } catch (err) {
        console.error("Update cart error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function removeFromCart(req, res) {
    try {
        const userId = req.user?.user_id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.params;

        const cartItem = await prisma.cartItem.findFirst({
            where: { id: parseInt(id), userId }
        });

        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        await prisma.cartItem.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: "Item removed from cart" });
    } catch (err) {
        console.error("Remove from cart error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function clearCart(req, res) {
    try {
        const userId = req.user?.user_id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        await prisma.cartItem.deleteMany({
            where: { userId }
        });

        res.json({ message: "Cart cleared" });
    } catch (err) {
        console.error("Clear cart error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

