import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Phone, PhoneCall, PhoneOff, PhoneForwarded, Clock, Copy, ChevronDown, ChevronUp } from "lucide-react";

const CallAnalytics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCalls, setExpandedCalls] = useState<Set<number>>(new Set());

  // Mock call data
  const calls = [
    {
      id: 1,
      phoneNumber: "+1 (555) 123-4567",
      contactName: "John Smith", 
      status: "answered",
      duration: "4:32",
      timestamp: "2024-01-20 14:30:00",
      campaign: "Q1 Lead Generation",
      summary: "Customer expressed interest in digital marketing services. Scheduled follow-up call for next Tuesday.",
      transcript: "Agent: Hello, this is Sarah from BeamBell Marketing. May I speak with John?\nJohn: Yes, this is John.\nAgent: Great! I'm calling because we help small businesses improve their online presence..."
    },
    {
      id: 2,
      phoneNumber: "+1 (555) 987-6543",
      contactName: "Emily Johnson",
      status: "transferred",
      duration: "2:15",
      timestamp: "2024-01-20 14:15:00",
      campaign: "Q1 Lead Generation",
      summary: "Call transferred to sales manager for pricing discussion.",
      transcript: "Agent: Hello Emily, I'm calling about our marketing services...\nEmily: I'm interested but need to speak with someone about pricing..."
    },
    {
      id: 3,
      phoneNumber: "+1 (555) 456-7890",
      contactName: "Mike Davis",
      status: "unanswered",
      duration: "0:00",
      timestamp: "2024-01-20 14:00:00",
      campaign: "Holiday Promotion",
      summary: "No answer - voicemail left",
      transcript: "Voicemail: Hi Mike, this is BeamBell Marketing calling about our special holiday promotion..."
    },
    {
      id: 4,
      phoneNumber: "+1 (555) 321-0987",
      contactName: "Sarah Wilson",
      status: "failed",
      duration: "0:00",
      timestamp: "2024-01-20 13:45:00",
      campaign: "Customer Retention",
      summary: "Call failed - number disconnected",
      transcript: "System: The number you have dialed is no longer in service..."
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "answered": return <PhoneCall className="w-4 h-4 text-green-600" />;
      case "unanswered": return <PhoneOff className="w-4 h-4 text-yellow-600" />;
      case "transferred": return <PhoneForwarded className="w-4 h-4 text-blue-600" />;
      case "failed": return <Phone className="w-4 h-4 text-red-600" />;
      default: return <Phone className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "answered": return "bg-green-100 text-green-800";
      case "unanswered": return "bg-yellow-100 text-yellow-800";
      case "transferred": return "bg-blue-100 text-blue-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCalls = calls.filter(call => 
    call.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    call.phoneNumber.includes(searchQuery) ||
    call.campaign.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCallExpansion = (callId: number) => {
    const newExpanded = new Set(expandedCalls);
    if (newExpanded.has(callId)) {
      newExpanded.delete(callId);
    } else {
      newExpanded.add(callId);
    }
    setExpandedCalls(newExpanded);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Call Analytics</h2>
          <p className="text-muted-foreground">Detailed analysis of all your call activities</p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Input
              placeholder="Search by contact name, phone number, or campaign..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4"
            />
          </div>
        </CardContent>
      </Card>

      {/* Call Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <PhoneCall className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">234</p>
            <p className="text-sm text-muted-foreground">Answered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <PhoneOff className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">156</p>
            <p className="text-sm text-muted-foreground">Unanswered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <PhoneForwarded className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">43</p>
            <p className="text-sm text-muted-foreground">Transferred</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Phone className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-sm text-muted-foreground">Failed</p>
          </CardContent>
        </Card>
      </div>

      {/* Call Details */}
      <div className="space-y-4">
        {filteredCalls.map((call) => (
          <Card key={call.id} className="hover:shadow-md transition-shadow">
            <Collapsible>
              <CollapsibleTrigger
                className="w-full"
                onClick={() => toggleCallExpansion(call.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        {getStatusIcon(call.status)}
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-foreground">{call.contactName}</h4>
                        <p className="text-sm text-muted-foreground">{call.phoneNumber}</p>
                        <p className="text-xs text-muted-foreground">{call.campaign}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge className={getStatusColor(call.status)}>
                          {call.status}
                        </Badge>
                        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {call.duration}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(call.timestamp).toLocaleString()}
                        </p>
                      </div>
                      {expandedCalls.has(call.id) ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="px-6 pb-6 pt-0 border-t">
                  <div className="space-y-4 mt-4">
                    {/* Summary */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-foreground">Call Summary</h5>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(call.summary)}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                        {call.summary}
                      </p>
                    </div>
                    
                    {/* Transcript */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-foreground">Transcript</h5>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(call.transcript)}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg max-h-40 overflow-y-auto">
                        <pre className="whitespace-pre-wrap font-sans">{call.transcript}</pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {filteredCalls.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Phone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No calls found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search criteria" : "Call data will appear here once your campaigns are active"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CallAnalytics;