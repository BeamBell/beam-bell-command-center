import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DashboardSettings = () => {
  const [friendlyFormal, setFriendlyFormal] = useState([50]);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Configure your AI agent and system preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>AI Agent Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium">AI Tone</Label>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Friendly</span>
                  <span>Formal</span>
                </div>
                <Slider
                  value={friendlyFormal}
                  onValueChange={setFriendlyFormal}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="transfer-number" className="text-base font-medium">Transfer Number</Label>
              <Input id="transfer-number" placeholder="+1 (555) 123-4567" className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">Number to transfer calls to human agents</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            
            <div>
              <Label className="text-base font-medium">Time Zone</Label>
              <Select defaultValue="est">
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="est">Eastern Time (EST)</SelectItem>
                  <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                  <SelectItem value="cst">Central Time (CST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button>Save Settings</Button>
    </div>
  );
};

export default DashboardSettings;