import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Droplets, Leaf, Sparkles, Target, BarChart3, Award, Home } from "lucide-react";
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
  
  // Save recommendations as previous advisory when component mounts
  useEffect(() => {
    const advisoryData = cropRecommendations.map(crop => ({
      id: crop.id,
      cropName: crop.name,
      variety: crop.bestSeedVariety,
      sowingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 15 days from now
      expectedYield: `${crop.varieties[0]?.yield || 15} quintals/acre`,
      confidence: Math.floor(Math.random() * 15) + 80, // Random confidence between 80-95%
      reasons: [
        ...crop.badges.slice(0, 2),
        `Expected profit: ₹${crop.profitPerAcre.toLocaleString()}/acre`
      ],
      soilType: "Clay Loam",
      waterRequirement: crop.badges.includes("Water Intensive") ? "High" : "Moderate",
      marketPrice: `₹${Math.floor(Math.random() * 1000) + 2000}/quintal`
    }));
    
    localStorage.setItem('farmerAdvisoryData', JSON.stringify(advisoryData));
  }, []);
  
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
    <div className="min-h-screen bg-gradient-earth p-4 relative overflow-hidden">
      {/* Home Button */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          onClick={() => window.location.href = '/'}
          variant="outline"
          className="bg-white/80 hover:bg-white border-2 border-green-200 hover:border-green-300 text-green-700 hover:text-green-800 font-semibold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="mb-6 h-12 px-6 text-base hover:shadow-lg transition-all duration-300 transform hover:scale-105 bg-white/80 dark:bg-card/80 backdrop-blur-sm border-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Input
          </Button>
          
          <Card className="shadow-2xl border-border/50 overflow-hidden bg-gradient-to-br from-white to-primary/5 dark:from-card dark:to-primary/10">
            <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white relative overflow-hidden">
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl md:text-4xl font-black mb-2">
                      Smart Crop Recommendations
                    </CardTitle>
                    <p className="text-white/90 text-lg font-medium">
                      Personalized for {farmerData.district}, {farmerData.state}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <BarChart3 className="h-6 w-6 text-white" />
                    <div>
                      <div className="text-sm text-white/70">Land Size</div>
                      <div className="text-lg font-bold">{farmerData.landSize} {farmerData.landUnit}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <Droplets className="h-6 w-6 text-white" />
                    <div>
                      <div className="text-sm text-white/70">Water Source</div>
                      <div className="text-lg font-bold">{farmerData.waterBackup ? "Available" : "Rain-fed"}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <Leaf className="h-6 w-6 text-white" />
                    <div>
                      <div className="text-sm text-white/70">Previous Crop</div>
                      <div className="text-lg font-bold">{farmerData.previousCrop}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cropRecommendations.map((crop, index) => (
            <Card key={crop.id} className="group shadow-2xl border-border/50 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 bg-gradient-to-br from-white via-white to-primary/5 dark:from-card dark:via-card dark:to-primary/10 overflow-hidden relative">
              {/* Rank Badge */}
              <div className="absolute top-4 right-4 z-20">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-white shadow-lg ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                  index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                  index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-800' :
                  'bg-gradient-to-br from-primary to-success'
                }`}>
                  #{index + 1}
                </div>
              </div>
              
              
              <CardHeader className="pb-3 relative">
                <div className="flex flex-col items-center text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {crop.icon}
                  </div>
                  <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors duration-300">
                    {crop.name}
                  </CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Profit Display */}
                <div className="relative text-center bg-gradient-to-br from-success via-primary to-success text-white p-6 rounded-2xl shadow-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-sm font-medium">Estimated Profit</span>
                    </div>
                    <div className="text-3xl font-black mb-1">₹{crop.profitPerAcre.toLocaleString()}</div>
                    <div className="text-sm opacity-90">per acre</div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {crop.badges.map((badge) => (
                    <Badge 
                      key={badge} 
                      variant={getBadgeVariant(badge)}
                      className="text-xs px-3 py-1 font-medium rounded-full shadow-sm hover:shadow-md transition-shadow"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground text-center leading-relaxed bg-secondary/30 p-4 rounded-xl">
                  {crop.description}
                </p>

                {/* Total Profit for Farmer's Land */}
                <div className="bg-gradient-to-r from-accent/10 to-warning/10 p-4 rounded-xl text-center border border-accent/20 shadow-inner">
                  <div className="text-sm text-muted-foreground font-medium mb-1">
                    Total Profit for {farmerData.landSize} {farmerData.landUnit}
                  </div>
                  <div className="text-2xl font-black text-profit flex items-center justify-center gap-2">
                    <Award className="h-5 w-5" />
                    ₹{(crop.profitPerAcre * farmerData.landSize).toLocaleString()}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  onClick={() => onSelectCrop(crop.id)}
                  className="w-full h-14 bg-gradient-to-r from-primary to-success hover:from-success hover:to-primary text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <Target className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                  View Details & Plan
                  <ArrowLeft className="h-5 w-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center">
          <Card className="shadow-2xl border-border/50 bg-gradient-to-br from-white to-accent/10 dark:from-card dark:to-accent/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-accent/20 rounded-2xl">
                  <Sparkles className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Pro Tips for Success</h3>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                <strong className="text-primary">🌱 Smart Farming:</strong> Consider crop rotation and soil health for sustainable farming. 
                Select any crop above to access detailed cultivation planning with optimized seed varieties, fertilizer schedules, and market timing insights.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-primary/10 p-4 rounded-xl">
                  <div className="font-semibold text-primary mb-1">🔄 Crop Rotation</div>
                  <div className="text-sm text-muted-foreground">Maintain soil fertility</div>
                </div>
                <div className="bg-success/10 p-4 rounded-xl">
                  <div className="font-semibold text-success mb-1">📊 Market Timing</div>
                  <div className="text-sm text-muted-foreground">Maximize selling price</div>
                </div>
                <div className="bg-accent/10 p-4 rounded-xl">
                  <div className="font-semibold text-accent mb-1">🌾 Quality Seeds</div>
                  <div className="text-sm text-muted-foreground">Higher yield guarantee</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}