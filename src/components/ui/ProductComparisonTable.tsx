'use client'

import { JSX } from 'react';
import { Star } from 'lucide-react';
import { displayImage } from '@/utils/helpers';
import { Box, Typography, Paper, Rating } from '@mui/material';

type RawProductData = {
    aspect: string;
    content: any[];
    type: string;
}[];

type ProductComparisonTableProps = {
    products: RawProductData;
};

export default function ProductComparisonTable({ products }: ProductComparisonTableProps) {
    const transformedProducts = transformProductData(products);
    const aspectLabels = products.map(p => p.aspect);

    const Row = ({ label, render }: { label: string, render: (product: Record<string, any>) => JSX.Element }) => (
        <div className="grid grid-cols-[180px_1fr] gap-4 py-4 text-sm border-t border-gray-100 first:border-t-0">
            <div className="text-black font-semibold text-base">{label}</div>
            <div className="overflow-x-auto">
                <div className="flex space-x-8 min-w-max">
                    {transformedProducts.map((product, index) => (
                        <div key={index} className="w-64 flex-shrink-0">
                            {render(product)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="overflow-x-auto">
            <div className="p-6 min-w-max rounded-lg border border-gray-200 shadow-sm card">
                {/* Header row for Product Name and Image */}
                <Row
                    label="Product"
                    render={(product) => (
                        <div className="flex items-center gap-3">
                            <img src={displayImage(product["Product"].img_url)} alt={product["Product"].product_name} className="w-10 h-10 rounded-md object-cover" />
                            <div className="font-medium text-black truncate">{product["Product"].product_name}</div>
                        </div>
                    )}
                />

                {aspectLabels.filter(label => label !== "Product").map((aspect) => {
                    const type = products.find(p => p.aspect === aspect)?.type;
                    return (
                        <Row
                            key={aspect}
                            label={aspect}
                            render={(product) => {
                                const value = product[aspect];

                                if (type === 'rating') {
                                    return (
                                        <div className="flex items-center gap-1">
                                            <span className="text-black">{value}</span>
                                            <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                        </div>
                                    );
                                } else if (type === 'currency') {
                                    return (
                                        <span className="inline-block px-2 py-1 rounded-md bg-green-50 text-green-800 font-bold text-sm">
                                            {value}
                                        </span>
                                    );
                                }
                                else if (type === 'review') {
                                    return (
                                        <Box display="flex" flexDirection="column" gap={2}>
                                            {/* Positive Review */}
                                            <Box
                                                sx={{
                                                    border: '1px solid #E0E0E0',
                                                    borderRadius: 1,
                                                    p: 2,
                                                    backgroundColor: '#FCFCFC',
                                                    minHeight: 160,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                                    <Rating value={value.positive_rating} readOnly size="small" precision={0.5} />
                                                    <Typography variant="body2" fontWeight={500}>
                                                        {value.positive_rating} out of 5
                                                    </Typography>
                                                </Box>
                                                <Typography variant="subtitle2" fontWeight={600} color="text.primary" mb={0.5}>
                                                    Positive
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                                                    “{value.positive_review}”
                                                </Typography>
                                            </Box>

                                            {/* Negative Review */}
                                            <Box
                                                sx={{
                                                    border: '1px solid #E0E0E0',
                                                    borderRadius: 1,
                                                    p: 2,
                                                    backgroundColor: '#FCFCFC',
                                                    minHeight: 160,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                                    <Rating value={value.negative_rating} readOnly size="small" precision={0.5} />
                                                    <Typography variant="body2" fontWeight={500}>
                                                        {value.negative_rating} out of 5
                                                    </Typography>
                                                </Box>
                                                <Typography variant="subtitle2" fontWeight={600} color="text.primary" mb={0.5}>
                                                    Negative
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                                                    “{value.negative_review}”
                                                </Typography>
                                            </Box>
                                        </Box>
                                    );
                                }
                                else {
                                    return <span className="text-black">{value}</span>;
                                }
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

// You can define this at the bottom or in a shared utils file
function transformProductData(raw: RawProductData): any[] {
    const productCount = raw[0]?.content.length || 0;
    const transformed: any[] = Array.from({ length: productCount }, () => ({}));

    raw.forEach(({ aspect, content, type }) => {
        content.forEach((value, index) => {
            transformed[index][aspect] = value;
        });
        transformed.forEach((product) => {
            product.__types = product.__types || {};
            product.__types[aspect] = type;
        });
    });

    return transformed;
}
