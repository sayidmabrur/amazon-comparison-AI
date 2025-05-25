'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSearchParams } from 'next/navigation';
import LoadingScreen from '@/components/layout/LoadingScreen';
import ProductTable from '@/components/layout/ProductTable'; // your new ProductTable component
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

export default function ComparisonClient() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [AIConclusion, setAIConclusion] = useState("");
    const [AIConclusionLarge, setAIConclusionLarge] = useState("");
    const [AIRecommendation, setAIRecommendation] = useState([]);
    const [AIRecommendationLarge, setAIRecommendationLarge] = useState([]);
    const [RecommendedIndex, setRecommendedIndex] = useState(0);

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
                    body: JSON.stringify({
                        links: parsedLinks,
                        dummy: false,
                        base_openai_model: "gpt-4.1-nano",
                        large_openai_model: "gpt-4.1"
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.data.comparison_table);
                    setAIConclusion(data.data.AI_conlusion || "");
                    setAIConclusionLarge(data.data.AI_conclusion_large || "");
                    setAIRecommendation(data.data.AI_recommendation || []);
                    setAIRecommendationLarge(data.data.AI_recommendation_large || []);
                    setRecommendedIndex(data.data.index_recommendation || 0);
                } else {
                    console.error('API error:', response.statusText);
                }
            } catch (err) {
                console.error('Failed to decode or fetch:', err);
            } finally {
                await sleep(1000);
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
            <main className="max-w-7xl mx-auto px-6 space-y-4">
                <ProductTable
                    products={products}
                    AIConclusion={AIConclusion}
                    AIConclusionLarge={AIConclusionLarge}
                    AIRecommendation={AIRecommendation}
                    AIRecommendationLarge={AIRecommendationLarge}
                    RecommendedIndex={RecommendedIndex}
                />
            </main>
            <Footer />
        </motion.div>
    );
}
