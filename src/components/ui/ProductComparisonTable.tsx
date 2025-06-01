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
    ASIN: any[];  // or a more specific type if you know it

};

export default function ProductComparisonTable({ products, ASIN }: ProductComparisonTableProps) {
    const transformedProducts = transformProductData(products);
    const aspectLabels = products.map(p => p.aspect);
    const starLabels = {
        five_star: '5 ★',
        four_star: '4 ★',
        three_star: '3 ★',
        two_star: '2 ★',
        one_star: '1 ★',
    };

    const Row = ({
        label,
        render,
    }: {
        label: string;
        render: (product: Record<string, any>, index: number) => JSX.Element;
    }) => (
        <div className="grid grid-cols-[180px_1fr] gap-4 py-4 text-sm border-t border-gray-100 first:border-t-0">
            <div className="text-black font-semibold text-base">{label}</div>
            <div className="overflow-x-auto">
                <div className="flex space-x-8 min-w-max">
                    {transformedProducts.map((product, index) => (
                        <div key={index} className="w-64 flex-shrink-0">
                            {render(product, index)}
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
                            {/* <img src={displayImage(product["Product"].img_url)} alt={product["Product"].product_name} className="w-10 h-10 rounded-md object-cover" /> */}
                            <div className="font-medium text-black">{product["Product"].product_name}</div>
                        </div>
                    )}
                />
                <Row
                    label=""
                    render={(product) => (
                        <div className="flex items-center gap-3">
                            <img src={displayImage(product["Product"].img_url)} alt={product["Product"].product_name} className="w-50 h-70 rounded-lg object-contain" />
                            {/* <div className="font-medium text-black truncate">{product["Product"].product_name}</div> */}
                        </div>
                    )}
                />

                <Row
                    label="ASIN"
                    render={(_, index) => (
                        <span className="text-gray-800 font-mono text-sm"><strong>{ASIN[index]}</strong></span>
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
                                    const { rating_base, rating_breakdown } = value;

                                    const starColors = {
                                        five_star: '#FFD700',
                                        four_star: '#C0C0C0',
                                        three_star: '#CD7F32',
                                        two_star: '#FFA07A',
                                        one_star: '#FF6347',
                                    };

                                    return (
                                        <Box
                                            sx={{
                                                padding: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 1.5,
                                                width: '100%',
                                                minWidth: 200,
                                            }}
                                        >
                                            {/* Overall Rating */}
                                            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" gap={0.5}>
                                                <Rating value={rating_base} precision={0.1} readOnly size="medium" />
                                                <Typography variant="body1" fontWeight={600}>
                                                    {rating_base} / 5
                                                </Typography>
                                            </Box>

                                            <Box height={1} bgcolor="#E0E0E0" my={1} />

                                            {/* Breakdown */}
                                            <Box display="flex" flexDirection="column" gap={0.75}>
                                                {['five_star', 'four_star', 'three_star', 'two_star', 'one_star'].map((star) => {
                                                    const data = rating_breakdown[star];
                                                    if (!data) return null;

                                                    return (
                                                        <Box key={star} display="flex" alignItems="center" gap={1}>
                                                            <Typography variant="caption" sx={{ width: 50 }}>
                                                                {starLabels[star as keyof typeof starLabels]}
                                                            </Typography>
                                                            <Box sx={{ flex: 1, height: 8, backgroundColor: '#eee', borderRadius: 4 }}>
                                                                <Box
                                                                    sx={{
                                                                        height: '100%',
                                                                        width: `${data.percentage}%`,
                                                                        backgroundColor: starColors[star as keyof typeof starColors],
                                                                        borderRadius: 4,
                                                                    }}
                                                                />
                                                            </Box>
                                                            <Typography variant="caption" sx={{ minWidth: 55 }} textAlign="right">
                                                                {data.count} ({data.percentage}%)
                                                            </Typography>
                                                        </Box>
                                                    );
                                                })}

                                            </Box>
                                        </Box>
                                    );
                                }

                                else if (type === 'currency') {
                                    return (
                                        <span className="inline-block px-2 py-1 rounded-md bg-green-50 text-green-800 font-bold text-sm">
                                            {value}
                                        </span>
                                    );
                                }
                                else if (type === 'review') {
                                    if (aspect === 'Youtube Review') {
                                        return (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    borderRadius: 3,
                                                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                                                    overflow: 'hidden',
                                                    backgroundColor: '#fff',
                                                    border: '1px solid #e0e0e0',
                                                    transition: 'box-shadow 0.3s',
                                                    '&:hover': {
                                                        boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.1)',
                                                    },
                                                }}
                                            >
                                                {/* Thumbnail with badge */}
                                                <Box sx={{ position: 'relative' }}>
                                                    <img
                                                        src={value.thumbnail_url}
                                                        alt="YouTube Thumbnail"
                                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: 8,
                                                            left: 8,
                                                            backgroundColor: '#FF0000',
                                                            color: '#fff',
                                                            fontSize: '12px',
                                                            fontWeight: 'bold',
                                                            px: 1.5,
                                                            py: 0.5,
                                                            borderRadius: '12px',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: 0.5,
                                                        }}
                                                    >
                                                        <a
                                                            href={value.link}
                                                            target="_blank"
                                                        >
                                                            Click to Watch!
                                                        </a>
                                                    </Box>
                                                </Box>

                                                {/* Review body */}
                                                <Box sx={{ px: 3, py: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                    {/* Positive */}
                                                    <Box>
                                                        <Typography variant="subtitle2" fontWeight={700} color="#0F9D58" gutterBottom>
                                                            Positive Highlights
                                                        </Typography>
                                                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                                            <Rating value={value.positive_rating} readOnly size="small" precision={0.5} />
                                                            <Typography variant="body2" fontWeight={500}>
                                                                {value.positive_rating} / 5
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="body2" color="text.secondary">
                                                            “{value.positive_review}”
                                                        </Typography>
                                                    </Box>

                                                    {/* Divider */}
                                                    <Box sx={{ height: 1, backgroundColor: '#eee', my: 1 }} />

                                                    {/* Negative */}
                                                    <Box>
                                                        <Typography variant="subtitle2" fontWeight={700} color="#DB4437" gutterBottom>
                                                            Negative Notes
                                                        </Typography>
                                                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                                            <Rating value={value.negative_rating} readOnly size="small" precision={0.5} />
                                                            <Typography variant="body2" fontWeight={500}>
                                                                {value.negative_rating} / 5
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="body2" color="text.secondary">
                                                            “{value.negative_review}”
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        );
                                    }

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
                                                <Typography variant="body2" color="text.secondary">
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
                                                <Typography variant="body2" color="text.secondary">
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
