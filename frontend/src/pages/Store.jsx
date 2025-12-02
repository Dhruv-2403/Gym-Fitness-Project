import React from 'react';
import ProductCard from '../components/ProductCard.jsx';
import shoeImg from '../assets/shoe.png';
import dumbbellImg from '../assets/dumbbell.png';

const products = [
    {
        id: 1,
        name: 'Neon Pulse Running Shoes',
        price: '$149',
        rating: 4.8,
        image: shoeImg,
    },
    {
        id: 2,
        name: 'Quantum Grip Dumbbell',
        price: '$79',
        rating: 4.6,
        image: dumbbellImg,
    },
    // Add more products as needed
];

const Store = () => {
    return (
        <section className="min-h-screen bg-slate-950 text-white py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-5xl font-bold text-center mb-12 neon-text-purple">FitFusion Store</h1>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Store;
