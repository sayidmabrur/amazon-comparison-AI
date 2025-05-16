import { displayImage } from "@/utils/helpers";

type Product = {
    id: number;
    image: string;
    title: string;
    price: string;
    rating: number;
    ratingCount: number;
    description: string;
};

export default function LessonBookCard({ product }: { product: Product }) {
    return (
        <div className="w-[320px] bg-white rounded-3xl mb-10 shadow-md p-6 flex flex-col relative border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            {/* Product image */}
            <div className="w-full h-24 rounded-xl bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
                <img
                    src={displayImage(product.image)}
                    alt={product.title}
                    className="object-contain max-h-full"
                />
            </div>

            {/* Product title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                {product.title}
            </h3>

            {/* Price and Rating */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold custom-landing-page-price-text">{product.price}</span>
                <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.176c.969 0 1.371 1.24.588 1.81l-3.377 2.455a1 1 0 00-.364 1.118l1.286 3.967c.3.922-.755 1.688-1.54 1.118l-3.377-2.455a1 1 0 00-1.175 0l-3.377 2.455c-.784.57-1.838-.196-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.176a1 1 0 00.95-.69l1.286-3.967z" />
                        </svg>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({product.ratingCount})</span>
                </div>
            </div>

            {/* Badge */}
            <span className="inline bg-orange-100 text-orange-700 font-semibold px-3 py-1 rounded-full text-xs mb-3">
                AI Powered Recommendation
            </span>

            {/* Description */}
            <p className="text-gray-700 text-sm mb-6 leading-snug line-clamp-2">
                {product.description}
            </p>

            {/* Actions */}
            <div className="flex justify-between items-center">
                <button className="submit-button hover:bg-orange-700 text-white rounded-lg px-4 py-2 font-semibold transition">
                    Add to Compare
                </button>
                <button className="hover:underline font-semibold text-sm">
                    View Details
                </button>
            </div>
        </div>
    );
}
