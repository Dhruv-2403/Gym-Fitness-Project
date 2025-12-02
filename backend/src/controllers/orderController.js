import prisma from "../../prisma/client.js";

export async function createOrder(req, res) {
    try {
        const userId = req.user?.user_id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { shippingAddress } = req.body;

        if (!shippingAddress) {
            return res.status(400).json({ error: "Shipping address is required" });
        }

        const cartItems = await prisma.cartItem.findMany({
            where: { userId },
            include: { product: true }
        });

        if (cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        const totalAmount = cartItems.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity);
        }, 0);

        const order = await prisma.order.create({
            data: {
                userId,
                totalAmount,
                shippingAddress,
                status: "pending",
                items: {
                    create: cartItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price
                    }))
                }
            },
            include: {
                items: {
                    include: { product: { include: { category: true } } }
                }
            }
        });

        await prisma.cartItem.deleteMany({
            where: { userId }
        });

        res.status(201).json({ order });
    } catch (err) {
        console.error("Create order error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getOrders(req, res) {
    try {
        const userId = req.user?.user_id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const orders = await prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: { product: { include: { category: true } } }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ orders });
    } catch (err) {
        console.error("Get orders error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getOrder(req, res) {
    try {
        const userId = req.user?.user_id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.params;

        const order = await prisma.order.findFirst({
            where: { id: parseInt(id), userId },
            include: {
                items: {
                    include: { product: { include: { category: true } } }
                }
            }
        });

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json({ order });
    } catch (err) {
        console.error("Get order error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function updateOrderStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const order = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { status },
            include: {
                items: {
                    include: { product: { include: { category: true } } }
                }
            }
        });

        res.json({ order });
    } catch (err) {
        console.error("Update order status error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

