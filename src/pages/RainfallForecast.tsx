import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  Cloud, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calendar,
  MapPin,
  Eye,
  Brain,
  History,
  ArrowLeft,
  Home
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RainfallData {
  month: string;
  rainfallProbability: number;
  averageRainfall: number;
  rainyDays: number;
  avgTempMin: number;
  avgTempMax: number;
  avgTempMean: number;
  humidity: number;
  windSpeed: number;
  evaporationRate: number;
  cloudCover: number;
  soilMoistureIndex: number;
  seasonalDeviation: 'Above Normal' | 'Normal' | 'Below Normal';
}

const RainfallForecast = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [rainfallData, setRainfallData] = useState<RainfallData[]>([]);
  const [loading, setLoading] = useState(false);

  const districts = [
    "Karnal", "Ludhiana", "Ahmedabad", "Pune", "Bangalore", "Hyderabad", 
    "Kolkata", "Patna", "Jaipur", "Bhopal", "Chandigarh", "Dehradun"
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Mock data generator for demonstration
  const generateMockData = (district: string, startMonth: string): RainfallData[] => {
    const startIndex = months.indexOf(startMonth);
    const data: RainfallData[] = [];
    
    for (let i = 0; i < 5; i++) {
      const monthIndex = (startIndex + i) % 12;
      const month = months[monthIndex];
      
      // Generate realistic mock data based on Indian weather patterns
      const baseRainfall = monthIndex >= 5 && monthIndex <= 9 ? 150 : 50; // Monsoon months
      const baseTemp = monthIndex >= 3 && monthIndex <= 8 ? 35 : 25; // Summer months
      
      data.push({
        month,
        rainfallProbability: Math.floor(Math.random() * 40) + 30,
        averageRainfall: Math.floor(Math.random() * baseRainfall) + baseRainfall * 0.5,
        rainyDays: Math.floor(Math.random() * 8) + 2,
        avgTempMin: Math.floor(Math.random() * 10) + baseTemp - 10,
        avgTempMax: Math.floor(Math.random() * 10) + baseTemp,
        avgTempMean: Math.floor(Math.random() * 10) + baseTemp - 5,
        humidity: Math.floor(Math.random() * 30) + 50,
        windSpeed: Math.floor(Math.random() * 15) + 5,
        evaporationRate: Math.floor(Math.random() * 8) + 2,
        cloudCover: Math.floor(Math.random() * 40) + 30,
        soilMoistureIndex: Math.floor(Math.random() * 40) + 40,
        seasonalDeviation: ['Above Normal', 'Normal', 'Below Normal'][Math.floor(Math.random() * 3)] as 'Above Normal' | 'Normal' | 'Below Normal'
      });
    }
    
    return data;
  };

  const handleGetForecast = () => {
    if (!selectedDistrict || !selectedMonth) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockData = generateMockData(selectedDistrict, selectedMonth);
      setRainfallData(mockData);
      setLoading(false);
    }, 1500);
  };

  const getDeviationColor = (deviation: string) => {
    switch (deviation) {
      case 'Above Normal': return 'text-green-600 bg-green-100';
      case 'Normal': return 'text-blue-600 bg-blue-100';
      case 'Below Normal': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskLevel = (probability: number) => {
    if (probability >= 70) return { level: 'High', color: 'text-green-600', icon: CheckCircle };
    if (probability >= 40) return { level: 'Medium', color: 'text-yellow-600', icon: AlertTriangle };
    return { level: 'Low', color: 'text-red-600', icon: AlertTriangle };
  };

  const generateInsights = (data: RainfallData[]) => {
    const insights = [];
    const firstMonth = data[0];
    const avgRainfall = data.reduce((sum, d) => sum + d.averageRainfall, 0) / data.length;
    
    if (firstMonth.seasonalDeviation === 'Above Normal') {
      insights.push(`Rainfall in ${firstMonth.month} is expected to be 20% above average.`);
    } else if (firstMonth.seasonalDeviation === 'Below Normal') {
      insights.push(`Below normal rainfall expected in ${firstMonth.month} - irrigation support recommended.`);
    }
    
    if (avgRainfall > 100) {
      insights.push("Ideal conditions for sowing paddy in this period.");
    }
    
    if (firstMonth.avgTempMax > 35) {
      insights.push("High temperature alert - consider heat stress management.");
    }
    
    if (firstMonth.humidity > 80) {
      insights.push("High humidity conditions - watch for fungal diseases.");
    }
    
    return insights;
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
          <Button
            onClick={() => window.location.href = '/farmer-choice'}
            variant="outline"
            className="bg-white/80 hover:bg-white border-2 border-green-200 hover:border-green-300 text-green-700 hover:text-green-800 font-semibold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl mb-6 shadow-2xl">
              <CloudRain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-800 dark:text-white mb-2">
              Rainfall Probability Forecast
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Get detailed weather forecasts to plan your farming activities
            </p>
            <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200 px-4 py-2">
              <BarChart3 className="w-4 h-4 mr-2" />
              Weather Intelligence
            </Badge>
          </div>

          {/* Main Content Card */}
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
                <CloudRain className="w-6 h-6 text-cyan-500" />
                Rainfall & Weather Forecast
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Select your district and starting month to get a comprehensive 5-month weather forecast
              </p>
              
              {/* Input Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Select District
                  </label>
                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your district" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Starting Month
                  </label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select starting month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleGetForecast}
                disabled={!selectedDistrict || !selectedMonth || loading}
                className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Getting Forecast...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CloudRain className="w-5 h-5" />
                    Get Rainfall Forecast
                  </div>
                )}
              </Button>

              {/* Results Section */}
              {rainfallData.length > 0 && (
                <div className="space-y-6">
                  {/* Insights */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Key Insights
                    </h4>
                    <div className="space-y-1">
                      {generateInsights(rainfallData).map((insight, index) => (
                        <p key={index} className="text-sm text-blue-700 dark:text-blue-300">
                          • {insight}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Monthly Forecast Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rainfallData.map((data, index) => {
                      const riskLevel = getRiskLevel(data.rainfallProbability);
                      const RiskIcon = riskLevel.icon;
                      
                      return (
                        <Card key={index} className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800 dark:text-white">{data.month}</h4>
                            <Badge className={getDeviationColor(data.seasonalDeviation)}>
                              {data.seasonalDeviation}
                            </Badge>
                          </div>
                          
                          <div className="space-y-3">
                            {/* Rainfall Probability */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <CloudRain className="w-4 h-4 text-blue-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">Rainfall Probability</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <RiskIcon className={`w-4 h-4 ${riskLevel.color}`} />
                                <span className={`font-semibold ${riskLevel.color}`}>{data.rainfallProbability}%</span>
                              </div>
                            </div>
                            
                            {/* Average Rainfall */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Droplets className="w-4 h-4 text-cyan-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">Avg Rainfall</span>
                              </div>
                              <span className="font-semibold text-gray-800 dark:text-white">{data.averageRainfall}mm</span>
                            </div>
                            
                            {/* Temperature */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Thermometer className="w-4 h-4 text-red-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">Temperature</span>
                              </div>
                              <span className="font-semibold text-gray-800 dark:text-white">
                                {data.avgTempMin}°-{data.avgTempMax}°C
                              </span>
                            </div>
                            
                            {/* Humidity */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Droplets className="w-4 h-4 text-blue-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">Humidity</span>
                              </div>
                              <span className="font-semibold text-gray-800 dark:text-white">{data.humidity}%</span>
                            </div>
                            
                            {/* Wind Speed */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Wind className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">Wind Speed</span>
                              </div>
                              <span className="font-semibold text-gray-800 dark:text-white">{data.windSpeed} km/h</span>
                            </div>
                            
                            {/* Rainy Days */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Cloud className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">Rainy Days</span>
                              </div>
                              <span className="font-semibold text-gray-800 dark:text-white">{data.rainyDays}</span>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      onClick={() => window.location.href = '/farmer-input'}
                      className="h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        Get Advisory Based on Rainfall
                      </div>
                    </Button>
                    
                    <Button 
                      onClick={() => {
                        // Handle historical comparison
                        alert('Historical comparison feature coming soon!');
                      }}
                      variant="outline"
                      className="h-12 border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 font-semibold rounded-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <History className="w-5 h-5" />
                        Compare with Previous Years
                      </div>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => window.location.href = '/farmer-choice'}
              variant="outline"
              className="h-12 border-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RainfallForecast;
