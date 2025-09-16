import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, TrendingUp, TrendingDown, Lightbulb } from "lucide-react";
import { cropRecommendations } from "@/data/mockData";

interface CultivationPlannerProps {
  cropId: number;
  farmerData: {
    state: string;
    district: string;
    landSize: number;
    landUnit: string;
    waterBackup: boolean;
    previousCrop: string;
  };
  onBack: () => void;
}

export default function CultivationPlanner({ cropId, farmerData, onBack }: CultivationPlannerProps) {
  const crop = cropRecommendations.find(c => c.id === cropId);
  const [selectedVariety, setSelectedVariety] = useState(0);
  const [selectedFertilizer, setSelectedFertilizer] = useState(0);
  const [economics, setEconomics] = useState({
    seedCostPerAcre: crop?.economics?.seedCostPerAcre || 0,
    fertilizerCostPerAcre: crop?.economics?.fertilizerCostPerAcre || 0,
    grossIncome: crop?.economics?.grossIncome || 0,
    netProfit: crop?.economics?.netProfit || 0
  });

  useEffect(() => {
    if (!crop) return;

    const variety = crop.varieties[selectedVariety];
    const fertilizer = crop.fertilizers[selectedFertilizer];
    
    const seedCostPerAcre = variety.seedRequired * variety.premium;
    const fertilizerCostPerAcre = fertilizer.quantity * fertilizer.costPerKg;
    const grossIncome = variety.yield * 100 * variety.premium / 100; // Simplified calculation
    const netProfit = grossIncome - seedCostPerAcre - fertilizerCostPerAcre;

    setEconomics({
      seedCostPerAcre,
      fertilizerCostPerAcre,
      grossIncome,
      netProfit
    });
  }, [selectedVariety, selectedFertilizer, crop]);

  if (!crop) {
    return <div>Crop not found</div>;
  }

  const variety = crop.varieties[selectedVariety];
  const fertilizer = crop.fertilizers[selectedFertilizer];
  const totalSeedCost = economics.seedCostPerAcre * farmerData.landSize;
  const totalFertilizerCost = economics.fertilizerCostPerAcre * farmerData.landSize;
  const totalGrossIncome = economics.grossIncome * farmerData.landSize;
  const totalNetProfit = economics.netProfit * farmerData.landSize;

  const getProfitChangeIcon = (current: number, original: number) => {
    if (current > original) return <TrendingUp className="h-4 w-4 text-profit" />;
    if (current < original) return <TrendingDown className="h-4 w-4 text-destructive" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-earth p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="mb-4 h-12 px-6 text-base"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recommendations
          </Button>
          
          <Card className="shadow-card border-border/50">
            <CardHeader className="bg-gradient-farm text-white">
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <span className="text-4xl">{crop.icon}</span>
                {crop.name} Cultivation Planner
              </CardTitle>
              <p className="text-white/90 text-lg">
                Customize your cultivation plan for {farmerData.landSize} {farmerData.landUnit} in {farmerData.district}
              </p>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interactive Controls */}
          <div className="space-y-6">
            {/* Seed Variety Selection */}
            <Card className="shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  🌱 Seed Variety Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select 
                  value={selectedVariety.toString()} 
                  onValueChange={(value) => setSelectedVariety(parseInt(value))}
                >
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    {crop.varieties.map((variety, index) => (
                      <SelectItem key={index} value={index.toString()} className="text-base py-3">
                        <div className="flex justify-between items-center w-full">
                          <span>{variety.name}</span>
                          <span className="text-sm text-muted-foreground ml-4">
                            {variety.yield}q/acre
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Seed Required</div>
                      <div className="font-semibold">{variety.seedRequired} kg/acre</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Expected Yield</div>
                      <div className="font-semibold">{variety.yield} quintals/acre</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fertilizer Selection */}
            <Card className="shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  🧪 Fertilizer Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select 
                  value={selectedFertilizer.toString()} 
                  onValueChange={(value) => setSelectedFertilizer(parseInt(value))}
                >
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    {crop.fertilizers.map((fertilizer, index) => (
                      <SelectItem key={index} value={index.toString()} className="text-base py-3">
                        <div className="flex justify-between items-center w-full">
                          <span>{fertilizer.name}</span>
                          <span className="text-sm text-muted-foreground ml-4">
                            ₹{fertilizer.costPerKg}/kg
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Quantity Needed</div>
                      <div className="font-semibold">{fertilizer.quantity} kg/acre</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Cost per Kg</div>
                      <div className="font-semibold">₹{fertilizer.costPerKg}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Economic Breakdown */}
          <div className="space-y-6">
            <Card className="shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  💰 Economic Breakdown
                  {getProfitChangeIcon(economics.netProfit, crop.economics.netProfit)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Per Acre Calculations */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Per Acre Analysis</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/30 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Seed Cost</div>
                      <div className="text-lg font-bold">₹{economics.seedCostPerAcre.toLocaleString()}</div>
                    </div>
                    <div className="bg-secondary/30 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Fertilizer Cost</div>
                      <div className="text-lg font-bold">₹{economics.fertilizerCostPerAcre.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="bg-accent/20 p-4 rounded-lg border border-accent/30">
                    <div className="text-sm text-muted-foreground">Gross Income</div>
                    <div className="text-xl font-bold text-accent">₹{economics.grossIncome.toLocaleString()}</div>
                  </div>

                  <div className="bg-gradient-profit p-4 rounded-lg text-white">
                    <div className="text-sm opacity-90">Net Profit</div>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      ₹{economics.netProfit.toLocaleString()}
                      {getProfitChangeIcon(economics.netProfit, crop.economics.netProfit)}
                    </div>
                  </div>
                </div>

                {/* Total for Farmer's Land */}
                <div className="border-t pt-4 space-y-3">
                  <h4 className="font-semibold text-lg">Total for {farmerData.landSize} {farmerData.landUnit}</h4>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                      <span className="text-muted-foreground">Total Seed Cost</span>
                      <span className="font-semibold">₹{totalSeedCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                      <span className="text-muted-foreground">Total Fertilizer Cost</span>
                      <span className="font-semibold">₹{totalFertilizerCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-accent/20 rounded-lg border border-accent/30">
                      <span className="text-muted-foreground">Total Gross Income</span>
                      <span className="font-bold text-accent">₹{totalGrossIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-profit rounded-lg text-white">
                      <span className="opacity-90">Total Net Profit</span>
                      <span className="text-xl font-bold">₹{totalNetProfit.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Value-Add Tip */}
        <Card className="shadow-card border-border/50 mt-6">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-accent" />
              💡 Pro Farming Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
              <p className="text-base leading-relaxed">
                <strong>Intercropping Opportunity:</strong> Consider growing legumes like groundnut or moong between {crop.name.toLowerCase()} rows. 
                This can add an extra ₹8,000-12,000 per acre while improving soil nitrogen naturally. 
                The legumes will be ready for harvest 60-70 days before your main crop, giving you additional income and better soil health.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}