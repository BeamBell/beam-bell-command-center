import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Upload, Play, Pause, Square, Phone, Users, TrendingUp } from "lucide-react";

const Campaigns = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Mock campaigns data
  const campaigns = [
    {
      id: 1,
      name: "Q1 Lead Generation",
      status: "active",
      progress: 65,
      totalContacts: 1500,
      completed: 975,
      answered: 234,
      converted: 43,
      startDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Holiday Promotion",
      status: "paused",
      progress: 30,
      totalContacts: 800,
      completed: 240,
      answered: 72,
      converted: 15,
      startDate: "2024-01-10",
    },
    {
      id: 3,
      name: "Customer Retention",
      status: "completed",
      progress: 100,
      totalContacts: 500,
      completed: 500,
      answered: 380,
      converted: 95,
      startDate: "2024-01-05",
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Campaigns</h2>
          <p className="text-muted-foreground">Manage your AI-driven outbound call campaigns</p>
        </div>
        <Button className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          New Campaign
        </Button>
      </div>

      {/* Upload CSV Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Contacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">Upload your contact list</p>
              <p className="text-sm text-muted-foreground">
                Upload a CSV file with phone numbers, names, and any additional data
              </p>
            </div>
            <Input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="mt-4 w-auto mx-auto"
            />
            {selectedFile && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">Selected: {selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">Size: {(selectedFile.size / 1024).toFixed(1)} KB</p>
              </div>
            )}
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">CSV Format Requirements:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Phone number column (required)</li>
              <li>• Name column (optional but recommended)</li>
              <li>• Email column (optional)</li>
              <li>• Custom fields for personalization</li>
            </ul>
          </div>
          {selectedFile && (
            <Button className="w-full">
              Launch Campaign with {selectedFile.name}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Active Campaigns */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Active Campaigns</h3>
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-foreground">{campaign.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Started {new Date(campaign.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                  <div className="flex space-x-1">
                    {campaign.status === "active" ? (
                      <Button size="sm" variant="outline">
                        <Pause className="w-4 h-4" />
                      </Button>
                    ) : campaign.status === "paused" ? (
                      <Button size="sm" variant="outline">
                        <Play className="w-4 h-4" />
                      </Button>
                    ) : null}
                    <Button size="sm" variant="outline">
                      <Square className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{campaign.completed}/{campaign.totalContacts} calls</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{campaign.totalContacts}</p>
                    <p className="text-xs text-muted-foreground">Total Contacts</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{campaign.answered}</p>
                    <p className="text-xs text-muted-foreground">Answered</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{campaign.converted}</p>
                    <p className="text-xs text-muted-foreground">Converted</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-2">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {((campaign.converted / campaign.answered) * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted-foreground">Conversion Rate</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;