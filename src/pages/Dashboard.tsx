import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Target, BarChart3, Settings, MessageSquare, TrendingUp, Clock, Users } from "lucide-react";
import PhoneNumbers from "@/components/dashboard/PhoneNumbers";
import Campaigns from "@/components/dashboard/Campaigns";
import CallAnalytics from "@/components/dashboard/CallAnalytics";
import DashboardSettings from "@/components/dashboard/DashboardSettings";
import AIAgent from "@/components/dashboard/AIAgent";
import OverallView from "@/components/dashboard/OverallView";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock KPI data
  const kpis = [
    { label: "Total Dials", value: "2,847", change: "+12%", icon: Phone },
    { label: "Conversion Rate", value: "18.4%", change: "+3.2%", icon: TrendingUp },
    { label: "Avg Call Length", value: "4:32", change: "+0:45", icon: Clock },
    { label: "Active Campaigns", value: "3", change: "0", icon: Target }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with KPIs */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">BB</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">BeamBell Dashboard</h1>
                <p className="text-sm text-muted-foreground">Marketing & Outreach Campaign</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Live
            </Badge>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => {
              const IconComponent = kpi.icon;
              return (
                <Card key={kpi.label} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">{kpi.label}</p>
                        <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                        <p className="text-xs text-green-600 font-medium">{kpi.change}</p>
                      </div>
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Dashboard Tabs */}
      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="phone-numbers" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Numbers
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Call Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="ai-agent" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              AI Agent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverallView />
          </TabsContent>

          <TabsContent value="phone-numbers" className="space-y-6">
            <PhoneNumbers />
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Campaigns />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <CallAnalytics />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <DashboardSettings />
          </TabsContent>

          <TabsContent value="ai-agent" className="space-y-6">
            <AIAgent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;