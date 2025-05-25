import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box
} from '@mui/material';

type ScoreComparisonTableProps = {
    AIRecommend: any;
    FinalScore: any;
    Product: any;
};

const highlightColor = '#d0f0c0'; // light green background for highest scores

export default function ScoreComparisonTable({ AIRecommend, FinalScore, Product }: ScoreComparisonTableProps) {
    if (!AIRecommend || !Array.isArray(AIRecommend)) return null;

    const aspectTitles = AIRecommend.map((row: any) => row.aspect);
    const productCount = AIRecommend[0]?.score?.length || 0;

    // 1. Find max score for FinalScore column
    const maxFinalScore = Math.max(...FinalScore);

    // 2. Find max scores per aspect column
    const maxAspectScores = AIRecommend.map(row => Math.max(...row.score));

    return (
        <Box sx={{ overflowX: 'auto' }}>
            <TableContainer component={Paper} sx={{ minWidth: 900 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Product</strong></TableCell>
                            <TableCell align="center"><strong>Final Score</strong></TableCell>
                            {aspectTitles.map((aspect: string, i: number) => (
                                <TableCell key={i} align="center">
                                    <strong>{aspect}</strong>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from({ length: productCount }, (_, productIndex) => (
                            <TableRow key={productIndex} hover>
                                <TableCell>
                                    <Box
                                        component="img"
                                        src={Product[0].content[productIndex].img_url}
                                        alt={`Product ${productIndex + 1}`}
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            objectFit: 'cover',
                                            borderRadius: 1,
                                            border: '1px solid #ccc',
                                        }}
                                    />
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        backgroundColor:
                                            FinalScore?.[productIndex] === maxFinalScore
                                                ? highlightColor
                                                : undefined,
                                    }}
                                >
                                    <Typography fontWeight={600}>
                                        {FinalScore?.[productIndex] ?? "-"}
                                    </Typography>
                                </TableCell>
                                {AIRecommend.map((row: any, i: number) => {
                                    const score = row.score[productIndex];
                                    return (
                                        <TableCell
                                            key={i}
                                            align="center"
                                            sx={{
                                                backgroundColor:
                                                    score === maxAspectScores[i] ? highlightColor : undefined,
                                            }}
                                        >
                                            <Typography fontWeight={500}>
                                                {score}
                                            </Typography>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
