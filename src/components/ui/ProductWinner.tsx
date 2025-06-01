'use client';

import { useState } from 'react';
import {
  Star,
  ChevronDown,
  ChevronUp,
  StarHalf,
  StarOff,
} from 'lucide-react';
import { displayImage } from '@/utils/helpers';

interface Recommendation {
  aspect: string;
  content: string;
}

interface RatingBreakdown {
  one_star: { count: number };
  two_star: { count: number };
  three_star: { count: number };
  four_star: { count: number };
  five_star: { count: number };
}

interface Rating {
  rating_base: string;
  rating_breakdown: RatingBreakdown;
}

interface RecommendedProductAttribute {
  title: string;
  image_path: string;
  rating: Rating;
}

interface Props {
  AIRecommend: Recommendation[];
  RecommendedProductAttribute: RecommendedProductAttribute;
  productLink: string;
}

export default function ProductWinner({
  AIRecommend,
  RecommendedProductAttribute,
  productLink,
}: Props) {
  const [showAll, setShowAll] = useState(false);
  const MAX_VISIBLE_ITEMS = 3;
  const visibleItems = showAll
    ? AIRecommend
    : AIRecommend.slice(0, MAX_VISIBLE_ITEMS);

  const getAverageRating = (rating: Rating | undefined): number => {
    if (!rating?.rating_breakdown) return 0;

    const breakdown = rating.rating_breakdown;
    const counts = [
      { stars: 5, count: breakdown.five_star?.count ?? 0 },
      { stars: 4, count: breakdown.four_star?.count ?? 0 },
      { stars: 3, count: breakdown.three_star?.count ?? 0 },
      { stars: 2, count: breakdown.two_star?.count ?? 0 },
      { stars: 1, count: breakdown.one_star?.count ?? 0 },
    ];

    const totalCount = counts.reduce((sum, item) => sum + item.count, 0);
    if (totalCount === 0) return 0;

    const weightedSum = counts.reduce(
      (sum, item) => sum + item.count * item.stars,
      0
    );

    return weightedSum / totalCount;
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            size={16}
            className="text-yellow-500 fill-yellow-500"
          />
        ))}
        {hasHalfStar && (
          <StarHalf
            size={16}
            className="text-yellow-500 fill-yellow-500"
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOff key={`empty-${i}`} size={16} className="text-gray-300" />
        ))}
      </div>
    );
  };

  const averageRating = getAverageRating(RecommendedProductAttribute.rating);
  const totalReviews = Object.values(
    RecommendedProductAttribute.rating?.rating_breakdown || {}
  ).reduce((sum: number, group: any) => sum + (group.count ?? 0), 0);

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[300px]">
          <img
            src={displayImage(RecommendedProductAttribute?.image_path)}
            alt={
              RecommendedProductAttribute?.title ?? 'Product Image'
            }
            className="rounded-lg object-contain"
          />
        </div>

        <div className="flex-1 flex flex-col px-10">
          <h2 className="text-xl font-semibold">
            {RecommendedProductAttribute?.title ?? 'Title not available'}
          </h2>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm font-medium">
              {averageRating.toFixed(1)} / 5
            </span>
            {renderStars(averageRating)}
            {totalReviews > 0 && (
              <span className="text-sm text-gray-500">
                ({totalReviews} reviews)
              </span>
            )}
          </div>

          <div className="mt-6 rounded-md flex-grow">
            {visibleItems.map((item, index) => (
              <div
                className="p-4 flex flex-col md:flex-row md:items-start md:justify-between gap-2"
                key={index}
              >
                <div className="font-bold text-sm min-w-[110px]">
                  {item.aspect}
                </div>
                <div className="text-sm">{item.content}</div>
              </div>
            ))}
          </div>

          {AIRecommend.length > MAX_VISIBLE_ITEMS && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-4 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline self-start"
            >
              {showAll ? 'See less' : 'See more'}
              {showAll ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              )}
            </button>
          )}

          <button
            type="button"
            className="mt-6 bg-blue-500 text-white font-semibold rounded-md px-6 py-3 hover:bg-blue-700 transition-colors w-full md:w-auto ml-auto"
            onClick={() => window.open(productLink, '_blank')}
          >
            Buy this product now!
          </button>
        </div>
      </div>
    </div>
  );
}
