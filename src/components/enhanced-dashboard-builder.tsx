'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import {
    SidebarProvider,
    SidebarInset,
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
} from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Plus,
    Settings,
    LayoutTemplate,
    BarChart3,
    Table,
    Target,
    X,
    Eye,
    EyeOff,
    Save
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { DashboardLayoutItem, DashboardTab, EnhancedDashboardConfig, DashboardTemplate } from '@/types/dashboard-enhanced';
import { defaultTemplates } from '@/lib/dashboard-templates';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface EnhancedDashboardBuilderProps {
    initialConfig?: EnhancedDashboardConfig;
    onSave?: (config: EnhancedDashboardConfig) => void;
    onExport?: (config: EnhancedDashboardConfig) => void;
}

// Widget Components
const ChartWidget: React.FC<{ item: DashboardLayoutItem; onRemove?: () => void; editable: boolean }> = ({
                                                                                                            item, onRemove, editable
                                                                                                        }) => (
    <Card className="h-full">
        {editable && onRemove && (
            <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 z-10 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={onRemove}
            >
                <X className="h-4 w-4" />
            </Button>
        )}
        <CardHeader className="pb-2">
            <CardTitle className="text-sm">Chart Widget</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">Chart Placeholder</span>
        </CardContent>
    </Card>
);

const TableWidget: React.FC<{ item: DashboardLayoutItem; onRemove?: () => void; editable: boolean }> = ({
                                                                                                            item, onRemove, editable
                                                                                                        }) => (
    <Card className="h-full">
        {editable && onRemove && (
            <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 z-10 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={onRemove}
            >
                <X className="h-4 w-4" />
            </Button>
        )}
        <CardHeader className="pb-2">
            <CardTitle className="text-sm">Table Widget</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
            <Table className="h-8 w-8 text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">Table Placeholder</span>
        </CardContent>
    </Card>
);

const MetricWidget: React.FC<{ item: DashboardLayoutItem; onRemove?: () => void; editable: boolean }> = ({
                                                                                                             item, onRemove, editable
                                                                                                         }) => (
    <Card className="h-full">
        {editable && onRemove && (
            <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 z-10 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={onRemove}
            >
                <X className="h-4 w-4" />
            </Button>
        )}
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

// Template Selection Dialog
const TemplateSelector: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (template: DashboardTemplate) => void;
}> = ({ open, onOpenChange, onSelect }) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Choose Dashboard Template</DialogTitle>
                <DialogDescription>
                    Select a pre-designed template to get started quickly
                </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {defaultTemplates.map((template) => (
                    <Card
                        key={template.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => {
                            onSelect(template);
                            onOpenChange(false);
                        }}
                    >
                        <CardHeader>
                            <CardTitle className="text-base">{template.name}</CardTitle>
                            <Badge variant="outline">{template.category}</Badge>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                            <div className="text-xs text-muted-foreground">
                                {template.tabs.length} tab{template.tabs.length > 1 ? 's' : ''}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </DialogContent>
    </Dialog>
);

// Widget Library Sidebar
const WidgetLibrarySidebar: React.FC<{
    onAddWidget: (type: DashboardLayoutItem['componentType']) => void;
}> = ({ onAddWidget }) => (
    <Sidebar side="right" className="w-80">
        <SidebarHeader>
            <h3 className="text-lg font-semibold px-4">Widget Library</h3>
        </SidebarHeader>

        <SidebarContent>
            <SidebarMenu>
                <div className="px-4 space-y-2">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Charts</div>
                    <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => onAddWidget('chart')}
                    >
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Chart Widget
                    </Button>

                    <div className="text-sm font-medium text-muted-foreground mb-2 mt-4">Data</div>
                    <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => onAddWidget('table')}
                    >
                        <Table className="mr-2 h-4 w-4" />
                        Table Widget
                    </Button>

                    <div className="text-sm font-medium text-muted-foreground mb-2 mt-4">Metrics</div>
                    <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => onAddWidget('card')}
                    >
                        <Target className="mr-2 h-4 w-4" />
                        Metric Card
                    </Button>
                </div>
            </SidebarMenu>
        </SidebarContent>
    </Sidebar>
);

// Main Dashboard Builder Component
export const EnhancedDashboardBuilder: React.FC<EnhancedDashboardBuilderProps> = ({
                                                                                      initialConfig,
                                                                                      onSave,
                                                                                      onExport
                                                                                  }) => {
    const [config, setConfig] = useState<EnhancedDashboardConfig>(
        initialConfig || {
            id: '',
            name: 'New Dashboard',
            tabs: [{ id: 'main', name: 'Main', layout: [] }],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    );

    const [activeTabId, setActiveTabId] = useState(config.tabs[0]?.id || 'main');
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [showTemplateDialog, setShowTemplateDialog] = useState(!initialConfig);
    const [showWidgetLibrary, setShowWidgetLibrary] = useState(true);

    const activeTab = useMemo(() =>
            config.tabs.find(tab => tab.id === activeTabId),
        [config.tabs, activeTabId]
    );

    // Handle layout changes from react-grid-layout
    const handleLayoutChange = useCallback((layout: any[]) => {
        if (!activeTab) return;

        const updatedLayout = layout.map(layoutItem => {
            const existingItem = activeTab.layout.find(item => item.i === layoutItem.i);
            return existingItem ? {
                ...existingItem,
                x: layoutItem.x,
                y: layoutItem.y,
                w: layoutItem.w,
                h: layoutItem.h,
            } : layoutItem;
        });

        setConfig(prev => ({
            ...prev,
            tabs: prev.tabs.map(tab =>
                tab.id === activeTabId
                    ? { ...tab, layout: updatedLayout }
                    : tab
            ),
            updatedAt: new Date().toISOString(),
        }));
    }, [activeTabId, activeTab]);

    // Add widget to current tab
    const handleAddWidget = useCallback((type: DashboardLayoutItem['componentType']) => {
        if (!activeTab) return;

        const newWidget: DashboardLayoutItem = {
            i: `widget-${Date.now()}`,
            x: 0,
            y: 0,
            w: type === 'card' ? 3 : 6,
            h: type === 'card' ? 2 : 4,
            componentType: type,
            componentProps: {},
        };

        setConfig(prev => ({
            ...prev,
            tabs: prev.tabs.map(tab =>
                tab.id === activeTabId
                    ? { ...tab, layout: [...tab.layout, newWidget] }
                    : tab
            ),
            updatedAt: new Date().toISOString(),
        }));
    }, [activeTabId, activeTab]);

    // Remove widget
    const handleRemoveWidget = useCallback((widgetId: string) => {
        setConfig(prev => ({
            ...prev,
            tabs: prev.tabs.map(tab =>
                tab.id === activeTabId
                    ? { ...tab, layout: tab.layout.filter(item => item.i !== widgetId) }
                    : tab
            ),
            updatedAt: new Date().toISOString(),
        }));
    }, [activeTabId]);

    // Add new tab
    const handleAddTab = useCallback(() => {
        const newTab: DashboardTab = {
            id: `tab-${Date.now()}`,
            name: `Tab ${config.tabs.length + 1}`,
            layout: [],
        };

        setConfig(prev => ({
            ...prev,
            tabs: [...prev.tabs, newTab],
            updatedAt: new Date().toISOString(),
        }));
        setActiveTabId(newTab.id);
    }, [config.tabs.length]);

    // Apply template
    const handleApplyTemplate = useCallback((template: DashboardTemplate) => {
        setConfig(prev => ({
            ...prev,
            templateId: template.id,
            tabs: template.tabs,
            updatedAt: new Date().toISOString(),
        }));
        setActiveTabId(template.tabs[0]?.id || '');
    }, []);

    // Render widget based on type
    const renderWidget = useCallback((item: DashboardLayoutItem) => {
        const commonProps = {
            item,
            onRemove: () => handleRemoveWidget(item.i),
            editable: !isPreviewMode,
        };

        switch (item.componentType) {
            case 'chart':
                return <ChartWidget {...commonProps} />;
            case 'table':
                return <TableWidget {...commonProps} />;
            case 'card':
                return <MetricWidget {...commonProps} />;
            default:
                return <ChartWidget {...commonProps} />;
        }
    }, [isPreviewMode, handleRemoveWidget]);

    const handleSave = useCallback(() => {
        const configToSave = {
            ...config,
            id: config.id || `dashboard-${Date.now()}`,
        };
        onSave?.(configToSave);
    }, [config, onSave]);

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-background">
                <TemplateSelector
                    open={showTemplateDialog}
                    onOpenChange={setShowTemplateDialog}
                    onSelect={handleApplyTemplate}
                />

                {/* Main Content */}
                <SidebarInset className="flex-1">
                    {/* Header */}
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <div className="flex items-center gap-2 px-4 flex-1">
                            <Input
                                value={config.name}
                                onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                                className="text-lg font-semibold bg-transparent border-none shadow-none text-foreground placeholder:text-muted-foreground max-w-xs"
                            />

                            <div className="flex items-center gap-2 ml-auto">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowTemplateDialog(true)}
                                >
                                    <LayoutTemplate className="w-4 h-4 mr-2" />
                                    Templates
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                                >
                                    {isPreviewMode ? (
                                        <>
                                            <EyeOff className="w-4 h-4 mr-2" />
                                            Edit
                                        </>
                                    ) : (
                                        <>
                                            <Eye className="w-4 h-4 mr-2" />
                                            Preview
                                        </>
                                    )}
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowWidgetLibrary(!showWidgetLibrary)}
                                >
                                    <Settings className="w-4 h-4 mr-2" />
                                    Widgets
                                </Button>

                                <Button size="sm" onClick={handleSave}>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save
                                </Button>
                            </div>
                        </div>
                    </header>

                    {/* Tabs */}
                    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <Tabs value={activeTabId} onValueChange={setActiveTabId} className="w-full">
                            <div className="flex items-center px-4 py-2">
                                <TabsList className="grid w-fit grid-cols-auto">
                                    {config.tabs.map((tab) => (
                                        <TabsTrigger key={tab.id} value={tab.id}>
                                            {tab.name}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                {!isPreviewMode && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAddTab}
                                        className="ml-4"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Tab
                                    </Button>
                                )}
                            </div>

                            {/* Tab Content */}
                            {config.tabs.map((tab) => (
                                <TabsContent key={tab.id} value={tab.id} className="p-4 space-y-4">
                                    <ResponsiveGridLayout
                                        className="layout"
                                        layouts={{ lg: tab.layout }}
                                        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                                        rowHeight={60}
                                        onLayoutChange={handleLayoutChange}
                                        isDraggable={!isPreviewMode}
                                        isResizable={!isPreviewMode}
                                        margin={[16, 16]}
                                        containerPadding={[0, 0]}
                                    >
                                        {tab.layout.map((item) => (
                                            <div key={item.i} className="group">
                                                {renderWidget(item)}
                                            </div>
                                        ))}
                                    </ResponsiveGridLayout>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </SidebarInset>

                {/* Widget Library Sidebar */}
                {showWidgetLibrary && !isPreviewMode && (
                    <WidgetLibrarySidebar onAddWidget={handleAddWidget} />
                )}
            </div>
        </SidebarProvider>
    );
};

export default EnhancedDashboardBuilder;
