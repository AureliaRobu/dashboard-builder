'use client';

import { useEffect, useState } from 'react';
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { DashboardRenderer } from "@/components/dashboard-renderer";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import Link from "next/link";
import { EnhancedDashboardConfig } from "@/types/dashboard-enhanced";
import { getActiveDashboard } from "@/lib/dashboard-storage";

import data from "./data.json";

export default function DashboardPage() {
    const [dashboardConfig, setDashboardConfig] = useState<EnhancedDashboardConfig | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load the active dashboard configuration
        const loadDashboard = () => {
            const activeDashboard = getActiveDashboard();
            setDashboardConfig(activeDashboard);
            setIsLoading(false);
        };

        loadDashboard();
    }, []);

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

                            {/* Dashboard Action Bar */}
                            <div className="flex items-center justify-between px-4 lg:px-6">
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        {dashboardConfig ? 'Custom Dashboard' : 'Default Dashboard'}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        {dashboardConfig
                                            ? 'Showing your custom dashboard configuration'
                                            : 'Create a custom dashboard or view the default layout'}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href="/dashboard/builder">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create Dashboard
                                        </Link>
                                    </Button>
                                    {dashboardConfig && (
                                        <Button asChild variant="outline" size="sm">
                                            <Link href="/dashboard/builder">
                                                <Settings className="w-4 h-4 mr-2" />
                                                Edit Dashboard
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Dashboard Content */}
                            {isLoading ? (
                                <div className="flex items-center justify-center h-96">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                                        <p className="text-muted-foreground">Loading dashboard...</p>
                                    </div>
                                </div>
                            ) : dashboardConfig ? (
                                <div className="px-4 lg:px-6">
                                    <DashboardRenderer config={dashboardConfig} />
                                </div>
                            ) : (
                                // Default dashboard content when no custom dashboard is saved
                                <>
                                    <SectionCards />
                                    <div className="px-4 lg:px-6">
                                        <ChartAreaInteractive />
                                    </div>
                                    <DataTable data={data} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}