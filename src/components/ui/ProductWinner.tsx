'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AlertCircle, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { displayImage } from '@/utils/helpers';


interface RecommendedProductAttribute {
  title: string,
  image_path: string
  rating: string
}
interface Props {
  AIRecommend: any;
  RecommendedProductAttribute: RecommendedProductAttribute;
}

export default function ProductWinner({ AIRecommend, RecommendedProductAttribute }: Props) {
  const [showAll, setShowAll] = useState(false);
  const MAX_VISIBLE_ITEMS = 3;
  const visibleItems = showAll ? AIRecommend : AIRecommend.slice(0, MAX_VISIBLE_ITEMS);

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[300px]">
          {/* <Image
            src={displayImage("")}
            alt="Product Image"
            width={300}
            height={300}
            className="rounded-lg border-gray-200"
          /> */}
          <img
            src={displayImage(RecommendedProductAttribute?.image_path)}
            alt={RecommendedProductAttribute?.title ?? "Product Image"}
            className="w-[300px] h-[300px]"
          />
        </div>

        <div className="flex-1 flex flex-col px-10">
          <h2 className="text-xl font-semibold">
            {RecommendedProductAttribute?.title ?? "Title Is not available"}
          </h2>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm">{RecommendedProductAttribute?.rating ?? "unavailable"}</span>
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            {/* <span className="text-sm text-zinc-500">(30,456 ratings)</span> */}
          </div>

          <div className="mt-6 rounded-md divide-y divide-gray-200 dark:divide-zinc-700 flex-grow">
            {visibleItems.map((item, index) => (
              <div
                className="p-4 flex flex-col md:flex-row md:items-start md:justify-between gap-2 border-gray-300"
                key={index}
              >
                <div className="font-bold text-sm min-w-[110px]">
                  {item.aspect}
                </div>
                <div className="text-sm">
                  {item.content}
                </div>
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
          {/* Buy button */}
          <button
            type="button"
            className="mt-6 bg-blue-500 text-white font-semibold rounded-md px-6 py-3 hover:bg-blue-700 transition-colors w-full md:w-auto ml-auto"
            onClick={() => alert('Buying product!')}
          >
            Buy this product now!
          </button>
        </div>
      </div>
    </div>
  );
}
