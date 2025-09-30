import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Leaf, 
  Calendar,
  MapPin,
  TrendingUp,
  CheckCircle,
  Target,
  Droplets,
  Sun,
  Brain,
  Star,
  Clock,
  Home
} from "lucide-react";

interface PreviousAdvisoryPageProps {
  onBack: () => void;
  onGetNewAdvisory: () => void;
  farmerName?: string;
}

interface CropRecommendation {
  id: number;
  cropName: string;
  variety: string;
  sowingDate: string;
  expectedYield: string;
  confidence: number;
  reasons: string[];
  soilType?: string;
  waterRequirement?: string;
  marketPrice?: string;
}

const PreviousAdvisoryPage = ({ onBack, onGetNewAdvisory, farmerName }: PreviousAdvisoryPageProps) => {
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load previous advisory data
    const savedData = localStorage.getItem('farmerAdvisoryData');
    
    if (savedData) {
      const advisoryData = JSON.parse(savedData);
      
      // Check if any of the recommendations are adopted plans
      const enhancedRecommendations = advisoryData.map((rec: any) => {
        // Check if this is an adopted plan by looking for specific indicators
        const isAdopted = rec.reasons && rec.reasons.includes("Adopted Plan");
        
        return {
          ...rec,
          isAdopted,
          // Add adoption date if it's an adopted plan
          adoptedDate: isAdopted ? new Date().toLocaleDateString() : null
        };
      });
      
      setRecommendations(enhancedRecommendations);
    }
    setLoading(false);
  }, []);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 bg-green-100";
    if (confidence >= 80) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 90) return <Star className="w-4 h-4" />;
    if (confidence >= 80) return <TrendingUp className="w-4 h-4" />;
    return <Target className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-green-500 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading your recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-6xl">🌾</div>
        <div className="absolute top-40 right-32 text-4xl">🌱</div>
        <div className="absolute bottom-32 left-32 text-5xl">🚜</div>
        <div className="absolute bottom-20 right-20 text-3xl">🌻</div>
        <div className="absolute top-1/2 left-1/4 text-2xl">🍃</div>
        <div className="absolute top-1/3 right-1/4 text-3xl">☀️</div>
      </div>

      <div className="relative z-10 p-4 py-8">
        {/* Home Button */}
        <div className="absolute top-4 right-4">
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="bg-white/80 hover:bg-white border-2 border-green-200 hover:border-green-300 text-green-700 hover:text-green-800 font-semibold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl mb-6 shadow-2xl">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-800 dark:text-white mb-2">
              Your Previous Advisory
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              {recommendations.some((rec: any) => rec.isAdopted) 
                ? "Your adopted crop plans and previous recommendations" 
                : "Based on your last inputs from 2 weeks ago"
              }
            </p>
            <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              {recommendations.some((rec: any) => rec.isAdopted) 
                ? "Includes Adopted Plans" 
                : "Last Updated: 2 weeks ago"
              }
            </Badge>
          </div>

          {/* Recommendations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recommendations.map((crop) => (
              <Card key={crop.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-green-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={`${getConfidenceColor(crop.confidence)} px-3 py-1`}>
                        {getConfidenceIcon(crop.confidence)}
                        <span className="ml-1 font-semibold">{crop.confidence}%</span>
                      </Badge>
                      {(crop as any).isAdopted && (
                        <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Adopted Plan
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
                    {crop.cropName}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Variety: {crop.variety}
                  </p>
                  {(crop as any).isAdopted && (
                    <p className="text-xs text-blue-600 font-medium">
                      ✓ Adopted on {(crop as any).adoptedDate}
                    </p>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Key Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">
                        <strong>Sowing Date:</strong> {crop.sowingDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">
                        <strong>Expected Yield:</strong> {crop.expectedYield}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">
                        <strong>Soil Type:</strong> Clay Loam
                      </span>
                    </div>
                  </div>

                  {/* Reasons */}
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Why Recommended:
                    </h4>
                    <ul className="space-y-1">
                      {crop.reasons.map((reason, index) => (
                        <li key={index} className="text-sm text-green-700 dark:text-green-300 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Market Info */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-800 dark:text-blue-200 font-medium">Market Price</span>
                      </div>
                      <span className="text-blue-600 dark:text-blue-300 font-bold">₹2,850/quintal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              onClick={onBack}
              variant="outline"
              className="w-full sm:w-auto h-12 border-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Options
            </Button>
            
            <Button
              onClick={onGetNewAdvisory}
              className="w-full sm:w-auto h-14 text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Get Updated Recommendations
              </div>
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <Target className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Crops Recommended</h3>
              <p className="text-2xl font-bold text-green-600">{recommendations.length}</p>
            </div>
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Avg. Confidence</h3>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(recommendations.reduce((sum, crop) => sum + crop.confidence, 0) / recommendations.length)}%
              </p>
            </div>
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <Calendar className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Sowing Period</h3>
              <p className="text-lg font-bold text-orange-600">Nov-Dec</p>
            </div>
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <Droplets className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Rainfall Expected</h3>
              <p className="text-lg font-bold text-purple-600">Good</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Recommendations are based on your farm location, soil type, and seasonal conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousAdvisoryPage;
