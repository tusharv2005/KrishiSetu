import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Package, 
  Calendar, 
  MapPin, 
  Weight, 
  DollarSign,
  Image,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  Sprout,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  BarChart3,
  Shield,
  Truck
} from "lucide-react";

interface CreateLotPageProps {
  onBack: () => void;
  onSubmit: (lotData: LotData) => void;
}

interface LotData {
  cropName: string;
  variety: string;
  quantity: number;
  unit: string;
  quality: string;
  harvestDate: string;
  location: string;
  minimumPrice: number;
  description: string;
  images: File[];
  auctionDuration: number;
}

interface MarketData {
  msp: number;
  currentMandiRate: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  demandForecast: 'high' | 'medium' | 'low';
  storageViability: number; // days
  logisticsCost: number;
  competitionLevel: 'high' | 'medium' | 'low';
}

interface PricingRecommendation {
  recommendedPrice: number;
  confidence: 'high' | 'medium' | 'low';
  factors: {
    msp: number;
    mandiRate: number;
    demandMultiplier: number;
    qualityMultiplier: number;
    locationMultiplier: number;
    storageMultiplier: number;
  };
  reasoning: string[];
}

const CreateLotPage = ({ onBack, onSubmit }: CreateLotPageProps) => {
  const [lotData, setLotData] = useState<LotData>({
    cropName: "",
    variety: "",
    quantity: 0,
    unit: "",
    quality: "",
    harvestDate: "",
    location: "",
    minimumPrice: 0,
    description: "",
    images: [],
    auctionDuration: 7
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricingRecommendation, setPricingRecommendation] = useState<PricingRecommendation | null>(null);

  // Market data for different crops and regions
  const getMarketData = (cropName: string, location: string): MarketData => {
    const cropData: { [key: string]: MarketData } = {
      rice: {
        msp: 2040,
        currentMandiRate: 2650,
        trend: 'up',
        trendPercentage: 8.5,
        demandForecast: 'high',
        storageViability: 180,
        logisticsCost: 150,
        competitionLevel: 'high'
      },
      wheat: {
        msp: 2015,
        currentMandiRate: 2350,
        trend: 'up',
        trendPercentage: 5.2,
        demandForecast: 'high',
        storageViability: 365,
        logisticsCost: 120,
        competitionLevel: 'high'
      },
      maize: {
        msp: 1870,
        currentMandiRate: 2100,
        trend: 'stable',
        trendPercentage: 2.1,
        demandForecast: 'medium',
        storageViability: 90,
        logisticsCost: 180,
        competitionLevel: 'medium'
      },
      cotton: {
        msp: 5450,
        currentMandiRate: 6200,
        trend: 'up',
        trendPercentage: 12.3,
        demandForecast: 'high',
        storageViability: 270,
        logisticsCost: 200,
        competitionLevel: 'medium'
      },
      sugarcane: {
        msp: 315,
        currentMandiRate: 340,
        trend: 'down',
        trendPercentage: -3.2,
        demandForecast: 'medium',
        storageViability: 7,
        logisticsCost: 100,
        competitionLevel: 'high'
      },
      soybean: {
        msp: 3950,
        currentMandiRate: 4200,
        trend: 'up',
        trendPercentage: 6.8,
        demandForecast: 'high',
        storageViability: 120,
        logisticsCost: 160,
        competitionLevel: 'medium'
      },
      potato: {
        msp: 0, // No MSP for vegetables
        currentMandiRate: 1800,
        trend: 'stable',
        trendPercentage: 1.5,
        demandForecast: 'medium',
        storageViability: 30,
        logisticsCost: 80,
        competitionLevel: 'high'
      },
      tomato: {
        msp: 0,
        currentMandiRate: 2500,
        trend: 'down',
        trendPercentage: -8.2,
        demandForecast: 'low',
        storageViability: 7,
        logisticsCost: 60,
        competitionLevel: 'high'
      },
      onion: {
        msp: 0,
        currentMandiRate: 2200,
        trend: 'up',
        trendPercentage: 15.6,
        demandForecast: 'high',
        storageViability: 60,
        logisticsCost: 70,
        competitionLevel: 'high'
      }
    };

    return cropData[cropName] || {
      msp: 2000,
      currentMandiRate: 2200,
      trend: 'stable',
      trendPercentage: 0,
      demandForecast: 'medium',
      storageViability: 90,
      logisticsCost: 150,
      competitionLevel: 'medium'
    };
  };

  // Calculate pricing recommendation based on multiple factors
  const calculatePricingRecommendation = (): PricingRecommendation | null => {
    // Show recommendation as soon as we have crop name and at least one other field
    if (!lotData.cropName || (!lotData.quality && !lotData.location && !lotData.harvestDate)) {
      return null;
    }

    const marketData = getMarketData(lotData.cropName, lotData.location || '');
    const harvestDate = lotData.harvestDate ? new Date(lotData.harvestDate) : new Date();
    const currentDate = new Date();
    const daysSinceHarvest = lotData.harvestDate ? 
      Math.floor((currentDate.getTime() - harvestDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;

    // Quality multipliers
    const qualityMultipliers: { [key: string]: number } = {
      'premium': 1.25,
      'good': 1.10,
      'fair': 1.00,
      'standard': 0.95
    };

    // Demand forecast multipliers
    const demandMultipliers: { [key: string]: number } = {
      'high': 1.15,
      'medium': 1.00,
      'low': 0.90
    };

    // Location multipliers (based on competition and logistics)
    const locationMultipliers: { [key: string]: number } = {
      'high': 0.95, // High competition = lower price
      'medium': 1.00,
      'low': 1.05   // Low competition = higher price
    };

    // Storage viability multiplier (fresher = higher price)
    const storageMultiplier = Math.max(0.85, 1 - (daysSinceHarvest / marketData.storageViability) * 0.3);

    // Trend multiplier
    const trendMultiplier = marketData.trend === 'up' ? 1.05 : marketData.trend === 'down' ? 0.95 : 1.00;

    // Calculate base price (use MSP as floor, mandi rate as reference)
    const basePrice = Math.max(marketData.msp, marketData.currentMandiRate);
    
    // Apply all multipliers
    const qualityMultiplier = lotData.quality ? (qualityMultipliers[lotData.quality] || 1.00) : 1.00;
    const demandMultiplier = demandMultipliers[marketData.demandForecast];
    const locationMultiplier = locationMultipliers[marketData.competitionLevel];

    const recommendedPrice = Math.round(
      basePrice * 
      qualityMultiplier * 
      demandMultiplier * 
      locationMultiplier * 
      storageMultiplier * 
      trendMultiplier
    );

    // Generate reasoning
    const reasoning: string[] = [];
    
    if (marketData.msp > 0) {
      reasoning.push(`MSP floor price: ₹${marketData.msp}/quintal`);
    }
    reasoning.push(`Current mandi rate: ₹${marketData.currentMandiRate}/quintal`);
    reasoning.push(`Market trend: ${marketData.trend} (${marketData.trendPercentage > 0 ? '+' : ''}${marketData.trendPercentage}%)`);
    reasoning.push(`Demand forecast: ${marketData.demandForecast}`);
    
    if (lotData.quality) {
      reasoning.push(`Quality grade: ${lotData.quality} (${((qualityMultiplier - 1) * 100).toFixed(0)}% premium)`);
    } else {
      reasoning.push(`Quality grade: Not specified (using base rate)`);
    }
    
    if (lotData.harvestDate && daysSinceHarvest > 0) {
      reasoning.push(`Storage factor: ${daysSinceHarvest} days since harvest`);
    } else if (lotData.harvestDate) {
      reasoning.push(`Storage factor: Fresh harvest`);
    }
    
    reasoning.push(`Competition level: ${marketData.competitionLevel}`);

    // Determine confidence level
    let confidence: 'high' | 'medium' | 'low' = 'medium';
    if (marketData.msp > 0 && marketData.trend !== 'down' && marketData.demandForecast === 'high') {
      confidence = 'high';
    } else if (marketData.trend === 'down' || marketData.demandForecast === 'low') {
      confidence = 'low';
    }

    return {
      recommendedPrice,
      confidence,
      factors: {
        msp: marketData.msp,
        mandiRate: marketData.currentMandiRate,
        demandMultiplier,
        qualityMultiplier,
        locationMultiplier,
        storageMultiplier
      },
      reasoning
    };
  };

  // Update pricing recommendation when relevant fields change
  const updatePricingRecommendation = () => {
    const recommendation = calculatePricingRecommendation();
    setPricingRecommendation(recommendation);
  };

  const handleInputChange = (field: keyof LotData, value: any) => {
    setLotData(prev => ({ ...prev, [field]: value }));
    
    // Update pricing recommendation when relevant fields change
    if (['cropName', 'quality', 'location', 'harvestDate'].includes(field)) {
      setTimeout(updatePricingRecommendation, 100); // Small delay to ensure state is updated
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setLotData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit(lotData);
    setIsSubmitting(false);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      // Update pricing recommendation when moving to step 2
      if (currentStep === 1) {
        setTimeout(updatePricingRecommendation, 100);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStep1Valid = lotData.cropName && lotData.variety && lotData.quantity > 0 && lotData.unit;
  const isStep2Valid = lotData.quality && lotData.harvestDate && lotData.location && lotData.minimumPrice > 0;
  const isStep3Valid = lotData.description && lotData.auctionDuration > 0;

  const applyRecommendedPrice = () => {
    if (pricingRecommendation) {
      setLotData(prev => ({ ...prev, minimumPrice: pricingRecommendation.recommendedPrice }));
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="cropName" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Crop Name *
          </Label>
          <Select onValueChange={(value) => handleInputChange('cropName', value)}>
            <SelectTrigger className="h-12 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-primary rounded-xl">
              <SelectValue placeholder="Select crop type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rice">Rice</SelectItem>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="maize">Maize</SelectItem>
              <SelectItem value="cotton">Cotton</SelectItem>
              <SelectItem value="sugarcane">Sugarcane</SelectItem>
              <SelectItem value="soybean">Soybean</SelectItem>
              <SelectItem value="potato">Potato</SelectItem>
              <SelectItem value="tomato">Tomato</SelectItem>
              <SelectItem value="onion">Onion</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="variety" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Variety *
          </Label>
          <Input
            id="variety"
            type="text"
            placeholder="e.g., Basmati 370, Pusa 1121"
            value={lotData.variety}
            onChange={(e) => handleInputChange('variety', e.target.value)}
            className="h-12 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-primary rounded-xl"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Quantity *
          </Label>
          <Input
            id="quantity"
            type="number"
            placeholder="Enter quantity"
            value={lotData.quantity || ''}
            onChange={(e) => handleInputChange('quantity', parseFloat(e.target.value) || 0)}
            className="h-12 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-primary rounded-xl"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Unit *
          </Label>
          <Select onValueChange={(value) => handleInputChange('unit', value)}>
            <SelectTrigger className="h-12 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-primary rounded-xl">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quintals">Quintals</SelectItem>
              <SelectItem value="tonnes">Tonnes</SelectItem>
              <SelectItem value="kg">Kilograms</SelectItem>
              <SelectItem value="bags">Bags (50kg)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Quantity Guidelines</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Minimum lot size is 1 quintal. For better market response, consider listing in standard units like quintals or tonnes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="quality" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Quality Grade *
          </Label>
          <Select onValueChange={(value) => handleInputChange('quality', value)}>
            <SelectTrigger className="h-12 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-primary rounded-xl">
              <SelectValue placeholder="Select quality grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="premium">Premium (A Grade)</SelectItem>
              <SelectItem value="good">Good (B Grade)</SelectItem>
              <SelectItem value="fair">Fair (C Grade)</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="harvestDate" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Harvest Date *
          </Label>
          <Input
            id="harvestDate"
            type="date"
            value={lotData.harvestDate}
            onChange={(e) => handleInputChange('harvestDate', e.target.value)}
            className="h-12 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-primary rounded-xl"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Location *
        </Label>
        <Input
          id="location"
          type="text"
          placeholder="e.g., Village, District, State"
          value={lotData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className="h-12 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-primary rounded-xl"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="minimumPrice" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Minimum Price per Quintal (₹) *
        </Label>
        <Input
          id="minimumPrice"
          type="number"
          placeholder="Enter minimum price"
          value={lotData.minimumPrice || ''}
          onChange={(e) => handleInputChange('minimumPrice', parseFloat(e.target.value) || 0)}
          className="h-12 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-primary rounded-xl"
          required
        />
      </div>

      {/* Basic Market Info - Always show when crop is selected */}
      {lotData.cropName && !pricingRecommendation && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-700">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-800 rounded-lg">
              <BarChart3 className="w-5 h-5 text-amber-600 dark:text-amber-300" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                Market Information for {lotData.cropName.charAt(0).toUpperCase() + lotData.cropName.slice(1)}
              </h4>
              <div className="text-sm text-amber-700 dark:text-amber-300">
                <p>Fill in quality grade, harvest date, and location to get a personalized pricing recommendation.</p>
                <p className="mt-1 font-medium">Current market rate: ₹{getMarketData(lotData.cropName, '').currentMandiRate}/quintal</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Recommendation */}
      {pricingRecommendation && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
              <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-blue-800 dark:text-blue-200 text-lg">
                  💡 Smart Pricing Recommendation
                </h4>
                <Button
                  type="button"
                  onClick={applyRecommendedPrice}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Apply
                </Button>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-600 mb-4">
                <p className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  Based on mandi trends, MSP, and demand forecast, your recommended base price is{" "}
                  <span className="text-blue-600 dark:text-blue-400">₹{pricingRecommendation.recommendedPrice}</span> per quintal.
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  <Badge 
                    variant="secondary" 
                    className={`${
                      pricingRecommendation.confidence === 'high' ? 'bg-green-100 text-green-700' :
                      pricingRecommendation.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}
                  >
                    {pricingRecommendation.confidence === 'high' ? 'High' : 
                     pricingRecommendation.confidence === 'medium' ? 'Medium' : 'Low'} Confidence
                  </Badge>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                    <BarChart3 className="w-4 h-4" />
                    <span>Market Analysis</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  {pricingRecommendation.factors.msp > 0 && (
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600 dark:text-gray-400">MSP:</span>
                      <span className="font-semibold">₹{pricingRecommendation.factors.msp}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600 dark:text-gray-400">Mandi Rate:</span>
                    <span className="font-semibold">₹{pricingRecommendation.factors.mandiRate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-600 dark:text-gray-400">Quality:</span>
                    <span className="font-semibold">+{((pricingRecommendation.factors.qualityMultiplier - 1) * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-semibold text-blue-800 dark:text-blue-200 text-sm">Analysis Factors:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {pricingRecommendation.reasoning.map((reason, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Pricing Tips</h4>
            <p className="text-sm text-green-700 dark:text-green-300">
              Set your minimum price based on current market rates. Our auction system will help you get the best possible price above your minimum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Description *
        </Label>
        <Textarea
          id="description"
          placeholder="Describe your produce, farming methods, storage conditions, etc."
          value={lotData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="min-h-[120px] bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-primary rounded-xl"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="auctionDuration" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Auction Duration (Days) *
        </Label>
        <Select onValueChange={(value) => handleInputChange('auctionDuration', parseInt(value))}>
          <SelectTrigger className="h-12 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-primary rounded-xl">
            <SelectValue placeholder="Select auction duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3 Days</SelectItem>
            <SelectItem value="5">5 Days</SelectItem>
            <SelectItem value="7">7 Days</SelectItem>
            <SelectItem value="10">10 Days</SelectItem>
            <SelectItem value="14">14 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Product Images
        </Label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-primary transition-colors">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="imageUpload"
          />
          <label htmlFor="imageUpload" className="cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Click to upload images or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG up to 10MB each (max 5 images)
            </p>
          </label>
        </div>
        
        {lotData.images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {lotData.images.map((file, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                <Image className="w-3 h-3 mr-1" />
                {file.name}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-1">Auction Timeline</h4>
            <p className="text-sm text-orange-700 dark:text-orange-300">
              Your auction will start immediately after submission and run for the selected duration. You'll receive notifications for all bids.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-6xl">🌾</div>
        <div className="absolute top-40 right-32 text-4xl">🌱</div>
        <div className="absolute bottom-32 left-32 text-5xl">🚜</div>
        <div className="absolute bottom-20 right-20 text-3xl">🌻</div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl mb-6 shadow-2xl">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-800 dark:text-white mb-2">
              Create Lot to Bid
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              List your produce for auction and get the best price
            </p>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= step 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-1 mx-2 ${
                      currentStep > step ? 'bg-primary' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 px-4 py-2">
              <Package className="w-4 h-4 mr-2" />
              Step {currentStep} of 3
            </Badge>
          </div>

          {/* Form Card */}
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
                {currentStep === 1 && (
                  <>
                    <Package className="w-6 h-6 text-primary" />
                    Basic Information
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <DollarSign className="w-6 h-6 text-primary" />
                    Quality & Pricing
                  </>
                )}
                {currentStep === 3 && (
                  <>
                    <Image className="w-6 h-6 text-primary" />
                    Details & Images
                  </>
                )}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-600">
                  <Button
                    type="button"
                    onClick={currentStep === 1 ? onBack : prevStep}
                    variant="outline"
                    className="w-full sm:w-auto h-12 border-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {currentStep === 1 ? 'Back to Choice' : 'Previous'}
                  </Button>
                  
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={
                        (currentStep === 1 && !isStep1Valid) ||
                        (currentStep === 2 && !isStep2Valid)
                      }
                      className="w-full sm:w-auto h-14 text-lg font-bold bg-gradient-to-r from-primary to-success hover:from-success hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Step
                      <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || !isStep3Valid}
                      className="w-full sm:w-auto h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Creating Lot...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Sprout className="w-5 h-5" />
                          Create Lot
                        </div>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your lot will be reviewed and approved within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLotPage;
