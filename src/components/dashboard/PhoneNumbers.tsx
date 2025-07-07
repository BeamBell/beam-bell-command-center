import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Plus, Search, MapPin, Clock } from "lucide-react";

const PhoneNumbers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock phone numbers data
  const phoneNumbers = [
    { id: 1, number: "+1 (555) 123-4567", area: "New York, NY", status: "active", type: "local", purchased: "2024-01-15" },
    { id: 2, number: "+1 (555) 987-6543", area: "Los Angeles, CA", status: "active", type: "local", purchased: "2024-01-10" },
    { id: 3, number: "+1 (800) 555-0123", area: "Toll-Free", status: "active", type: "toll-free", purchased: "2024-01-05" },
    { id: 4, number: "+1 (555) 246-8135", area: "Chicago, IL", status: "inactive", type: "local", purchased: "2024-01-20" },
  ];

  const filteredNumbers = phoneNumbers.filter(num => 
    num.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    num.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Phone Numbers</h2>
          <p className="text-muted-foreground">Manage your call campaign phone numbers</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Purchase Number
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search phone numbers or areas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Numbers</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-types">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="local">Local</SelectItem>
                <SelectItem value="toll-free">Toll-Free</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Phone Numbers List */}
      <div className="grid gap-4">
        {filteredNumbers.map((phoneNumber) => (
          <Card key={phoneNumber.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{phoneNumber.number}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {phoneNumber.area}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Purchased {new Date(phoneNumber.purchased).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={phoneNumber.status === "active" ? "default" : "secondary"}
                    className={phoneNumber.status === "active" ? "bg-green-100 text-green-800" : ""}
                  >
                    {phoneNumber.status}
                  </Badge>
                  <Badge variant="outline">
                    {phoneNumber.type}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNumbers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Phone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No phone numbers found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search criteria" : "Purchase your first phone number to get started"}
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Purchase Number
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PhoneNumbers;