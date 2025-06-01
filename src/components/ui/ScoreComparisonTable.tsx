import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Tooltip,
    IconButton
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type ScoreComparisonTableProps = {
    AIRecommend: any;
    FinalScore: any;
    Product: any;
};

const highlightColor = '#d0f0c0'; // light green background for highest scores

export default function ScoreComparisonTable({ AIRecommend, FinalScore, Product }: ScoreComparisonTableProps) {
    console.log("recommend:", AIRecommend);
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
                            <TableCell>
                                {/* <Typography fontSize="0.95rem" fontWeight={600}>Product</Typography> */}
                                <strong>Product</strong>
                            </TableCell>
                            <TableCell align="center">
                                <strong>Final Score</strong>
                                {/* <Typography fontSize="0.95rem" fontWeight={600}>Final Score</Typography> */}
                            </TableCell>
                            {aspectTitles.map((aspect: string, i: number) => (
                                <TableCell key={i} align="center">
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                        <strong>{aspect}</strong>
                                        {AIRecommend[i]?.info && (
                                            <Tooltip
                                                title={
                                                    <Typography fontSize="0.9rem" fontWeight={400}>
                                                        {AIRecommend[i].info}
                                                    </Typography>
                                                }
                                                arrow
                                            >
                                                <IconButton size="small" sx={{ p: 0.1 }}>
                                                    <InfoOutlinedIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </Box>
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
