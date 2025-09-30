import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CloudRain, 
  TrendingUp, 
  CheckCircle,
  BarChart3
} from "lucide-react";

interface RainfallProbabilityProps {
  onContinue: () => void;
}

const RainfallProbability = ({ onContinue }: RainfallProbabilityProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <CloudRain className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
          <BarChart3 className="w-6 h-6 text-cyan-500" />
          Rainfall Probability
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Get detailed rainfall and weather forecasts for your district to plan your farming activities
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>5-month rainfall forecast</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>Temperature & humidity data</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>Seasonal deviation analysis</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>Smart farming insights</span>
          </div>
        </div>

        <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-600" />
              <span className="text-cyan-800 dark:text-cyan-200 font-medium">Weather Intelligence</span>
            </div>
            <span className="text-cyan-600 dark:text-cyan-300 font-bold">90% Accuracy</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RainfallProbability;