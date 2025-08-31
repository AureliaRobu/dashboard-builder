'use client';

import { EnhancedDashboardBuilder } from '@/components/enhanced-dashboard-builder';
import { EnhancedDashboardConfig } from '@/types/dashboard-enhanced';

export default function DashboardBuilderPage() {
    const handleSave = (config: EnhancedDashboardConfig) => {
        // Save to localStorage for demo
        localStorage.setItem('dashboard-config', JSON.stringify(config));
        console.log('Dashboard saved:', config);

        // In production, save to your backend:
        // await fetch('/api/dashboards', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(config)
        // });
    };

    const handleExport = (config: EnhancedDashboardConfig) => {
        // Export as JSON
        const dataStr = JSON.stringify(config, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

        const exportFileDefaultName = `${config.name.replace(/\s+/g, '-').toLowerCase()}-dashboard.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    return (
        <div className="h-screen">
            <EnhancedDashboardBuilder
                onSave={handleSave}
                onExport={handleExport}
            />
        </div>
    );
}