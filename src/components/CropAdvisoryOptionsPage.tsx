import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Leaf, 
  History,
  Sparkles,
  CheckCircle,
  TrendingUp,
  Target,
  Brain,
  Calendar,
  MapPin,
  Droplets,
  Home
} from "lucide-react";

interface CropAdvisoryOptionsPageProps {
  onViewPrevious: () => void;
  onGetNewAdvisory: () => void;
  onBack: () => void;
  farmerName?: string;
}

// Mock data for previous advisory - in real app, this would come from API/storage
const mockPreviousAdvisory = [
  {
    id: 1,
    cropName: "Wheat",
    variety: "HD-2967",
    sowingDate: "2024-11-15",
    expectedYield: "4.5 tons/acre",
    confidence: 92,
    reasons: ["Optimal soil conditions", "Good rainfall pattern", "Suitable temperature"]
  },
  {
    id: 2,
    cropName: "Chickpea",
    variety: "Pusa-372",
    sowingDate: "2024-11-20",
    expectedYield: "1.8 tons/acre", 
    confidence: 88,
    reasons: ["Nitrogen fixation benefits", "Market demand high", "Disease resistant variety"]
  },
  {
    id: 3,
    cropName: "Mustard",
    variety: "Pusa-21",
    sowingDate: "2024-12-01",
    expectedYield: "2.2 tons/acre",
    confidence: 85,
    reasons: ["Oil content high", "Early maturity", "Good market price"]
  }
];

const CropAdvisoryOptionsPage = ({ onViewPrevious, onGetNewAdvisory, onBack, farmerName }: CropAdvisoryOptionsPageProps) => {
  const [selectedOption, setSelectedOption] = useState<'previous' | 'new' | null>(null);
  const [hasPreviousAdvisory, setHasPreviousAdvisory] = useState(false);

  useEffect(() => {
    // Check if farmer has previous advisory data
    // In real app, this would be an API call
    const hasData = localStorage.getItem('farmerAdvisoryData');
    setHasPreviousAdvisory(!!hasData);
    
    // For demo purposes, if no data exists, create some mock data
    if (!hasData) {
      localStorage.setItem('farmerAdvisoryData', JSON.stringify(mockPreviousAdvisory));
      setHasPreviousAdvisory(true);
    }
  }, []);

  const handleContinue = () => {
    if (selectedOption === 'previous') {
      onViewPrevious();
    } else if (selectedOption === 'new') {
      onGetNewAdvisory();
    }
  };

  const handleViewPrevious = () => {
    // Store the previous advisory data for display
    localStorage.setItem('farmerAdvisoryData', JSON.stringify(mockPreviousAdvisory));
    onViewPrevious();
  };

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

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
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
        
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl mb-6 shadow-2xl">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-800 dark:text-white mb-2">
              Your Crop Advisory
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Choose how you'd like to proceed with your crop recommendations
            </p>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
              <Target className="w-4 h-4 mr-2" />
              AI-Powered Recommendations
            </Badge>
          </div>

          {/* Choice Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* View Previous Advisory Option */}
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedOption === 'previous' 
                  ? 'ring-4 ring-green-500 shadow-2xl' 
                  : 'hover:shadow-xl'
              } ${!hasPreviousAdvisory ? 'opacity-60' : ''}`}
              onClick={() => hasPreviousAdvisory && setSelectedOption('previous')}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <History className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
                  <Calendar className="w-6 h-6 text-green-500" />
                  View Previous Advisory
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {hasPreviousAdvisory 
                    ? "Review your last crop recommendations based on your previous inputs"
                    : "No previous advisory found. Get your first AI recommendation!"
                  }
                </p>
                
                {hasPreviousAdvisory && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>3 crops recommended previously</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Based on your soil & location data</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Sowing dates and yield estimates</span>
                    </div>
                  </div>
                )}

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-green-800 dark:text-green-200 font-medium">
                        {hasPreviousAdvisory ? "Last Updated" : "Ready for First Advisory"}
                      </span>
                    </div>
                    <span className="text-green-600 dark:text-green-300 font-bold">
                      {hasPreviousAdvisory ? "2 weeks ago" : "Start Now"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Get New AI Advisory Option */}
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedOption === 'new' 
                  ? 'ring-4 ring-blue-500 shadow-2xl' 
                  : 'hover:shadow-xl'
              }`}
              onClick={() => setSelectedOption('new')}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
                  <Brain className="w-6 h-6 text-blue-500" />
                  Get New AI Advisory
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Get fresh AI-powered crop recommendations with updated weather and market data
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Latest weather forecasts</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Updated market prices</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Enhanced soil analysis</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Pest & disease alerts</span>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-800 dark:text-blue-200 font-medium">AI Accuracy</span>
                    </div>
                    <span className="text-blue-600 dark:text-blue-300 font-bold">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onBack}
              variant="outline"
              className="w-full sm:w-auto h-12 border-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Choices
            </Button>
            
            <Button
              onClick={handleContinue}
              disabled={!selectedOption}
              className="w-full sm:w-auto h-14 text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedOption === 'previous' && (
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  View Previous Recommendations
                </div>
              )}
              {selectedOption === 'new' && (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Get New AI Advisory
                </div>
              )}
              {!selectedOption && (
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Continue
                </div>
              )}
            </Button>
          </div>

          {/* Quick Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <MapPin className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Location-Based</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Recommendations for your area</p>
            </div>
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Weather-Aware</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Considers rainfall & temperature</p>
            </div>
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Market-Optimized</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Best prices & demand</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Both options are completely free and personalized for your farm!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropAdvisoryOptionsPage;
