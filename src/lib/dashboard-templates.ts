import { DashboardTemplate } from '@/types/dashboard-enhanced';

export const defaultTemplates: DashboardTemplate[] = [
    {
        id: 'single-column',
        name: 'Single Column Dashboard',
        description: 'Simple single column layout perfect for focused analytics',
        category: 'Basic',
        tabs: [
            {
                id: 'main',
                name: 'Main',
                layout: [
                    { i: 'widget-1', x: 0, y: 0, w: 12, h: 4, componentType: 'chart' },
                    { i: 'widget-2', x: 0, y: 4, w: 12, h: 4, componentType: 'table' },
                    { i: 'widget-3', x: 0, y: 8, w: 12, h: 3, componentType: 'card' },
                ]
            }
        ]
    },
    {
        id: 'executive-dashboard',
        name: 'Executive Dashboard',
        description: 'High-level overview with key metrics and charts',
        category: 'Business',
        tabs: [
            {
                id: 'overview',
                name: 'Overview',
                layout: [
                    { i: 'kpi-1', x: 0, y: 0, w: 3, h: 2, componentType: 'card' },
                    { i: 'kpi-2', x: 3, y: 0, w: 3, h: 2, componentType: 'card' },
                    { i: 'kpi-3', x: 6, y: 0, w: 3, h: 2, componentType: 'card' },
                    { i: 'kpi-4', x: 9, y: 0, w: 3, h: 2, componentType: 'card' },
                    { i: 'main-chart', x: 0, y: 2, w: 8, h: 5, componentType: 'chart' },
                    { i: 'side-chart', x: 8, y: 2, w: 4, h: 5, componentType: 'chart' },
                ]
            },
            {
                id: 'details',
                name: 'Details',
                layout: [
                    { i: 'detail-table', x: 0, y: 0, w: 12, h: 6, componentType: 'table' },
                ]
            }
        ]
    },
    {
        id: 'analytics-dashboard',
        name: 'Analytics Dashboard',
        description: 'Data-heavy dashboard with multiple visualization types',
        category: 'Analytics',
        tabs: [
            {
                id: 'metrics',
                name: 'Metrics',
                layout: [
                    { i: 'chart-1', x: 0, y: 0, w: 6, h: 4, componentType: 'chart' },
                    { i: 'chart-2', x: 6, y: 0, w: 6, h: 4, componentType: 'chart' },
                    { i: 'chart-3', x: 0, y: 4, w: 4, h: 4, componentType: 'chart' },
                    { i: 'chart-4', x: 4, y: 4, w: 4, h: 4, componentType: 'chart' },
                    { i: 'chart-5', x: 8, y: 4, w: 4, h: 4, componentType: 'chart' },
                ]
            },
            {
                id: 'data',
                name: 'Data',
                layout: [
                    { i: 'data-table', x: 0, y: 0, w: 12, h: 8, componentType: 'table' },
                ]
            }
        ]
    },
];