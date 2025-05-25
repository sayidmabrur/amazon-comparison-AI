import { displayImage } from '@/utils/helpers';
import ProductWinner from './ProductWinner';
import ScoreComparisonTable from './ScoreComparisonTable';

// interface AIRecommendationItem {
//     aspect: string;
//     content: string;
//     score: any;
// }

interface AISummaryProps {
    AIConclusion: any;
    AIRecommend: any;
    ProductRecommend: any;
    Product: any;
}

export default function AISummary({ AIConclusion, AIRecommend, ProductRecommend, Product }: AISummaryProps) {
    // CONSOLE.LO
    return (
        <div className="p-4 border card border-gray-200 rounded-lg text-sm text-gray-700">
            <h2 className="text-lg font-semibold mb-4">AI Summary</h2>

            <div className="mb-4">
                <p className="font-medium text-gray-800">Conclusion:</p>
                {AIConclusion?.content ?? "Not Cconclusion available"}
            </div>
            <div className="mb-6">
            <p className="font-medium text-gray-800 mb-2">Score Comparison:</p>
                <ScoreComparisonTable AIRecommend={AIRecommend} FinalScore={AIConclusion?.score} Product={Product}/>
            </div>
            <div className="mb-6">
                <p className="font-medium text-gray-800 mb-2">Best Option:</p>
                <div className="flex items-center gap-6 p-4 border-gray-200 m-10 rounded-lg border">
                    <ProductWinner
                        AIRecommend={AIRecommend}
                        RecommendedProductAttribute={ProductRecommend} />
                    {/* <img
                        src={displayImage("")}
                        alt="Winner Product"
                        className="w-24 h-24 object-cover rounded-lg border-2 border-green-500 shadow-md"
                    />
                    <div>
                        <p className="text-lg font-semibold text-green-800">{"Name of the Product"}</p>
                        {/* <div className="space-y-3">
                </div> */}
                    {/* <p className="text-sm text-gray-600">Top performing product based on AI benchmark analysis.</p> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}
