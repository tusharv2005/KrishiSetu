import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FarmerInputForm from "./components/FarmerInputForm";
import RecommendationDashboard from "./components/RecommendationDashboard";
import CultivationPlanner from "./components/CultivationPlanner";

const queryClient = new QueryClient();

type AppView = 'home' | 'input' | 'recommendations' | 'planner';

interface FarmerData {
  state: string;
  district: string;
  landSize: number;
  landUnit: string;
  waterBackup: boolean;
  previousCrop: string;
}

const App = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<number | null>(null);

  const handleInputSubmit = (data: FarmerData) => {
    setFarmerData(data);
    setCurrentView('recommendations');
  };

  const handleCropSelect = (cropId: number) => {
    setSelectedCrop(cropId);
    setCurrentView('planner');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'input':
        return <FarmerInputForm onSubmit={handleInputSubmit} />;
      case 'recommendations':
        return farmerData ? (
          <RecommendationDashboard 
            farmerData={farmerData}
            onBack={() => setCurrentView('input')}
            onSelectCrop={handleCropSelect}
          />
        ) : null;
      case 'planner':
        return farmerData && selectedCrop ? (
          <CultivationPlanner 
            cropId={selectedCrop}
            farmerData={farmerData}
            onBack={() => setCurrentView('recommendations')}
          />
        ) : null;
      default:
        return <Index onStartJourney={() => setCurrentView('input')} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={renderCurrentView()} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
