import { displayImage } from '@/utils/helpers';
interface AIRecommendationItem {
    aspect: string;
    content: string;
}

interface AISummaryProps {
    AIConclusion: string;
    AIRecommend: AIRecommendationItem[];
}

export default function AISummary({ AIConclusion, AIRecommend }: AISummaryProps) {
    const renderTextWithEmbeddedProduct = (text: string) => {
        const match = text.match(/(\{.*?\})/); // Find first JSON-like object
        if (match) {
            const jsonPart = match[1];
            const remainingText = text.replace(jsonPart, '').trim();

            try {
                const parsed = JSON.parse(jsonPart.replace(/'/g, '"'));

                return (
                    <div className="flex items-start gap-4">
                        {parsed.img_url && (
                            <img
                                src={displayImage(parsed.image_url)}
                                alt={parsed.product_name || 'Product Image'}
                                className="w-14 h-14 object-cover rounded-md border"
                            />
                        )}
                        <div>
                            <p className="font-semibold text-gray-900">{parsed.product_name}</p>
                            {remainingText && (
                                <p className="text-sm text-gray-600 mt-1">{remainingText}</p>
                            )}
                        </div>
                    </div>
                );
            } catch (error) {
                // If parsing fails, fallback to raw text
                return <p>{text}</p>;
            }
        }

        return <p>{text}</p>;
    };

    return (
        <div className="p-4 border card border-gray-200 rounded-lg text-sm text-gray-700">
            <h2 className="text-lg font-semibold mb-4">AI Summary</h2>

            <div className="mb-4">
                <p className="font-medium text-gray-800">Conclusion:</p>
                {renderTextWithEmbeddedProduct(AIConclusion)}
            </div>

            <div>
                <p className="font-medium text-gray-800 mb-2">Recommendations:</p>
                <div className="space-y-3">
                    {AIRecommend.map((item, index) => (
                        <div
                            key={index}
                            className="p-3 border border-gray-300 rounded-md bg-white shadow-sm"
                        >
                            <p className="text-sm font-semibold text-blue-700 mb-1">
                                {item.aspect}
                            </p>
                            {renderTextWithEmbeddedProduct(item.content)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
