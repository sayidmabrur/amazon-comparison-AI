'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/layout/LoadingScreen';
import ProductTable from '@/components/layout/ProductTable';
import Footer from '@/components/layout/Footer';
import SkeletonLoader from '../ui/SkeletonLoader';

export default function ComparisonClient() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [AIConclusion, setAIConclusion] = useState("");
    const [AIRecommendation, setAIRecommendation] = useState([]);

    const searchParams = useSearchParams();

    useEffect(() => {
        const rawLinks = searchParams.get('links');

        if (!rawLinks) return;

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
                setLoading(false);
            }
        };


        fetchData();
    }, [searchParams]);

    console.log(products)


    if (loading) {
        return <LoadingScreen text="Letting our smartest algorithms do the heavy lifting — your perfect pick is on the way!" />;
    }
    return (
        <div className="min-h-screen transition-colors duration-300">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6">
                {/* <h5 className="text-2xl font-semibold mb-6">Here is the comparison result of the products!</h5> */}

                <ProductTable
                    products={products}
                    AIConclusion={AIConclusion}
                    AIRecommend={AIRecommendation}

                />

            </main>
            <Footer />  {/* Include Footer here */}

        </div>
    );
}
