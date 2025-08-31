
import { EnhancedDashboardConfig } from '@/types/dashboard-enhanced';

const STORAGE_KEY = 'dashboard_configs';
const ACTIVE_DASHBOARD_KEY = 'active_dashboard';

export interface DashboardStorage {
    configs: Record<string, EnhancedDashboardConfig>;
    activeDashboardId?: string;
}

// Get all saved dashboard configurations
export function getSavedDashboards(): DashboardStorage {
    if (typeof window === 'undefined') {
        return { configs: {} };
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        return { configs: {} };
    }

    try {
        return JSON.parse(stored);
    } catch {
        return { configs: {} };
    }
}

// Save a dashboard configuration
export function saveDashboardConfig(config: EnhancedDashboardConfig): void {
    if (typeof window === 'undefined') return;

    const storage = getSavedDashboards();
    storage.configs[config.id] = config;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
}

// Set the active dashboard
export function setActiveDashboard(dashboardId: string): void {
    if (typeof window === 'undefined') return;

    const storage = getSavedDashboards();
    storage.activeDashboardId = dashboardId;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
}

// Get the active dashboard configuration
export function getActiveDashboard(): EnhancedDashboardConfig | null {
    const storage = getSavedDashboards();

    if (!storage.activeDashboardId || !storage.configs[storage.activeDashboardId]) {
        return null;
    }

    return storage.configs[storage.activeDashboardId];
}

// Get a specific dashboard by ID
export function getDashboardById(id: string): EnhancedDashboardConfig | null {
    const storage = getSavedDashboards();
    return storage.configs[id] || null;
}