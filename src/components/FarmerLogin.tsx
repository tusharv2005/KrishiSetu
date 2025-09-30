import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout, User, Lock, ArrowRight, Leaf, Sun, Droplets } from "lucide-react";

interface FarmerLoginProps {
  onLogin: (credentials: { username: string; password: string }) => void;
  onBack: () => void;
}

const FarmerLogin = ({ onLogin, onBack }: FarmerLoginProps) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

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
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-success rounded-3xl mb-6 shadow-2xl">
              <Sprout className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-800 dark:text-white mb-2">
              Welcome Back, Farmer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Continue your smart farming journey
            </p>
          </div>

          {/* Login Card */}
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
                <Leaf className="w-6 h-6 text-primary" />
                Farmer Portal
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                      className="pl-12 h-12 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-primary rounded-xl"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-12 h-12 bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-primary rounded-xl"
                      required
                    />
                  </div>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-success hover:from-success hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing In...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sprout className="w-5 h-5" />
                      Access Farm Dashboard
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Features */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Sun className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Weather</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-success" />
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Irrigation</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Crops</span>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full h-12 border-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl"
              >
                Back to Home
              </Button>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={() => window.location.href = '/farmer-signup'}
                className="text-primary hover:underline font-semibold"
              >
                Sign up here
              </button>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Trusted by <span className="font-semibold text-primary">10,000+</span> farmers worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerLogin;