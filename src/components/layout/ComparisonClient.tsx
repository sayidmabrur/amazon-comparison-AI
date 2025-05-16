'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSearchParams } from 'next/navigation';
import LoadingScreen from '@/components/layout/LoadingScreen';
import ProductTable from '@/components/layout/ProductTable';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

export default function ComparisonClient() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [AIConclusion, setAIConclusion] = useState("");
    const [AIRecommendation, setAIRecommendation] = useState([]);

    const searchParams = useSearchParams();

    useEffect(() => {
        const rawLinks = searchParams.get('links');

        if (!rawLinks) return;
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        const fetchData = async () => {
            try {
                const decoded = decodeURIComponent(rawLinks);
                const parsedLinks = JSON.parse(decoded);

                const response = await fetch('https://amazon-product-compare-1056582462205.asia-southeast1.run.app/compare', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ links: parsedLinks }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const products = data.data.comparison_table;
                    setProducts(products);
                    setAIConclusion(data.data.AI_conlusion);
                    setAIRecommendation(data.data.AI_recommendation);
                } else {
                    console.error('API error:', response.statusText);
                }
            } catch (err) {
                console.error('Failed to decode or fetch:', err);
            } finally {
                await sleep(2000); // 2-second delay before loading false
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams]);

    if (loading) {
        return <LoadingScreen text="Letting our smartest algorithms do the heavy lifting — your perfect pick is on the way!" />;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="min-h-screen transition-colors duration-300"
        >
            <Navbar />
            <main className="max-w-7xl mx-auto px-6">
                <ProductTable
                    products={products}
                    AIConclusion={AIConclusion}
                    AIRecommend={AIRecommendation}
                />
            </main>
            <Footer />
        </motion.div>
    );
}
