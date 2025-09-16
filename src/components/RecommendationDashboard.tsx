import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Droplets, Leaf } from "lucide-react";
import { cropRecommendations } from "@/data/mockData";

interface RecommendationDashboardProps {
  farmerData: {
    state: string;
    district: string;
    landSize: number;
    landUnit: string;
    waterBackup: boolean;
    previousCrop: string;
  };
  onBack: () => void;
  onSelectCrop: (cropId: number) => void;
}

export default function RecommendationDashboard({ 
  farmerData, 
  onBack, 
  onSelectCrop 
}: RecommendationDashboardProps) {
  
  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "High Demand":
        return "default";
      case "Water Intensive":
        return "destructive";
      case "Less Water":
      case "Water Efficient":
        return "secondary";
      case "Soil Friendly":
        return "outline";
      case "Export Potential":
        return "default";
      case "Nitrogen Fixing":
        return "secondary";
      case "Protein Rich":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="mb-4 h-12 px-6 text-base"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Input
          </Button>
          
          <Card className="shadow-card border-border/50">
            <CardHeader className="bg-gradient-farm text-white">
              <CardTitle className="text-2xl font-bold">
                🌾 Crop Recommendations for {farmerData.district}, {farmerData.state}
              </CardTitle>
              <div className="flex flex-wrap gap-4 text-white/90 text-base">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Land: {farmerData.landSize} {farmerData.landUnit}
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Water: {farmerData.waterBackup ? "Available" : "Rain-fed"}
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  Previous: {farmerData.previousCrop}
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cropRecommendations.map((crop, index) => (
            <Card key={crop.id} className="shadow-card border-border/50 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{crop.icon}</div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Rank</div>
                    <div className="text-2xl font-bold text-primary">#{index + 1}</div>
                  </div>
                </div>
                <CardTitle className="text-xl text-center">{crop.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Profit Display */}
                <div className="text-center bg-gradient-profit text-white p-4 rounded-lg">
                  <div className="text-sm font-medium">Estimated Profit</div>
                  <div className="text-2xl font-bold">₹{crop.profitPerAcre.toLocaleString()}</div>
                  <div className="text-xs opacity-90">per acre</div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {crop.badges.map((badge) => (
                    <Badge 
                      key={badge} 
                      variant={getBadgeVariant(badge)}
                      className="text-xs px-2 py-1"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  {crop.description}
                </p>

                {/* Total Profit for Farmer's Land */}
                <div className="bg-secondary/50 p-3 rounded-lg text-center border border-border">
                  <div className="text-sm text-muted-foreground">Total Profit for {farmerData.landSize} {farmerData.landUnit}</div>
                  <div className="text-lg font-bold text-profit">
                    ₹{(crop.profitPerAcre * farmerData.landSize).toLocaleString()}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  onClick={() => onSelectCrop(crop.id)}
                  className="w-full h-12 bg-primary text-white hover:bg-primary/90 font-semibold"
                >
                  View Details & Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-8 text-center">
          <Card className="shadow-card border-border/50 bg-secondary/30">
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                💡 <strong>Pro Tip:</strong> Consider crop rotation and soil health for sustainable farming. 
                Select a crop above to see detailed cultivation planning with seed varieties and fertilizer options.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}