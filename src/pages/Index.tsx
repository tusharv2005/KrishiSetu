import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, Shield, Leaf, ArrowRight, Settings, Target, TrendingUp, Users, DollarSign, MapPin, Gavel, ShoppingCart, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface IndexProps {
  onFarmerLogin: () => void;
  onMarketplaceLogin: () => void;
}

const Index = ({ onFarmerLogin, onMarketplaceLogin }: IndexProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "hi">("en");
  const navigate = useNavigate();

  const content = {
    en: {
      title: "KrishiSetu: Seeding2Selling ",
      subtitle: "Your Smart Farming Companion",
      description: "Get AI-powered crop recommendations, record yields, and sell directly to buyers through our auction marketplace. Built for Indian farmers.",
      farmerLogin: "Farmer Login",
      marketplaceLogin: "Marketplace Login", 
      marketplaceCaption: "Farmers list yields. Buyers bid. The best price wins — a fair agricultural marketplace.",
      features: {
        advisory: {
          title: "AI Crop Advisory",
          description: "Get personalized crop recommendations based on your soil, location, and budget"
        },
        yield: {
          title: "Yield Management", 
          description: "Record and track your harvest data with AI-powered insights"
        },
        auction: {
          title: "Transparent Marketplace",
          description: "List your produce in our AI-powered auction marketplace and connect with verified buyers"
        }
      },
      stats: {
        farmers: "Farmers Helped",
        revenue: "Revenue Generated", 
        crops: "Crops Supported",
        states: "States Covered"
      }
    },
    hi: {
      title: "स्मार्ट फसल सुझाव प्रणाली", 
      subtitle: "आपका स्मार्ट खेती साथी",
      description: "AI आधारित फसल सुझाव प्राप्त करें, उत्पादन दर्ज करें, और नीलामी बाजार के माध्यम से खरीदारों को सीधे बेचें।",
      farmerLogin: "किसान लॉगिन",
      marketplaceLogin: "बाजार लॉगिन",
      marketplaceCaption: "किसान उत्पादन सूचीबद्ध करते हैं। खरीदार बोली लगाते हैं। सबसे अच्छी कीमत जीतती है — एक निष्पक्ष कृषि बाजार।",
      features: {
        advisory: {
          title: "AI फसल सलाह",
          description: "आपकी मिट्टी, स्थान और बजट के आधार पर व्यक्तिगत फसल सुझाव प्राप्त करें"
        },
        yield: {
          title: "उत्पादन प्रबंधन",
          description: "AI-संचालित अंतर्दृष्टि के साथ अपने फसल डेटा को रिकॉर्ड और ट्रैक करें"
        },
        auction: {
          title: "पारदर्शी बाजार", 
          description: "अपना उत्पादन हमारे AI-संचालित नीलामी बाजार में सूचीबद्ध करें और सत्यापित खरीदारों से जुड़ें"
        }
      },
      stats: {
        farmers: "किसानों की मदद की",
        revenue: "राजस्व उत्पन्न",
        crops: "फसलों का समर्थन", 
        states: "राज्यों में उपलब्ध"
      }
    }
  };

  const t = content[selectedLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
              <img 
                src="/hi.png" 
                alt="KrishiSetu Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedLanguage("en")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedLanguage === "en" 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setSelectedLanguage("hi")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedLanguage === "hi"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Rice Paddy Field Background */}
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='1920' height='1080' viewBox='0 0 1920 1080' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FFE4B5;stop-opacity:1' /%3E%3Cstop offset='30%25' style='stop-color:%23FFD700;stop-opacity:1' /%3E%3Cstop offset='60%25' style='stop-color:%23FFA500;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23E6F3FF;stop-opacity:1' /%3E%3C/linearGradient%3E%3ClinearGradient id='field' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2332CD32;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%23228B22;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23008000;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='url(%23sky)'/%3E%3Cpath d='M0 600 Q 200 500 400 550 T 800 520 T 1200 540 T 1600 530 T 1920 550 L 1920 1080 L 0 1080 Z' fill='url(%23field)'/%3E%3Cpath d='M0 700 Q 300 600 600 650 T 1200 620 T 1800 640 T 1920 650 L 1920 1080 L 0 1080 Z' fill='%23155A00' opacity='0.8'/%3E%3Cpath d='M0 800 Q 400 700 800 750 T 1600 720 T 1920 740 L 1920 1080 L 0 1080 Z' fill='%230F4A00' opacity='0.6'/%3E%3Ccircle cx='300' cy='200' r='80' fill='%23FFD700' opacity='0.6'/%3E%3Ccircle cx='800' cy='150' r='60' fill='%23FFA500' opacity='0.7'/%3E%3Ccircle cx='1400' cy='180' r='70' fill='%23FFD700' opacity='0.5'/%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/40"></div>
          
          {/* Subtle Marketplace Illustrations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Farmer with crops illustration */}
            <div className="absolute top-1/4 left-1/4 w-16 h-16 text-green-300/30 animate-gentle-float">
              <div className="w-full h-full bg-green-200/20 rounded-full flex items-center justify-center">
                <Sprout className="w-8 h-8" />
              </div>
            </div>
            
            {/* Auction gavel illustration */}
            <div className="absolute top-1/3 right-1/4 w-14 h-14 text-orange-300/30 animate-gentle-float" style={{ animationDelay: '2s' }}>
              <div className="w-full h-full bg-orange-200/20 rounded-full flex items-center justify-center">
                <Gavel className="w-7 h-7" />
              </div>
            </div>
            
            {/* Shopping cart illustration */}
            <div className="absolute bottom-1/3 left-1/3 w-12 h-12 text-blue-300/30 animate-gentle-float" style={{ animationDelay: '4s' }}>
              <div className="w-full h-full bg-blue-200/20 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6" />
              </div>
            </div>
            
            {/* Bar chart for analytics */}
            <div className="absolute bottom-1/4 right-1/3 w-10 h-10 text-purple-300/30 animate-gentle-float" style={{ animationDelay: '1s' }}>
              <div className="w-full h-full bg-purple-200/20 rounded-full flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-green-600 font-semibold mb-4">
              {t.subtitle}
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              {t.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                onClick={() => navigate('/farmer-login')}
                className="group w-full sm:w-auto h-16 px-8 text-lg font-bold text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
                }}
              >
                <div className="flex items-center space-x-3">
                  <img 
                    src="/main-logo-crop.png" 
                    alt="KrishiSetu Logo" 
                    className="w-20 h-20 rounded-sm object-cover group-hover:scale-110 transition-transform"
                  />
                  <span>{t.farmerLogin}</span>
                </div>
              </Button>
              <Button 
                onClick={() => navigate('/marketplace-login')}
                className="group w-full sm:w-auto h-16 px-8 text-lg font-bold text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                }}
              >
                <div className="flex items-center space-x-3">
                  <img 
                    src="/market-logo-removebg-preview.png" 
                    alt="Marketplace Logo" 
                    className="w-20 h-20 rounded-sm object-cover group-hover:scale-110 transition-transform"
                  />
                  <span>{t.marketplaceLogin}</span>
                </div>
              </Button>
            </div>
            
            {/* Marketplace Caption */}
            <div className="mt-8 max-w-2xl mx-auto">
              <p className="text-lg text-gray-600 font-medium italic text-center">
                {t.marketplaceCaption}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "10,000+", label: t.stats.farmers },
              { icon: DollarSign, value: "₹50L+", label: t.stats.revenue },
              { icon: Sprout, value: "25+", label: t.stats.crops },
              { icon: MapPin, value: "15+", label: t.stats.states }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-fade-in">
                <stat.icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Farming Solution
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From planning to selling - we support you at every step of your farming journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: t.features.advisory.title,
                description: t.features.advisory.description,
                action: t.farmerLogin,
                variant: "default" as const,
                color: "from-green-500 to-green-600"
              },
              {
                icon: BarChart3,
                title: t.features.yield.title, 
                description: t.features.yield.description,
                action: t.farmerLogin,
                variant: "secondary" as const,
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Gavel,
                title: t.features.auction.title,
                description: t.features.auction.description, 
                action: t.marketplaceLogin,
                variant: "default" as const,
                color: "from-orange-500 to-orange-600"
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:scale-105 transition-transform duration-300 animate-fade-in border-2 hover:border-green-200">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-6 text-gray-600">
                    {feature.description}
                  </CardDescription>
                  <Button 
                    onClick={feature.action === t.farmerLogin ? () => navigate('/farmer-login') : () => navigate('/marketplace-login')}
                    variant={feature.variant} 
                    className="w-full h-12 font-semibold"
                    style={feature.action === t.marketplaceLogin ? {
                      background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                      color: 'white'
                    } : {}}
                  >
                    {feature.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-green-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of farmers and buyers who are already using our AI-powered platform for fair, transparent agricultural trading
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/farmer-login')}
              className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg flex items-center space-x-2"
            >
              <Sprout className="w-5 h-5" />
              <span>Start Farming Smart</span>
            </Button>
            <Button 
              onClick={() => navigate('/marketplace-login')}
              variant="outline" 
              className="border-white text-orange-500 hover:bg-white hover:text-green-600 font-bold px-8 py-4 text-lg flex items-center space-x-2"
            >
              <Gavel className="w-5 h-5" />
              <span>Enter Marketplace</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Sprout className="h-6 w-6 text-green-600" />
              <span className="text-lg font-semibold">{t.title}</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/team')}
                className="flex items-center gap-2 text-gray-600 hover:text-green-600"
              >
                <Users className="w-4 h-4" />
                Meet Our Team
              </Button>
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-600">
                  Built for Indian Farmers | MSP Reference Available
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Platform does not guarantee MSP procurement. Private trades may vary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;