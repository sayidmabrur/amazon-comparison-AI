import { Sparkle } from 'lucide-react'; // import the icon
import ProductWinner from './ProductWinner';
import ScoreComparisonTable from './ScoreComparisonTable';

interface AISummaryProps {
    AIConclusion: any;
    AIRecommend: any;
    ProductRecommend: any;
    Product: any;
    productLink: string;
}

export default function AISummary({ AIConclusion, AIRecommend, ProductRecommend, Product, productLink }: AISummaryProps) {
    console.log("link to buy:", productLink);

    return (
        <div className="p-4 border card border-gray-200 rounded-lg text-sm text-gray-700">
            <h2 className="text-lg font-semibold mb-4">AI Summary</h2>

            <div className="mb-4">
                {AIConclusion?.content ?? "Not Conclusion available"}
            </div>

            <div className="mb-6">
                {/* <p className="font-medium text-gray-800 mb-2">Score Comparison:</p> */}
                <ScoreComparisonTable AIRecommend={AIRecommend} FinalScore={AIConclusion?.score} Product={Product} />
                <div className="justify-end flex mt-4 items-center gap-2 mb-6 text-sm font-semibold bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
                    <Sparkle size={15} className="text-blue-300 fill-blue-300" />
                    <span>based on Our AI Reasoning</span>
                </div>
            </div>

            {/* Subtitle with icon below Score Comparison */}

            <div className="mb-6">
                <p className="font-medium text-gray-800 mb-2">Best Option:</p>
                <div className="flex items-center gap-6 p-4 border-gray-200 m-10 rounded-lg border">
                    <ProductWinner
                        AIRecommend={AIRecommend}
                        productLink={productLink}
                        RecommendedProductAttribute={ProductRecommend}
                    />
                </div>
            </div>
        </div>
    );
}
