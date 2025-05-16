'use client'

import { Brain, Copy } from 'lucide-react'
import { useState } from 'react'
import IconButton from '../ui/IconButton'
import AISummary from '../ui/AISummary'
import ProductComparisonTable from '../ui/ProductComparisonTable'

type ProductTableProps = {
    products: any;  // Accept any structure,
    AIConclusion: any;
    AIRecommend: any;
}

export default function ProductTable({ products, AIConclusion, AIRecommend }: ProductTableProps) {
    const [copied, setCopied] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    // console.log("mapped products:", products)

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClick = () => {
        setShowSummary(prev => !prev);
    };

    console.log("products:", products)

    return (
        <div className="p-6 w-full max-w-full overflow-hidden">
            {/* Controls */}
            <div className="flex justify-between mb-6 text">
                {/* <IconButton
                    icon={<Brain size={16} />}
                    text={showSummary ? "Back to Table" : "AI Recommendations"}
                    onClick={handleClick}
                /> */}

                {/* <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm textbox"
                >
                    <Copy size={16} />
                    {copied ? 'Copied!' : 'Copy Link'}
                </button> */}
            </div>

            {/* Conditional rendering */}
            {/* <ProductComparisonTable products={products} /> */}
            {showSummary
                ? <AISummary AIConclusion={AIConclusion} AIRecommend={AIRecommend} />
                : <ProductComparisonTable products={products} />
            }
        </div>
    );
}
