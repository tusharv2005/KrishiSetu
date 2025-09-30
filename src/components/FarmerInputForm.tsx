import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Droplets, Wheat, MapPin, TrendingUp, Home, Calendar } from "lucide-react";
import { statesAndDistricts, crops } from "@/data/mockData";

interface FarmerInputProps {
  onSubmit: (data: {
    state: string;
    district: string;
    landSize: number;
    landUnit: string;
    waterBackup: boolean;
    previousCrop: string;
    sowingMonth: string;
  }) => void;
}

export default function FarmerInputForm({ onSubmit }: FarmerInputProps) {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [landSize, setLandSize] = useState("");
  const [landUnit, setLandUnit] = useState("acres");
  const [waterBackup, setWaterBackup] = useState(false);
  const [previousCrop, setPreviousCrop] = useState("");
  const [sowingMonth, setSowingMonth] = useState("");

  const handleSubmit = () => {
    if (!selectedState || !selectedDistrict || !landSize || !previousCrop || !sowingMonth) {
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
      sowingMonth,
    });
  };

  const districts = selectedState ? statesAndDistricts[selectedState as keyof typeof statesAndDistricts] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4 relative">
      {/* Home Button */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          onClick={() => window.location.href = '/'}
          variant="outline"
          className="bg-white/80 hover:bg-white border-2 border-amber-200 hover:border-amber-300 text-amber-700 hover:text-amber-800 font-semibold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl border-amber-200/50 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-amber-700 to-orange-800 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <Wheat className="h-8 w-8" />
              Crop Recommendation System
            </CardTitle>
            <p className="text-amber-100 text-lg">
              Get personalized crop recommendations for maximum profit
            </p>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Location Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-amber-800">
                <MapPin className="h-5 w-5 text-amber-600" />
                Location Details
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-base font-medium text-amber-700">State *</Label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="h-12 text-base border-amber-300 focus:border-amber-500 focus:ring-amber-500">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-amber-200">
                      {Object.keys(statesAndDistricts).map((state) => (
                        <SelectItem key={state} value={state} className="text-base py-3 hover:bg-amber-50">
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district" className="text-base font-medium text-amber-700">District *</Label>
                  <Select 
                    value={selectedDistrict} 
                    onValueChange={setSelectedDistrict}
                    disabled={!selectedState}
                  >
                    <SelectTrigger className="h-12 text-base border-amber-300 focus:border-amber-500 focus:ring-amber-500">
                      <SelectValue placeholder="Select your district" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-amber-200">
                      {districts.map((district) => (
                        <SelectItem key={district} value={district} className="text-base py-3 hover:bg-amber-50">
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
              <div className="flex items-center gap-2 text-lg font-semibold text-amber-800">
                <TrendingUp className="h-5 w-5 text-amber-600" />
                Land Information
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="landSize" className="text-base font-medium text-amber-700">Land Size *</Label>
                  <Input
                    id="landSize"
                    type="number"
                    placeholder="Enter size"
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value)}
                    min="0.1"
                    max="10000"
                    step="0.1"
                    className="h-12 text-base border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="unit" className="text-base font-medium text-amber-700">Unit</Label>
                  <Select value={landUnit} onValueChange={setLandUnit}>
                    <SelectTrigger className="h-12 text-base border-amber-300 focus:border-amber-500 focus:ring-amber-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-amber-200">
                      <SelectItem value="acres" className="text-base py-3 hover:bg-amber-50">Acres</SelectItem>
                      <SelectItem value="hectares" className="text-base py-3 hover:bg-amber-50">Hectares</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Sowing Time Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-amber-800">
                <Calendar className="h-5 w-5 text-green-600" />
                Sowing Details
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sowingMonth" className="text-base font-medium text-amber-700">Month to Sow Seed *</Label>
                <Select value={sowingMonth} onValueChange={setSowingMonth}>
                  <SelectTrigger className="h-12 text-base border-amber-300 focus:border-amber-500 focus:ring-amber-500">
                    <SelectValue placeholder="Select sowing month" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-amber-200">
                    <SelectItem value="january" className="text-base py-3 hover:bg-amber-50">January</SelectItem>
                    <SelectItem value="february" className="text-base py-3 hover:bg-amber-50">February</SelectItem>
                    <SelectItem value="march" className="text-base py-3 hover:bg-amber-50">March</SelectItem>
                    <SelectItem value="april" className="text-base py-3 hover:bg-amber-50">April</SelectItem>
                    <SelectItem value="may" className="text-base py-3 hover:bg-amber-50">May</SelectItem>
                    <SelectItem value="june" className="text-base py-3 hover:bg-amber-50">June</SelectItem>
                    <SelectItem value="july" className="text-base py-3 hover:bg-amber-50">July</SelectItem>
                    <SelectItem value="august" className="text-base py-3 hover:bg-amber-50">August</SelectItem>
                    <SelectItem value="september" className="text-base py-3 hover:bg-amber-50">September</SelectItem>
                    <SelectItem value="october" className="text-base py-3 hover:bg-amber-50">October</SelectItem>
                    <SelectItem value="november" className="text-base py-3 hover:bg-amber-50">November</SelectItem>
                    <SelectItem value="december" className="text-base py-3 hover:bg-amber-50">December</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-amber-600 mt-1">
                  This helps us predict rainfall and weather conditions for optimal crop planning
                </p>
              </div>
            </div>

            {/* Water Backup Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-amber-800">
                <Droplets className="h-5 w-5 text-blue-600" />
                Water Availability
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg border border-blue-200">
                <div>
                  <Label htmlFor="water-backup" className="text-base font-medium text-amber-700">
                    Do you have water backup/irrigation?
                  </Label>
                  <p className="text-sm text-amber-600 mt-1">
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
              <div className="flex items-center gap-2 text-lg font-semibold text-amber-800">
                <Wheat className="h-5 w-5 text-green-600" />
                Crop History
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="previousCrop" className="text-base font-medium text-amber-700">Previous Crop Grown *</Label>
                <Select value={previousCrop} onValueChange={setPreviousCrop}>
                  <SelectTrigger className="h-12 text-base border-amber-300 focus:border-amber-500 focus:ring-amber-500">
                    <SelectValue placeholder="Select previous crop" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-amber-200">
                    {crops.map((crop) => (
                      <SelectItem key={crop} value={crop} className="text-base py-3 hover:bg-amber-50">
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
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Get Crop Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}