'use client'

import { Brain } from 'lucide-react'
import { useState } from 'react'
import IconButton from '../ui/IconButton'
import AISummary from '../ui/AISummary'
import ProductComparisonTable from '../ui/ProductComparisonTable'
import { motion, AnimatePresence } from 'framer-motion';

type ProductTableProps = {
    products: any;  // Accept any structure,
    AIConclusion: string;
    AIConclusionLarge: string;
    AIRecommendation: any[];
    AIRecommendationLarge: any[];
    RecommendedIndex: number;
    recommendedIndexLarge: number;
    productLinks: any[];
    ASIN: any[];
    comparison_id: string;
}

interface RecommendedAttribute {
    title: string;
    image_path: string;
    rating: string;
}

export default function ProductTable({ products, AIConclusion, AIConclusionLarge, AIRecommendation, AIRecommendationLarge, RecommendedIndex, recommendedIndexLarge, productLinks, ASIN, comparison_id }: ProductTableProps) {
    const [showSummary, setShowSummary] = useState(false);
    const [useLarge, setUseLarge] = useState(false);  // New toggle state for large/small
    const [copied, setCopied] = useState(false);
    // const productLink = productLinks[RecommendedIndex];

    const handleRecommendedProductAttribute = (): RecommendedAttribute => {
        const productAspect = products.find((item: any) => item.aspect === 'Product');
        const ratingAspect = products.find((item: any) => item.aspect === 'Rating');

        if (!productAspect || !ratingAspect) {
            console.error("Missing expected aspects in products data");
            return {
                title: "Unknown",
                image_path: "",
                rating: "N/A",
            };
        }

        const product = productAspect.content[RecommendedIndex];
        const rating = ratingAspect.content[RecommendedIndex];
        return {
            title: product?.product_name ?? "Unknown",
            image_path: product?.img_url ?? "",
            rating: rating ?? "N/A"
        };
    };
    const handleCopy = () => {
        const url = `${window.location.origin}/comparison?comparison_id=${comparison_id}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleSummary = () => {
        setShowSummary(prev => !prev);
    };

    // New handler to toggle large/small summary
    const toggleUseLarge = () => {
        setUseLarge(prev => !prev);
    };

    // Choose conclusion & recommendation based on useLarge toggle
    const conclusionToShow = useLarge && AIConclusionLarge ? AIConclusionLarge : AIConclusion;
    const recommendationToShow = useLarge
        ? (AIRecommendationLarge.length > 0 ? AIRecommendationLarge : AIRecommendation)
        : AIRecommendation;
    const idxToShow = useLarge && RecommendedIndex ? recommendedIndexLarge : RecommendedIndex;
    return (
        <div className="p-6 w-full max-w-full overflow-hidden">
            {/* Controls */}
            <div className="flex justify-between items-center mb-6">
                {/* Left side: AI toggle */}
                <div>
                    <IconButton
                        icon={<Brain size={16} />}
                        text={showSummary ? "Back to Table" : "AI Recommendations"}
                        onClick={toggleSummary}
                    />
                </div>

                {/* Right side: Copy button */}
                <div>
                    <IconButton
                        icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16h8M8 12h8m-8-4h8m-2 12H6a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
                            </svg>
                        }
                        text={copied ? "Copied!" : "Copy Link"}
                        onClick={handleCopy}
                    />
                </div>
            </div>


            {/* Animated content switch */}
            <AnimatePresence mode="wait">
                {showSummary ? (
                    <motion.div
                        key="summary"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AISummary
                            AIConclusion={conclusionToShow}
                            AIRecommend={recommendationToShow}
                            ProductRecommend={handleRecommendedProductAttribute()}
                            Product={products}
                            productLink={productLinks[RecommendedIndex]}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="table"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ProductComparisonTable products={products} ASIN={ASIN} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
