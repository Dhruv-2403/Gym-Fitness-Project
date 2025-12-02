import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
    const { name, price, rating, image } = product;
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-panel p-6 rounded-xl border border-white/10 flex flex-col items-center text-center"
        >
            <img src={image} alt={name} className="w-32 h-32 object-contain mb-4 drop-shadow-[0_0_20px_rgba(0,227,255,0.3)]" />
            <h3 className="text-xl font-semibold neon-text-blue mb-2">{name}</h3>
            <p className="text-neon-purple mb-2">{price}</p>
            <div className="flex items-center justify-center space-x-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-current' : 'stroke-current'} `}
                    />
                ))}
                <span className="ml-2 text-sm text-gray-300">{rating.toFixed(1)}</span>
            </div>
        </motion.div>
    );
};

export default ProductCard;
