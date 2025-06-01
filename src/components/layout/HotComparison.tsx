import { displayImage } from '@/utils/helpers';
import Image from 'next/image';

interface ComparisonProduct {
  // label: string;
  // labelColor: 'red' | 'blue' | 'yellow';
  title: string;
  imageUrl: string;
  ratingScore: number;
  ratingDesc: string;
  score: string;
  originalPrice: string;
  category: string;
  timeLeft: string;
}

interface HotComparisonProps {
  left: ComparisonProduct;
  right: ComparisonProduct;
}

const HotComparison: React.FC<HotComparisonProps> = ({ left, right }) => {
  const renderCard = (product: ComparisonProduct) => (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center w-full py-5">
      {/* Image */}
      <div className="relative w-32 h-32 mt-8">
        <Image src={displayImage(product.imageUrl)} alt={product.title} layout="fill" objectFit="contain" />
      </div>

      {/* Title */}
      <h4 className="mt-4 text-sm font-medium text-center px-2">{product.title}</h4>

      {/* Rating */}
      <div className="text-sm mt-2 text-yellow-500 font-semibold">
        ⭐ {product.ratingScore} <span className="text-gray-400">{product.ratingDesc}</span>
      </div>

      {/* Score Label */}
      <div className="mt-4 text-center">
        <span className="block text-sm font-medium text-gray-600">Score</span>
        <span className="block text-lg font-semibold text-blue-700">{product.score}</span>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {renderCard(left)}
      {renderCard(right)}
    </div>
  );
};

export default HotComparison;
