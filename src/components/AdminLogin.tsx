import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gavel, User, Lock, ArrowRight, ShoppingCart, Users, BarChart3, TrendingUp, Eye, EyeOff, DollarSign, MapPin } from "lucide-react";

interface MarketplaceLoginProps {
  onLogin: (credentials: { username: string; password: string }) => void;
  onBack: () => void;
}

const MarketplaceLogin = ({ onLogin, onBack }: MarketplaceLoginProps) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      onLogin(credentials);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Agricultural Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b0a_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b0a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      {/* Floating Agricultural Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-32 w-40 h-40 bg-gradient-to-r from-green-500/20 to-orange-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-600 via-yellow-600 to-amber-600 rounded-3xl mb-6 shadow-2xl border border-orange-200/20">
              <Gavel className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent mb-3">
              Marketplace
            </h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Trading Platform
            </h2>
            <p className="text-lg text-gray-600">
              Access the agricultural auction marketplace
            </p>
          </div>

          {/* Login Card */}
          <Card className="shadow-2xl border border-orange-200/20 bg-white/90 backdrop-blur-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-3">
                <ShoppingCart className="w-6 h-6 text-orange-500" />
                Marketplace Access
              </CardTitle>
              <div className="flex justify-center mt-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Transparent</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Fair Trading</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>AI-Powered</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="marketplace-username" className="text-sm font-semibold text-gray-700">
                    Buyer/Company Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="marketplace-username"
                      type="text"
                      placeholder="Enter your username"
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                      className="pl-12 h-14 bg-white/80 border-2 border-orange-200 focus:border-orange-400 text-gray-800 placeholder:text-gray-500 rounded-xl"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="marketplace-password" className="text-sm font-semibold text-gray-700">
                    Access Key
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="marketplace-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter marketplace access key"
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-12 pr-12 h-14 bg-white/80 border-2 border-orange-200 focus:border-orange-400 text-gray-800 placeholder:text-gray-500 rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Marketplace Notice */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-orange-600 text-sm">
                    <Gavel className="w-4 h-4" />
                    <span className="font-medium">Marketplace Notice:</span>
                  </div>
                  <p className="text-orange-700/80 text-xs mt-1">
                    All transactions are transparent and monitored for fair trading practices.
                  </p>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-16 text-lg font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 hover:from-orange-500 hover:via-yellow-500 hover:to-amber-500 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl text-white"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Accessing Marketplace...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Gavel className="w-6 h-6" />
                      Enter Marketplace
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Marketplace Features */}
              <div className="pt-6 border-t border-orange-200">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-orange-200">
                      <Gavel className="w-6 h-6 text-orange-500" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">Auctions</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-orange-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-green-200">
                      <ShoppingCart className="w-6 h-6 text-green-500" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">Buying</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-blue-200">
                      <BarChart3 className="w-6 h-6 text-blue-500" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">Analytics</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-purple-200">
                      <TrendingUp className="w-6 h-6 text-purple-500" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">Trends</span>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full h-12 border-2 border-orange-200 hover:bg-orange-50 text-gray-700 hover:text-gray-800 rounded-xl"
              >
                Back to Home
              </Button>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <button
                onClick={() => window.location.href = '/marketplace-signup'}
                className="text-orange-500 hover:underline font-semibold"
              >
                Sign up here
              </button>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Powered by <span className="font-semibold text-orange-500">AI-driven marketplace</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceLogin;