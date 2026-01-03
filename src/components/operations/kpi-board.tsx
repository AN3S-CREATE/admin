'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

export function KpiBoard() {
    return (
        <Card className="glass-card h-full min-h-[400px]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-6 w-6" />
                    Operational KPI Board
                </CardTitle>
                <CardDescription>
                    A real-time view of key operational performance indicators.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-full text-muted-foreground">
                <p>Operational KPI charts will be displayed here.</p>
            </CardContent>
        </Card>
    )
}
