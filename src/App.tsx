import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// Removed Supabase AuthProvider
import Index from "./pages/Index";
import TestPage from "./pages/TestPage";
import RainfallDemo from "./pages/RainfallDemo";
import RainfallForecast from "./pages/RainfallForecast";
import NotFound from "./pages/NotFound";
import FarmerInputForm from "./components/FarmerInputForm";
import RecommendationDashboard from "./components/RecommendationDashboard";
import CultivationPlanner from "./components/CultivationPlanner";
import FarmerLogin from "./components/FarmerLogin";
import FarmerSignup from "./components/FarmerSignup";
import FarmerChoicePage from "./components/FarmerChoicePage";
import CropAdvisoryOptionsPage from "./components/CropAdvisoryOptionsPage";
import PreviousAdvisoryPage from "./components/PreviousAdvisoryPage";
import CreateLotPage from "./components/CreateLotPage";
import MarketplaceLogin from "./components/AdminLogin";
import MarketplaceSignup from "./components/MarketplaceSignup";
import MarketplaceDashboard from "./components/AdminDashboard";
import FarmerDashboard from "./components/FarmerDashboard";

const queryClient = new QueryClient();

type AppView = 'home' | 'farmer-login' | 'farmer-choice' | 'create-lot' | 'admin-login' | 'farmer-dashboard' | 'admin-dashboard' | 'input' | 'recommendations' | 'planner';
type UserRole = 'farmer' | 'admin' | null;

interface FarmerData {
  state: string;
  district: string;
  landSize: number;
  landUnit: string;
  waterBackup: boolean;
  previousCrop: string;
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

interface User {
  username: string;
  role: UserRole;
}

const App = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user from localStorage if available
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<number | null>(null);
  const [lotData, setLotData] = useState<LotData | null>(null);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const handleFarmerLogin = (credentials: { username: string; password: string }) => {
    // Simple authentication - in real app, this would be API call
    setUser({ username: credentials.username, role: 'farmer' });
    window.location.href = '/farmer-choice';
  };

  const handleMarketplaceLogin = (credentials: { username: string; password: string }) => {
    // Simple authentication - in real app, this would be API call
    setUser({ username: credentials.username, role: 'admin' });
    // Navigate immediately after setting user
    window.location.href = '/marketplace-dashboard';
  };

  const handleLogout = () => {
    setUser(null);
    setFarmerData(null);
    setSelectedCrop(null);
    setCurrentView('home');
    // Navigate to home page
    window.location.href = '/';
  };

  const handleInputSubmit = (data: FarmerData) => {
    setFarmerData(data);
    // Save the farmer data for generating recommendations
    localStorage.setItem('currentFarmerData', JSON.stringify(data));
    // Navigate to recommendations page
    window.location.href = '/recommendations';
  };

  // Load farmer data from localStorage on app start
  useEffect(() => {
    const savedFarmerData = localStorage.getItem('currentFarmerData');
    if (savedFarmerData && !farmerData) {
      setFarmerData(JSON.parse(savedFarmerData));
    }
  }, []);

  const handleCropSelect = (cropId: number) => {
    setSelectedCrop(cropId);
    // Navigate to planner page
    window.location.href = '/planner';
  };

  const handleLotSubmit = (data: LotData) => {
    setLotData(data);
    // In a real app, this would submit to the marketplace
    alert('Lot created successfully! Your produce is now listed for auction.');
    window.location.href = '/farmer-choice';
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'farmer-login':
        return (
          <FarmerLogin 
            onLogin={handleFarmerLogin}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'farmer-choice':
        return user?.role === 'farmer' ? (
          <FarmerChoicePage
            onAdvisoryChoice={() => window.location.href = '/farmer-input'}
            onSellChoice={() => window.location.href = '/create-lot'}
            onBack={() => setCurrentView('farmer-login')}
            farmerName={user.username}
          />
        ) : (
          <Index 
            onFarmerLogin={() => setCurrentView('farmer-login')}
            onMarketplaceLogin={() => setCurrentView('admin-login')}
          />
        );
      case 'create-lot':
        return user?.role === 'farmer' ? (
          <CreateLotPage
            onBack={() => window.location.href = '/farmer-choice'}
            onSubmit={handleLotSubmit}
          />
        ) : (
          <Index 
            onFarmerLogin={() => setCurrentView('farmer-login')}
            onMarketplaceLogin={() => setCurrentView('admin-login')}
          />
        );
      case 'admin-login':
        return (
          <MarketplaceLogin 
            onLogin={handleMarketplaceLogin}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'admin-dashboard':
        return user?.role === 'admin' ? (
          <MarketplaceDashboard onLogout={handleLogout} />
        ) : (
          <Index 
            onFarmerLogin={() => setCurrentView('farmer-login')}
            onMarketplaceLogin={() => setCurrentView('admin-login')}
          />
        );
      case 'input':
        return user?.role === 'farmer' ? (
          <FarmerInputForm onSubmit={handleInputSubmit} />
        ) : (
          <Index 
            onFarmerLogin={() => setCurrentView('farmer-login')}
            onMarketplaceLogin={() => setCurrentView('admin-login')}
          />
        );
      case 'recommendations':
        return user?.role === 'farmer' && farmerData ? (
          <RecommendationDashboard 
            farmerData={farmerData}
            onBack={() => setCurrentView('input')}
            onSelectCrop={handleCropSelect}
          />
        ) : (
          <Index 
            onFarmerLogin={() => setCurrentView('farmer-login')}
            onMarketplaceLogin={() => setCurrentView('admin-login')}
          />
        );
      case 'planner':
        return user?.role === 'farmer' && farmerData && selectedCrop ? (
          <CultivationPlanner 
            cropId={selectedCrop}
            farmerData={farmerData}
            onBack={() => setCurrentView('recommendations')}
          />
        ) : (
          <Index 
            onFarmerLogin={() => setCurrentView('farmer-login')}
            onMarketplaceLogin={() => setCurrentView('admin-login')}
          />
        );
      default:
        return (
          <Index 
            onFarmerLogin={() => setCurrentView('farmer-login')}
            onMarketplaceLogin={() => setCurrentView('admin-login')}
          />
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index 
              onFarmerLogin={() => window.location.href = '/farmer-login'}
              onMarketplaceLogin={() => window.location.href = '/marketplace-login'}
            />} />
            <Route path="/farmer-login" element={<FarmerLogin 
              onLogin={handleFarmerLogin}
              onBack={() => window.location.href = '/'}
            />} />
            <Route path="/farmer-signup" element={<FarmerSignup 
              onBack={() => window.location.href = '/farmer-login'}
            />} />
            <Route path="/farmer-choice" element={user?.role === 'farmer' ? (
              <FarmerChoicePage
                onAdvisoryChoice={() => window.location.href = '/crop-advisory-options'}
                onSellChoice={() => window.location.href = '/create-lot'}
                onBack={() => window.location.href = '/farmer-login'}
                farmerName={user.username}
              />
            ) : (
              <Index 
                onFarmerLogin={() => window.location.href = '/farmer-login'}
                onMarketplaceLogin={() => window.location.href = '/marketplace-login'}
              />
            )} />
            <Route path="/crop-advisory-options" element={user?.role === 'farmer' ? (
              <CropAdvisoryOptionsPage
                onViewPrevious={() => window.location.href = '/previous-advisory'}
                onGetNewAdvisory={() => window.location.href = '/farmer-input'}
                onBack={() => window.location.href = '/farmer-choice'}
                farmerName={user.username}
              />
            ) : (
              <Index 
                onFarmerLogin={() => window.location.href = '/farmer-login'}
                onMarketplaceLogin={() => window.location.href = '/marketplace-login'}
              />
            )} />
            <Route path="/previous-advisory" element={user?.role === 'farmer' ? (
              <PreviousAdvisoryPage
                onBack={() => window.location.href = '/crop-advisory-options'}
                onGetNewAdvisory={() => window.location.href = '/farmer-input'}
                farmerName={user.username}
              />
            ) : (
              <Index 
                onFarmerLogin={() => window.location.href = '/farmer-login'}
                onMarketplaceLogin={() => window.location.href = '/marketplace-login'}
              />
            )} />
            <Route path="/create-lot" element={user?.role === 'farmer' ? (
              <CreateLotPage
                onBack={() => window.location.href = '/farmer-choice'}
                onSubmit={handleLotSubmit}
              />
            ) : (
              <Index 
                onFarmerLogin={() => window.location.href = '/farmer-login'}
                onMarketplaceLogin={() => window.location.href = '/marketplace-login'}
              />
            )} />
            <Route path="/marketplace-login" element={<MarketplaceLogin 
              onLogin={handleMarketplaceLogin}
              onBack={() => window.location.href = '/'}
            />} />
            <Route path="/marketplace-signup" element={<MarketplaceSignup 
              onBack={() => window.location.href = '/marketplace-login'}
            />} />
            <Route path="/marketplace-dashboard" element={<MarketplaceDashboard onLogout={handleLogout} />} />
            <Route path="/farmer-dashboard" element={<FarmerDashboard onLogout={handleLogout} />} />
            <Route path="/farmer-input" element={user?.role === 'farmer' ? (
              <FarmerInputForm onSubmit={handleInputSubmit} />
            ) : (
              <Index 
                onFarmerLogin={() => window.location.href = '/farmer-login'}
                onMarketplaceLogin={() => window.location.href = '/marketplace-login'}
              />
            )} />
            <Route path="/recommendations" element={
              <RecommendationDashboard 
                farmerData={farmerData || (() => {
                  const saved = localStorage.getItem('currentFarmerData');
                  return saved ? JSON.parse(saved) : {
                    state: "Maharashtra",
                    district: "Aurangabad", 
                    landSize: 10,
                    landUnit: "acres",
                    waterBackup: true,
                    previousCrop: "Cotton"
                  };
                })()}
                onBack={() => window.location.href = '/farmer-input'}
                onSelectCrop={handleCropSelect}
              />
            } />
            <Route path="/planner" element={
              <CultivationPlanner 
                cropId={selectedCrop || 1}
                farmerData={farmerData || (() => {
                  const saved = localStorage.getItem('currentFarmerData');
                  return saved ? JSON.parse(saved) : {
                    state: "Maharashtra",
                    district: "Aurangabad", 
                    landSize: 10,
                    landUnit: "acres",
                    waterBackup: true,
                    previousCrop: "Cotton"
                  };
                })()}
                onBack={() => window.location.href = '/recommendations'}
              />
            } />
            <Route path="/test" element={<TestPage />} />
            <Route path="/rainfall-demo" element={<RainfallDemo />} />
            <Route path="/rainfall-forecast" element={<RainfallForecast />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
