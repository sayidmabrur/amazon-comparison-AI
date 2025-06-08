import React from 'react';
import ComparisonClient from '@/components/layout/ComparisonClient';
import { Suspense } from "react"

export default function ComparisonOldPage() {
    return <Suspense><ComparisonClient /></Suspense>;
}
