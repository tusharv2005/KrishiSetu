import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, User, MapPin, Phone, Mail, Calendar, TrendingUp, DollarSign, Package, LogOut, Plus, Eye, Leaf, BarChart3 } from "lucide-react";

interface FarmerDashboardProps {
  onLogout: () => void;
}

const FarmerDashboard = ({ onLogout }: FarmerDashboardProps) => {
  // Mock data for demonstration
  const mockFarmerData = {
    full_name: "Rajesh Kumar",
    email: "rajesh@farmer.com",
    username: "rajesh_farmer",
    phone: "+91 98765 43210",
    location: "Karnal",
    state: "Haryana",
    district: "Karnal",
    farm_size: 15.5,
    primary_crops: ["Wheat", "Rice", "Cotton"]
  };

  const mockAdvisories = [
    {
      id: "1",
      crop_name: "Wheat",
      advisory_type: "Planting",
      message: "Optimal planting time is between Nov 15-30. Use certified seeds.",
      created_at: new Date().toISOString()
    },
    {
      id: "2", 
      crop_name: "Rice",
      advisory_type: "Irrigation",
      message: "Maintain 5-7cm water depth during tillering stage.",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  const mockYieldRecords = [
    {
      id: "1",
      crop_name: "Wheat",
      variety: "HD-2967",
      yield_per_acre: 45,
      total_yield: 675,
      season: "Rabi 2024",
      created_at: new Date().toISOString()
    },
    {
      id: "2",
      crop_name: "Rice", 
      variety: "Pusa Basmati",
      yield_per_acre: 35,
      total_yield: 525,
      season: "Kharif 2024",
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  const mockAuctionLots = [
    {
      id: "1",
      crop_name: "Premium Wheat",
      variety: "HD-2967",
      quantity: 50,
      unit: "quintals",
      base_price: 2200,
      current_bid: 2350,
      status: "active",
      end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "2",
      crop_name: "Basmati Rice",
      variety: "Pusa Basmati",
      quantity: 30,
      unit: "quintals", 
      base_price: 2800,
      current_bid: 2950,
      status: "active",
      end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Farmer Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {mockFarmerData.full_name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{mockFarmerData.email}</span>
              <Button onClick={onLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Hello, {mockFarmerData.full_name}! 👋
          </h2>
          <p className="text-gray-600">
            Manage your farm operations and get personalized crop recommendations.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Farm Size</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockFarmerData.farm_size} acres</div>
              <p className="text-xs text-muted-foreground">
                {mockFarmerData.location}, {mockFarmerData.state}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Primary Crops</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockFarmerData.primary_crops.length}</div>
              <p className="text-xs text-muted-foreground">
                {mockFarmerData.primary_crops.join(', ')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockFarmerData.phone}</div>
              <p className="text-xs text-muted-foreground">
                {mockFarmerData.district}, {mockFarmerData.state}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button 
            onClick={() => window.location.href = '/farmer-input'} 
            className="h-20 flex flex-col items-center justify-center space-y-2"
          >
            <Plus className="w-6 h-6" />
            <span>Get Crop Advisory</span>
          </Button>

          <Button 
            onClick={() => window.location.href = '/create-lot'} 
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2"
          >
            <Package className="w-6 h-6" />
            <span>Create Auction Lot</span>
          </Button>

          <Button 
            onClick={() => window.location.href = '/previous-advisory'} 
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2"
          >
            <BarChart3 className="w-6 h-6" />
            <span>View Previous Advisories</span>
          </Button>

          <Button 
            onClick={() => window.location.href = '/farmer-input'} 
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2"
          >
            <Leaf className="w-6 h-6" />
            <span>Record Yield</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Advisories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="w-5 h-5" />
                Recent Crop Advisories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAdvisories.map((advisory) => (
                <div key={advisory.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{advisory.crop_name}</h4>
                    <Badge variant="secondary">{advisory.advisory_type}</Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{advisory.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(advisory.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Yield Records */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recent Yield Records
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockYieldRecords.map((record) => (
                <div key={record.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{record.crop_name}</h4>
                    <Badge variant="outline">{record.season}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Variety:</span>
                      <span className="ml-2 font-medium">{record.variety}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Yield/Acre:</span>
                      <span className="ml-2 font-medium">{record.yield_per_acre} quintals</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Yield:</span>
                      <span className="ml-2 font-medium">{record.total_yield} quintals</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Date:</span>
                      <span className="ml-2 font-medium">
                        {new Date(record.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* My Auction Lots */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              My Auction Lots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockAuctionLots.map((lot) => (
                <div key={lot.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{lot.crop_name}</h4>
                      <p className="text-sm text-gray-600">{lot.variety}</p>
                    </div>
                    <Badge className={lot.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                      {lot.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-600">Quantity:</span>
                      <span className="ml-2 font-medium">{lot.quantity} {lot.unit}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Base Price:</span>
                      <span className="ml-2 font-medium">₹{lot.base_price}/{lot.unit}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Current Bid:</span>
                      <span className="ml-2 font-medium text-green-600">₹{lot.current_bid}/{lot.unit}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Ends:</span>
                      <span className="ml-2 font-medium">
                        {new Date(lot.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Update Lot
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <p className="text-gray-900">{mockFarmerData.full_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{mockFarmerData.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Username</label>
                <p className="text-gray-900">{mockFarmerData.username}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <p className="text-gray-900">{mockFarmerData.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <p className="text-gray-900">{mockFarmerData.location}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Farm Size</label>
                <p className="text-gray-900">{mockFarmerData.farm_size} acres</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default FarmerDashboard