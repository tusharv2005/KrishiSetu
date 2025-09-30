import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout, User, Lock, ArrowRight, Leaf, Sun, Droplets, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";

interface FarmerSignupProps {
  onBack: () => void;
}

const FarmerSignup = ({ onBack }: FarmerSignupProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    fullName: "",
    phone: "",
    location: "",
    state: "",
    district: "",
    farmSize: "",
    primaryCrops: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    // Simulate account creation
    setTimeout(() => {
      alert("Account created successfully! You can now login.");
      window.location.href = '/farmer-login';
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
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
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-success rounded-3xl mb-6 shadow-2xl">
              <Sprout className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">
              Join as a Farmer
            </h1>
            <p className="text-lg text-gray-600">
              Start your smart farming journey with us
            </p>
          </div>

          {/* Signup Card */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-3">
                <Leaf className="w-6 h-6 text-primary" />
                Farmer Registration
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-12 h-12 bg-white/50 border-2 border-gray-200 focus:border-primary rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  {/* Username Field */}
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-semibold text-gray-700">
                      Username
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="pl-12 h-12 bg-white/50 border-2 border-gray-200 focus:border-primary rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="pl-12 h-12 bg-white/50 border-2 border-gray-200 focus:border-primary rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-12 h-12 bg-white/50 border-2 border-gray-200 focus:border-primary rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  {/* Location Field */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
                      Village/Town
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="location"
                        type="text"
                        placeholder="Enter your village/town"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="pl-12 h-12 bg-white/50 border-2 border-gray-200 focus:border-primary rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  {/* State Field */}
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-semibold text-gray-700">
                      State
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="state"
                        type="text"
                        placeholder="Enter your state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="pl-12 h-12 bg-white/50 border-2 border-gray-200 focus:border-primary rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  {/* District Field */}
                  <div className="space-y-2">
                    <Label htmlFor="district" className="text-sm font-semibold text-gray-700">
                      District
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="district"
                        type="text"
                        placeholder="Enter your district"
                        value={formData.district}
                        onChange={(e) => handleInputChange('district', e.target.value)}
                        className="pl-12 h-12 bg-white/50 border-2 border-gray-200 focus:border-primary rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  {/* Farm Size Field */}
                  <div className="space-y-2">
                    <Label htmlFor="farmSize" className="text-sm font-semibold text-gray-700">
                      Farm Size (acres)
                    </Label>
                    <div className="relative">
                      <Sprout className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="farmSize"
                        type="number"
                        step="0.1"
                        placeholder="Enter farm size in acres"
                        value={formData.farmSize}
                        onChange={(e) => handleInputChange('farmSize', e.target.value)}
                        className="pl-12 h-12 bg-white/50 border-2 border-gray-200 focus:border-primary rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Primary Crops Field */}
                <div className="space-y-2">
                  <Label htmlFor="primaryCrops" className="text-sm font-semibold text-gray-700">
                    Primary Crops (comma separated)
                  </Label>
                  <div className="relative">
                    <Leaf className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="primaryCrops"
                      type="text"
                      placeholder="e.g., Wheat, Rice, Cotton"
                      value={formData.primaryCrops}
                      onChange={(e) => handleInputChange('primaryCrops', e.target.value)}
                      className="pl-12 h-12 bg-white/50 border-2 border-gray-200 focus:border-primary rounded-xl"
                      required
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-12 h-12 bg-white/50 border-2 border-gray-200 focus:border-primary rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="pl-12 h-12 bg-white/50 border-2 border-gray-200 focus:border-primary rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Signup Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-success hover:from-success hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sprout className="w-5 h-5" />
                      Create Farmer Account
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Back Button */}
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full h-12 border-2 hover:bg-gray-50 rounded-xl flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Button>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <button
                onClick={onBack}
                className="text-primary hover:underline font-semibold"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerSignup;