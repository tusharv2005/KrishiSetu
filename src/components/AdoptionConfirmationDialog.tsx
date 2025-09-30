import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Calendar, 
  Bell, 
  TrendingUp,
  Target,
  Leaf,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface AdoptionConfirmationDialogProps {
  cropName: string;
  farmerData: {
    state: string;
    district: string;
    landSize: number;
    landUnit: string;
  };
  onAdopt: () => void;
  onModify: () => void;
}

const AdoptionConfirmationDialog = ({ 
  cropName, 
  farmerData, 
  onAdopt, 
  onModify 
}: AdoptionConfirmationDialogProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAdopt = () => {
    // Save the adopted plan to localStorage as previous recommendation
    const adoptedPlan = {
      id: Date.now(),
      cropName,
      variety: "Recommended Variety",
      sowingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      expectedYield: "High",
      confidence: 95,
      reasons: ["Adopted Plan", "Optimized for your land", "Weather-based recommendations"],
      soilType: "Clay Loam",
      waterRequirement: "Moderate",
      marketPrice: "₹2,850/quintal",
      farmerData,
      adoptedAt: new Date().toISOString(),
      status: 'active'
    };
    
    // Save to both adoptedPlans and farmerAdvisoryData for compatibility
    const existingPlans = JSON.parse(localStorage.getItem('adoptedPlans') || '[]');
    existingPlans.push(adoptedPlan);
    localStorage.setItem('adoptedPlans', JSON.stringify(existingPlans));
    
    // Also save to farmerAdvisoryData so it shows up in previous recommendations
    const existingAdvisory = JSON.parse(localStorage.getItem('farmerAdvisoryData') || '[]');
    const advisoryEntry = {
      id: adoptedPlan.id,
      cropName: adoptedPlan.cropName,
      variety: adoptedPlan.variety,
      sowingDate: adoptedPlan.sowingDate,
      expectedYield: adoptedPlan.expectedYield,
      confidence: adoptedPlan.confidence,
      reasons: adoptedPlan.reasons,
      soilType: adoptedPlan.soilType,
      waterRequirement: adoptedPlan.waterRequirement,
      marketPrice: adoptedPlan.marketPrice
    };
    
    // Replace existing advisory with the adopted plan
    localStorage.setItem('farmerAdvisoryData', JSON.stringify([advisoryEntry]));
    
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <Card className="shadow-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-amber-800">
            Plan Adopted Successfully! 🎉
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-lg text-amber-700">
            Confirmed! Your advisory for <strong>{cropName}</strong> is now active and has been stored.
          </p>
          <p className="text-base text-amber-600">
            You can access the full details whenever you need them in your 'View Previous Crop Advisory' log. 
            Look out for my first reminder soon!
          </p>
          
          <div className="bg-amber-100 p-4 rounded-lg border border-amber-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-amber-800">Reminders Scheduled</span>
            </div>
            <div className="text-sm text-amber-700 space-y-1">
              <div>• Soil preparation: 3 days</div>
              <div>• Sowing reminder: 7 days</div>
              <div>• First irrigation: 14 days</div>
            </div>
          </div>
          
          <Button 
            onClick={() => window.location.href = '/farmer-choice'}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white font-bold py-3"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Return to Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Target className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-amber-800">
          Here is your customized advisory for {cropName}
        </CardTitle>
        <p className="text-lg text-amber-600">
          Optimized for the upcoming season in {farmerData.district}, {farmerData.state}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">
            Ready to put this plan into action?
          </p>
          <p className="text-base text-gray-600">
            Adopting this plan will save the complete schedule—from soil preparation to harvest—to your profile. 
            This will also allow me to send you timely reminders for irrigation, fertilization, and pest control.
          </p>
        </div>

        {/* Plan Summary */}
        <div className="bg-white/50 p-4 rounded-lg border border-amber-200">
          <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
            <Leaf className="w-5 h-5" />
            Your {cropName} Plan Summary
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span className="text-gray-700">Land Size:</span>
              <span className="font-semibold">{farmerData.landSize} {farmerData.landUnit}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">Expected Yield:</span>
              <span className="font-semibold">High</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={handleAdopt}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-3 h-12 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            👍 Yes, Adopt this Plan
          </Button>
          
          <Button 
            onClick={onModify}
            variant="outline"
            className="flex-1 border-2 border-amber-300 hover:bg-amber-50 text-amber-700 font-bold py-3 h-12 text-lg transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            🤔 Let's Modify It
          </Button>
        </div>

        {/* Benefits */}
        <div className="bg-amber-100/50 p-4 rounded-lg border border-amber-200">
          <h5 className="font-semibold text-amber-800 mb-2">What happens when you adopt:</h5>
          <div className="space-y-2 text-sm text-amber-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Complete schedule saved to your profile</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Automated reminders for key activities</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Access to detailed plans anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Weather-based activity adjustments</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdoptionConfirmationDialog;
