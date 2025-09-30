import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gavel, User, Lock, ArrowRight, ShoppingCart, Mail, Phone, MapPin, Building, ArrowLeft } from "lucide-react";

interface MarketplaceSignupProps {
  onBack: () => void;
}

const MarketplaceSignup = ({ onBack }: MarketplaceSignupProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    contactPerson: "",
    phone: "",
    location: "",
    businessType: "",
    licenseNumber: ""
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

    if (!formData.businessType) {
      alert("Please select a business type");
      setIsLoading(false);
      return;
    }

    // Simulate account creation
    setTimeout(() => {
      alert("Marketplace account created successfully! You can now login.");
      window.location.href = '/marketplace-login';
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-600 via-yellow-600 to-amber-600 rounded-3xl mb-6 shadow-2xl border border-orange-200/20">
              <Gavel className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent mb-3">
              Join Marketplace
            </h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Business Registration
            </h2>
            <p className="text-lg text-gray-600">
              Access the agricultural auction marketplace
            </p>
          </div>

          {/* Signup Card */}
          <Card className="shadow-2xl border border-orange-200/20 bg-white/90 backdrop-blur-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-3">
                <ShoppingCart className="w-6 h-6 text-orange-500" />
                Marketplace Registration
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Business Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="business@company.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-12 h-14 bg-white/80 border-2 border-orange-200 focus:border-orange-400 text-gray-800 placeholder:text-gray-500 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  {/* Company Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-sm font-semibold text-gray-700">
                      Company Name
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="companyName"
                        type="text"
                        placeholder="Enter company name"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="pl-12 h-14 bg-white/80 border-2 border-orange-200 focus:border-orange-400 text-gray-800 placeholder:text-gray-500 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  {/* Contact Person Field */}
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson" className="text-sm font-semibold text-gray-700">
                      Contact Person
                    </Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="contactPerson"
                        type="text"
                        placeholder="Enter contact person name"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                        className="pl-12 h-14 bg-white/80 border-2 border-orange-200 focus:border-orange-400 text-gray-800 placeholder:text-gray-500 rounded-xl"
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
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-12 h-14 bg-white/80 border-2 border-orange-200 focus:border-orange-400 text-gray-800 placeholder:text-gray-500 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  {/* Location Field */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
                      Business Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="location"
                        type="text"
                        placeholder="Enter business location"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="pl-12 h-14 bg-white/80 border-2 border-orange-200 focus:border-orange-400 text-gray-800 placeholder:text-gray-500 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  {/* Business Type Field */}
                  <div className="space-y-2">
                    <Label htmlFor="businessType" className="text-sm font-semibold text-gray-700">
                      Business Type
                    </Label>
                    <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                      <SelectTrigger className="h-14 bg-white/80 border-2 border-orange-200 focus:border-orange-400 text-gray-800 rounded-xl">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buyer">Buyer</SelectItem>
                        <SelectItem value="trader">Trader</SelectItem>
                        <SelectItem value="processor">Processor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* License Number Field */}
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber" className="text-sm font-semibold text-gray-700">
                    License Number (Optional)
                  </Label>
                  <div className="relative">
                    <Gavel className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="licenseNumber"
                      type="text"
                      placeholder="Enter license number if available"
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      className="pl-12 h-14 bg-white/80 border-2 border-orange-200 focus:border-orange-400 text-gray-800 placeholder:text-gray-500 rounded-xl"
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
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-12 h-14 bg-white/80 border-2 border-orange-200 focus:border-orange-400 text-gray-800 placeholder:text-gray-500 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="pl-12 h-14 bg-white/80 border-2 border-orange-200 focus:border-orange-400 text-gray-800 placeholder:text-gray-500 rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Marketplace Notice */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-orange-600 text-sm">
                    <Gavel className="w-4 h-4" />
                    <span className="font-medium">Marketplace Notice:</span>
                  </div>
                  <p className="text-orange-700/80 text-xs mt-1">
                    All transactions are transparent and monitored for fair trading practices. Your business information will be verified before marketplace access.
                  </p>
                </div>

                {/* Signup Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-16 text-lg font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 hover:from-orange-500 hover:via-yellow-500 hover:to-amber-500 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl text-white"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Gavel className="w-6 h-6" />
                      Create Marketplace Account
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Back Button */}
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full h-12 border-2 border-orange-200 hover:bg-orange-50 text-gray-700 hover:text-gray-800 rounded-xl flex items-center gap-2"
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
                className="text-orange-500 hover:underline font-semibold"
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

export default MarketplaceSignup;