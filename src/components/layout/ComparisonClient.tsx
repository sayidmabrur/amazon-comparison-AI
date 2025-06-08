'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSearchParams, usePathname } from 'next/navigation';
import LoadingScreen from '@/components/layout/LoadingScreen';
import ProductTable from '@/components/layout/ProductTable';
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
    const [RecommendedIndexLarge, setRecommendedIndexLarge] = useState(0);
    const [ProductLinks, setProductLinks] = useState([]);
    const [asin, setASIN] = useState([]);
    const [comparison_id, setComparisonId] = useState("");

    const searchParams = useSearchParams();
    const pathname = usePathname();

    useEffect(() => {
        const rawLinks = searchParams.get('links');
        const compId = searchParams.get('comparison_id');
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        const fetchData = async () => {
            try {
                let payload: any = {
                    dummy: false,
                    base_openai_model: "gpt-4.1-nano",
                };

                if (compId) {
                    payload.comparison_id = compId;
                } else if (rawLinks) {
                    const decoded = decodeURIComponent(rawLinks);
                    const parsedLinks = JSON.parse(decoded);
                    payload.links = parsedLinks;
                } else {
                    console.warn("No links or comparison_id provided in URL");
                    return;
                }

                const endpoint = pathname === '/comparison-old'
                    ? 'https://amazon-product-compare-1056582462205.asia-southeast1.run.app/compare'
                    : 'https://amazon-product-compare-1056582462205.asia-southeast1.run.app/compare/v2';

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.data.comparison_table);
                    setAIConclusion(data.data.AI_conlusion || "");
                    setAIConclusionLarge(data.data.AI_conclusion_large || "");
                    setAIRecommendation(data.data.AI_recommendation || []);
                    setAIRecommendationLarge(data.data.AI_recommendation_large || []);
                    setRecommendedIndex(data.data.index_recommendation || 0);
                    setRecommendedIndexLarge(data.data.index_recommendation_large || 0);
                    setProductLinks(data.data.links || []);
                    setASIN(data.data.ASIN || []);
                    setComparisonId(data.data.comparison_id || "");
                    console.log("COMPARISON_ID:", data.data.comparison_id);
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
    }, [searchParams, pathname]);

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
                    recommendedIndexLarge={RecommendedIndexLarge}
                    productLinks={ProductLinks}
                    ASIN={asin}
                    comparison_id={comparison_id}
                />
            </main>
            <Footer />
        </motion.div>
    );
}
