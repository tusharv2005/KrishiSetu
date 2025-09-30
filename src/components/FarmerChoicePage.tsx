import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  ShoppingCart, 
  ArrowLeft, 
  Leaf, 
  TrendingUp, 
  Users, 
  DollarSign,
  Sprout,
  BarChart3,
  Target,
  CheckCircle,
  Home,
  CloudRain
} from "lucide-react";
import NotificationBell from "./NotificationBell";

interface FarmerChoicePageProps {
  onAdvisoryChoice: () => void;
  onSellChoice: () => void;
  onBack: () => void;
  farmerName?: string;
}

const FarmerChoicePage = ({ onAdvisoryChoice, onSellChoice, onBack, farmerName }: FarmerChoicePageProps) => {
  const [selectedOption, setSelectedOption] = useState<'advisory' | 'sell' | 'rainfall' | null>(null);

  const handleContinue = () => {
    if (selectedOption === 'advisory') {
      onAdvisoryChoice();
    } else if (selectedOption === 'sell') {
      onSellChoice();
    } else if (selectedOption === 'rainfall') {
      window.location.href = '/rainfall-forecast';
    }
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
        {/* Top Navigation */}
        <div className="absolute top-4 right-4 flex items-center gap-3">
          <NotificationBell farmerName={farmerName} />
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-success rounded-3xl mb-6 shadow-2xl">
              <Sprout className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-800 dark:text-white mb-2">
              Welcome, {farmerName || 'Farmer'}!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              What would you like to do today?
            </p>
            <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2">
              <Leaf className="w-4 h-4 mr-2" />
              Choose Your Path
            </Badge>
          </div>

          {/* Choice Cards */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-8">
            {/* AI Advisory Option */}
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedOption === 'advisory' 
                  ? 'ring-4 ring-primary shadow-2xl' 
                  : 'hover:shadow-xl'
              }`}
              onClick={() => setSelectedOption('advisory')}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
                  <Target className="w-6 h-6 text-blue-500" />
                  AI Crop Advisory
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Get personalized crop recommendations based on your soil, location, and farming conditions
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Personalized crop recommendations</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Weather-based farming advice</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Soil health analysis</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Pest and disease prevention</span>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-800 dark:text-blue-200 font-medium">Expected Yield Increase</span>
                    </div>
                    <span className="text-blue-600 dark:text-blue-300 font-bold">+25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sell Yield Option */}
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedOption === 'sell' 
                  ? 'ring-4 ring-orange-500 shadow-2xl' 
                  : 'hover:shadow-xl'
              }`}
              onClick={() => setSelectedOption('sell')}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
                  <BarChart3 className="w-6 h-6 text-orange-500" />
                  Sell Your Yield
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  List your produce in our auction marketplace and get the best price from verified buyers
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Transparent auction system</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Verified buyers only</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Fair pricing guaranteed</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Secure payment processing</span>
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-orange-600" />
                      <span className="text-orange-800 dark:text-orange-200 font-medium">Average Price Premium</span>
                    </div>
                    <span className="text-orange-600 dark:text-orange-300 font-bold">+15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rainfall Probability Option */}
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedOption === 'rainfall' 
                  ? 'ring-4 ring-cyan-500 shadow-2xl' 
                  : 'hover:shadow-xl'
              }`}
              onClick={() => setSelectedOption('rainfall')}
            >
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
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onBack}
              variant="outline"
              className="w-full sm:w-auto h-12 border-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
            
            <Button
              onClick={handleContinue}
              disabled={!selectedOption}
              className="w-full sm:w-auto h-14 text-lg font-bold bg-gradient-to-r from-primary to-success hover:from-success hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedOption === 'advisory' && (
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Get AI Advisory
                </div>
              )}
              {selectedOption === 'sell' && (
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Create Lot to Bid
                </div>
              )}
              {selectedOption === 'rainfall' && (
                <div className="flex items-center gap-2">
                  <CloudRain className="w-5 h-5" />
                  View Rainfall Forecast
                </div>
              )}
              {!selectedOption && (
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5" />
                  Continue
                </div>
              )}
            </Button>
          </div>


          {/* Features Summary */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Trusted Platform</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Used by 10,000+ farmers</p>
            </div>
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Better Returns</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Higher yields and prices</p>
            </div>
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <CheckCircle className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Secure & Reliable</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Safe transactions guaranteed</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help choosing? Both options are free to use!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerChoicePage;
