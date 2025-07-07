import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scissors, Calculator, Megaphone, Stethoscope } from "lucide-react";

const specializations = [
  {
    id: "beauty",
    title: "Beauty & Barbershops",
    icon: Scissors,
    description: "Hair salons, beauty parlors, barbershops",
    comingSoon: true,
  },
  {
    id: "accounting",
    title: "Accounting",
    icon: Calculator,
    description: "Tax services, bookkeeping, financial advisory",
    comingSoon: true,
  },
  {
    id: "marketing",
    title: "Marketing & Outreach",
    icon: Megaphone,
    description: "Lead generation, customer outreach, sales calls",
    comingSoon: false,
  },
  {
    id: "dentistry",
    title: "Dentistry",
    icon: Stethoscope,
    description: "Dental practices, orthodontics, oral health",
    comingSoon: true,
  },
];

const Specialization = () => {
  const navigate = useNavigate();

  const handleSpecializationSelect = (id: string) => {
    if (id === "marketing") {
      navigate("/campaign-setup");
    } else {
      // Show coming soon message (you could use a toast or modal here)
      alert("Coming soon—this specialization is still in the works!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="max-w-4xl mx-auto pt-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">BB</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Choose Your Specialization</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the industry that best matches your business to get started with AI-powered call campaigns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specializations.map((spec) => {
            const IconComponent = spec.icon;
            return (
              <Card
                key={spec.id}
                className="relative cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/20"
                onClick={() => handleSpecializationSelect(spec.id)}
              >
                {spec.comingSoon && (
                  <Badge className="absolute -top-2 -right-2 z-10" variant="secondary">
                    Coming Soon
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{spec.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{spec.description}</p>
                  <Button
                    className="w-full mt-6"
                    variant={spec.comingSoon ? "outline" : "default"}
                    disabled={spec.comingSoon}
                  >
                    {spec.comingSoon ? "Coming Soon" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Specialization;