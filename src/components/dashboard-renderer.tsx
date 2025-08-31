'use client';

import React, { useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    BarChart3,
    Table,
    Target,
} from 'lucide-react';
import { DashboardLayoutItem, EnhancedDashboardConfig } from '@/types/dashboard-enhanced';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardRendererProps {
    config: EnhancedDashboardConfig;
}

// Widget Components for Display Mode (no editing features)
const ChartWidget: React.FC<{ item: DashboardLayoutItem }> = ({ item }) => (
    <Card className="h-full">
        <CardHeader className="pb-2">
            <CardTitle className="text-sm">Chart Widget</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">Chart Placeholder</span>
        </CardContent>
    </Card>
);

const TableWidget: React.FC<{ item: DashboardLayoutItem }> = ({ item }) => (
    <Card className="h-full">
        <CardHeader className="pb-2">
            <CardTitle className="text-sm">Table Widget</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
            <Table className="h-8 w-8 text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">Table Placeholder</span>
        </CardContent>
    </Card>
);

const MetricWidget: React.FC<{ item: DashboardLayoutItem }> = ({ item }) => (
    <Card className="h-full">
        <CardHeader className="pb-2">
            <CardTitle className="text-sm">Metric</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
            <Target className="h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold">42</div>
            <div className="text-sm text-muted-foreground">KPI Value</div>
        </CardContent>
    </Card>
);

export const DashboardRenderer: React.FC<DashboardRendererProps> = ({ config }) => {
    const [activeTabId, setActiveTabId] = React.useState(config.tabs[0]?.id || '');

    // Render widget based on type
    const renderWidget = React.useCallback((item: DashboardLayoutItem) => {
        switch (item.componentType) {
            case 'chart':
                return <ChartWidget item={item} />;
            case 'table':
                return <TableWidget item={item} />;
            case 'card':
                return <MetricWidget item={item} />;
            default:
                return <ChartWidget item={item} />;
        }
    }, []);

    if (!config || config.tabs.length === 0) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">No Dashboard Configuration</h3>
                    <p className="text-muted-foreground">Create a dashboard in the builder to see it here.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{config.name}</h1>
                    <p className="text-muted-foreground">
                        Last updated: {new Date(config.updatedAt).toLocaleDateString()}
                    </p>
                </div>
                {config.templateId && (
                    <Badge variant="outline">Template: {config.templateId}</Badge>
                )}
            </div>

            {/* Tabs */}
            {config.tabs.length > 1 ? (
                <Tabs value={activeTabId} onValueChange={setActiveTabId} className="w-full">
                    <TabsList className="grid w-fit grid-cols-auto">
                        {config.tabs.map((tab) => (
                            <TabsTrigger key={tab.id} value={tab.id}>
                                {tab.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* Tab Content */}
                    {config.tabs.map((tab) => (
                        <TabsContent key={tab.id} value={tab.id} className="mt-4">
                            <ResponsiveGridLayout
                                className="layout"
                                layouts={{ lg: tab.layout }}
                                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                                rowHeight={60}
                                isDraggable={false}
                                isResizable={false}
                                margin={[16, 16]}
                                containerPadding={[0, 0]}
                            >
                                {tab.layout.map((item) => (
                                    <div key={item.i}>
                                        {renderWidget(item)}
                                    </div>
                                ))}
                            </ResponsiveGridLayout>
                        </TabsContent>
                    ))}
                </Tabs>
            ) : (
                // Single tab - no tabs UI
                <div className="mt-4">
                    <ResponsiveGridLayout
                        className="layout"
                        layouts={{ lg: config.tabs[0].layout }}
                        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                        rowHeight={60}
                        isDraggable={false}
                        isResizable={false}
                        margin={[16, 16]}
                        containerPadding={[0, 0]}
                    >
                        {config.tabs[0].layout.map((item) => (
                            <div key={item.i}>
                                {renderWidget(item)}
                            </div>
                        ))}
                    </ResponsiveGridLayout>
                </div>
            )}
        </div>
    );
};

export default DashboardRenderer;