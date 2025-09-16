import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Droplets, Wheat, MapPin, TrendingUp } from "lucide-react";
import { statesAndDistricts, crops } from "@/data/mockData";

interface FarmerInputProps {
  onSubmit: (data: {
    state: string;
    district: string;
    landSize: number;
    landUnit: string;
    waterBackup: boolean;
    previousCrop: string;
  }) => void;
}

export default function FarmerInputForm({ onSubmit }: FarmerInputProps) {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [landSize, setLandSize] = useState("");
  const [landUnit, setLandUnit] = useState("acres");
  const [waterBackup, setWaterBackup] = useState(false);
  const [previousCrop, setPreviousCrop] = useState("");

  const handleSubmit = () => {
    if (!selectedState || !selectedDistrict || !landSize || !previousCrop) {
      alert("Please fill all required fields");
      return;
    }

    onSubmit({
      state: selectedState,
      district: selectedDistrict,
      landSize: parseFloat(landSize),
      landUnit,
      waterBackup,
      previousCrop,
    });
  };

  const districts = selectedState ? statesAndDistricts[selectedState as keyof typeof statesAndDistricts] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-earth p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-card border-border/50">
          <CardHeader className="bg-gradient-farm text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <Wheat className="h-8 w-8" />
              Crop Recommendation System
            </CardTitle>
            <p className="text-white/90 text-lg">
              Get personalized crop recommendations for maximum profit
            </p>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Location Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                Location Details
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-base font-medium">State *</Label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      {Object.keys(statesAndDistricts).map((state) => (
                        <SelectItem key={state} value={state} className="text-base py-3">
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district" className="text-base font-medium">District *</Label>
                  <Select 
                    value={selectedDistrict} 
                    onValueChange={setSelectedDistrict}
                    disabled={!selectedState}
                  >
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select your district" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      {districts.map((district) => (
                        <SelectItem key={district} value={district} className="text-base py-3">
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Land Size Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                Land Information
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="landSize" className="text-base font-medium">Land Size *</Label>
                  <Input
                    id="landSize"
                    type="number"
                    placeholder="Enter size"
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="unit" className="text-base font-medium">Unit</Label>
                  <Select value={landUnit} onValueChange={setLandUnit}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="acres" className="text-base py-3">Acres</SelectItem>
                      <SelectItem value="hectares" className="text-base py-3">Hectares</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Water Backup Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Droplets className="h-5 w-5 text-primary" />
                Water Availability
              </div>
              
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
                <div>
                  <Label htmlFor="water-backup" className="text-base font-medium">
                    Do you have water backup/irrigation?
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    This helps us recommend suitable crops
                  </p>
                </div>
                <Switch
                  id="water-backup"
                  checked={waterBackup}
                  onCheckedChange={setWaterBackup}
                  className="scale-125"
                />
              </div>
            </div>

            {/* Previous Crop Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Wheat className="h-5 w-5 text-primary" />
                Crop History
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="previousCrop" className="text-base font-medium">Previous Crop Grown *</Label>
                <Select value={previousCrop} onValueChange={setPreviousCrop}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Select previous crop" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    {crops.map((crop) => (
                      <SelectItem key={crop} value={crop} className="text-base py-3">
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit}
              className="w-full h-14 text-lg font-semibold bg-gradient-farm hover:shadow-button transition-all duration-200 transform hover:scale-[1.02]"
            >
              Get Crop Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}