import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

const CampaignSetup = () => {
  const navigate = useNavigate();
  const [campaignPrompt, setCampaignPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCampaignSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignPrompt.trim()) return;
    
    setIsLoading(true);
    
    // Simulate campaign setup
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="max-w-2xl mx-auto pt-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/specialization")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Specializations
        </Button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">BB</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Set Up Your Campaign</h1>
          <p className="text-xl text-muted-foreground">
            Describe your marketing campaign goals and target audience
          </p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Campaign Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCampaignSetup} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Campaign Prompt *
                </label>
                <Textarea
                  value={campaignPrompt}
                  onChange={(e) => setCampaignPrompt(e.target.value)}
                  placeholder="Describe your campaign goals, target audience, key messaging, and desired outcomes. For example: 'Generate leads for our digital marketing agency by calling small business owners in the retail sector. Focus on pain points around online visibility and offer a free consultation...'"
                  className="min-h-[200px] resize-none"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Be specific about your goals, target audience, and messaging for the best results.
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-medium text-foreground mb-2">Tips for a great campaign prompt:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Define your target audience clearly</li>
                  <li>• Specify your product or service</li>
                  <li>• Include key pain points to address</li>
                  <li>• Mention your desired call-to-action</li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full h-12"
                disabled={isLoading || !campaignPrompt.trim()}
              >
                {isLoading ? "Setting up campaign..." : "Create Campaign & Continue"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignSetup;