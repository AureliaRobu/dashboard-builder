export interface DashboardLayoutItem {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minW?: number;
    minH?: number;
    maxW?: number;
    maxH?: number;
    static?: boolean;
    componentType: 'chart' | 'table' | 'card' | 'custom';
    componentProps?: any;
}

export interface DashboardTab {
    id: string;
    name: string;
    layout: DashboardLayoutItem[];
}

export interface DashboardTemplate {
    id: string;
    name: string;
    description: string;
    category: string;
    thumbnail?: string;
    tabs: DashboardTab[];
}

export interface EnhancedDashboardConfig {
    id: string;
    name: string;
    templateId?: string;
    tabs: DashboardTab[];
    createdAt: string;
    updatedAt: string;
}
