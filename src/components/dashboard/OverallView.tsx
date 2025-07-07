import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const OverallView = () => {
  // Mock daily data
  const dailyData = [
    { day: "Day 1", date: "Jan 15", answered: 45, unanswered: 32, transferred: 8, failed: 3, trend: "up" },
    { day: "Day 2", date: "Jan 16", answered: 52, unanswered: 28, transferred: 12, failed: 2, trend: "up" },
    { day: "Day 3", date: "Jan 17", answered: 38, unanswered: 41, transferred: 6, failed: 5, trend: "down" },
    { day: "Day 4", date: "Jan 18", answered: 61, unanswered: 25, transferred: 15, failed: 1, trend: "up" },
    { day: "Day 5", date: "Jan 19", answered: 48, unanswered: 33, transferred: 9, failed: 4, trend: "down" },
    { day: "Day 6", date: "Jan 20", answered: 58, unanswered: 27, transferred: 13, failed: 2, trend: "up" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Overall View</h2>
        <p className="text-muted-foreground">Daily performance overview across all campaigns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {dailyData.map((day) => (
          <Card key={day.day} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{day.day}</CardTitle>
                {day.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">{day.date}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Answered</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {day.answered}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Unanswered</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    {day.unanswered}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Transferred</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {day.transferred}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Failed</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    {day.failed}
                  </Badge>
                </div>
              </div>
              
              {/* Mini spark line visualization */}
              <div className="pt-2 border-t">
                <div className="flex items-end justify-between h-8 gap-0.5">
                  <div className="w-2 bg-green-200 rounded-t" style={{ height: `${(day.answered / 70) * 100}%` }}></div>
                  <div className="w-2 bg-yellow-200 rounded-t" style={{ height: `${(day.unanswered / 70) * 100}%` }}></div>
                  <div className="w-2 bg-blue-200 rounded-t" style={{ height: `${(day.transferred / 70) * 100}%` }}></div>
                  <div className="w-2 bg-red-200 rounded-t" style={{ height: `${(day.failed / 70) * 100}%` }}></div>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  Total: {day.answered + day.unanswered + day.transferred + day.failed}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OverallView;