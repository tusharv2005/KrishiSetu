import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MarketplaceNotificationBell from "./MarketplaceNotificationBell";
import { 
  Gavel, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  LogOut, 
  TrendingUp, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Calendar,
  FileText,
  DollarSign,
  MapPin,
  Sprout,
  Target,
  Clock,
  IndianRupee,
  Eye,
  Hand,
  Building,
  Phone,
  Mail,
  Star,
  Droplets,
  Leaf,
  Shield,
  TrendingDown,
  Zap,
  Truck,
  Package,
  CreditCard,
  FileCheck,
  Camera,
  Download,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";

interface MarketplaceDashboardProps {
  onLogout: () => void;
}

const MarketplaceDashboard = ({ onLogout }: MarketplaceDashboardProps) => {
  // State management for enhanced features
  const [selectedLot, setSelectedLot] = useState<string | null>(null);
  const [showBidTracker, setShowBidTracker] = useState(false);
  const [showQualityLogistics, setShowQualityLogistics] = useState(false);
  const [showContractPayment, setShowContractPayment] = useState(false);
  const [autoBidEnabled, setAutoBidEnabled] = useState<{[key: string]: boolean}>({});
  const [maxBidLimits, setMaxBidLimits] = useState<{[key: string]: number}>({});
  const [userBids, setUserBids] = useState<{[key: string]: number}>({});

  // Enhanced mock data with all required features
  const mockAuctionLots = [
    {
      id: "1",
      crop_name: "Premium Rice",
      quantity: 100,
      unit: "quintals",
      base_price: 2500,
      current_bid: 2650,
      status: "active",
      end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      msp_price: 2040,
      price_trend: [2400, 2450, 2500, 2550, 2600, 2620, 2650], // Last 7 days
      farmer: {
        full_name: "Rajesh Kumar",
        location: "Karnal",
        state: "Haryana",
        district: "Karnal",
        farm_size: 15,
        farm_unit: "acres",
        last_crop: "Wheat",
        water_availability: true,
        irrigation_type: "Tube Well",
        phone: "+91 98765 43210",
        rating: 4.8,
        total_sales: 45
      },
      sustainability_labels: ["Organic Verified", "Good Crop Rotation Practice", "Low Water Crop"],
      quality_metrics: {
        moisture_content: "12.5%",
        protein_content: "8.2%",
        purity: "99.2%",
        test_date: "2024-01-15"
      },
      bid_history: [
        { bidder_id: "B***1", amount: 2500, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { bidder_id: "B***2", amount: 2550, timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000) },
        { bidder_id: "B***3", amount: 2600, timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
        { bidder_id: "B***1", amount: 2650, timestamp: new Date(Date.now() - 30 * 60 * 1000) }
      ],
      logistics: {
        delivery_timeline: "3-5 days",
        freight_estimate: "₹2,500",
        available_providers: ["AgroLogistics", "Farm2Market", "CropCarrier"]
      }
    },
    {
      id: "2",
      crop_name: "Organic Wheat",
      quantity: 75,
      unit: "quintals",
      base_price: 2200,
      current_bid: 2350,
      status: "active",
      end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      msp_price: 2015,
      price_trend: [2100, 2150, 2200, 2250, 2300, 2320, 2350],
      farmer: {
        full_name: "Priya Sharma",
        location: "Ludhiana",
        state: "Punjab",
        district: "Ludhiana",
        farm_size: 22,
        farm_unit: "acres",
        last_crop: "Rice",
        water_availability: true,
        irrigation_type: "Canal + Tube Well",
        phone: "+91 98765 43211",
        rating: 4.9,
        total_sales: 67
      },
      sustainability_labels: ["Organic Verified", "Good Crop Rotation Practice"],
      quality_metrics: {
        moisture_content: "11.8%",
        protein_content: "12.5%",
        purity: "98.9%",
        test_date: "2024-01-14"
      },
      bid_history: [
        { bidder_id: "B***4", amount: 2200, timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },
        { bidder_id: "B***5", amount: 2250, timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000) },
        { bidder_id: "B***6", amount: 2300, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { bidder_id: "B***4", amount: 2350, timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) }
      ],
      logistics: {
        delivery_timeline: "2-4 days",
        freight_estimate: "₹1,800",
        available_providers: ["AgroLogistics", "Farm2Market"]
      }
    },
    {
      id: "3",
      crop_name: "Cotton",
      quantity: 50,
      unit: "bales",
      base_price: 6000,
      current_bid: 6200,
      status: "active",
      end_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      msp_price: 5450,
      price_trend: [5800, 5850, 5900, 5950, 6000, 6100, 6200],
      farmer: {
        full_name: "Amit Patel",
        location: "Ahmedabad",
        state: "Gujarat",
        district: "Ahmedabad",
        farm_size: 18,
        farm_unit: "acres",
        last_crop: "Groundnut",
        water_availability: false,
        irrigation_type: "Rain-fed",
        phone: "+91 98765 43212",
        rating: 4.6,
        total_sales: 32
      },
      sustainability_labels: ["Good Crop Rotation Practice", "Low Water Crop"],
      quality_metrics: {
        moisture_content: "8.2%",
        protein_content: "N/A",
        purity: "99.5%",
        test_date: "2024-01-13"
      },
      bid_history: [
        { bidder_id: "B***7", amount: 6000, timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) },
        { bidder_id: "B***8", amount: 6100, timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },
        { bidder_id: "B***7", amount: 6200, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) }
      ],
      logistics: {
        delivery_timeline: "4-6 days",
        freight_estimate: "₹3,200",
        available_providers: ["CropCarrier", "AgroLogistics"]
      }
    }
  ];

  // Helper functions for enhanced features
  const handleBid = (lotId: string, bidAmount: number) => {
    setUserBids(prev => ({ ...prev, [lotId]: bidAmount }));
    alert(`Bid of ₹${bidAmount} placed successfully for lot ${lotId}!`);
  };

  const toggleAutoBid = (lotId: string) => {
    setAutoBidEnabled(prev => ({ ...prev, [lotId]: !prev[lotId] }));
  };

  const setMaxBidLimit = (lotId: string, limit: number) => {
    setMaxBidLimits(prev => ({ ...prev, [lotId]: limit }));
  };

  const getPriceTrendDirection = (trend: number[]) => {
    const first = trend[0];
    const last = trend[trend.length - 1];
    return last > first ? 'up' : last < first ? 'down' : 'stable';
  };

  const getPriceTrendPercentage = (trend: number[]) => {
    const first = trend[0];
    const last = trend[trend.length - 1];
    return ((last - first) / first * 100).toFixed(1);
  };

  const isHighDemand = (currentBid: number, mspPrice: number) => {
    return currentBid > mspPrice * 1.15; // 15% above MSP
  };

  const getSustainabilityLabelColor = (label: string) => {
    switch (label) {
      case 'Organic Verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'Good Crop Rotation Practice': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Low Water Crop': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        {/* Header */}
        <div className="border-b border-orange-200/20 bg-white/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gradient-to-br from-orange-600 to-yellow-600 rounded-xl">
                  <Gavel className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Marketplace Dashboard</h1>
                  <p className="text-sm text-gray-600">Welcome, AgroCorp Ltd</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MarketplaceNotificationBell userType="admin" />
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="border-orange-200 text-gray-700 hover:bg-orange-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">

        {/* Profile Card */}
        <Card className="mb-8 shadow-lg bg-white/90 border-orange-200/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">admin@agrocorp.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Company</p>
                  <p className="font-medium">AgroCorp Ltd</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Contact Person</p>
                  <p className="font-medium">John Smith</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">Mumbai, Maharashtra</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Gavel className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Business Type</p>
                  <Badge variant="secondary" className="capitalize">
                    Buyer
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 border-orange-200/20 backdrop-blur-xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Auctions</p>
                  <p className="text-3xl font-bold text-gray-800">{mockAuctionLots.length}</p>
                  <p className="text-sm text-green-600">Live auctions</p>
                </div>
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <Gavel className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 border-orange-200/20 backdrop-blur-xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Volume</p>
                  <p className="text-3xl font-bold text-gray-800">
                    ₹{mockAuctionLots.reduce((sum, lot) => sum + (lot.current_bid || lot.base_price) * lot.quantity, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">Current value</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 border-orange-200/20 backdrop-blur-xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unique Crops</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {new Set(mockAuctionLots.map(lot => lot.crop_name)).size}
                  </p>
                  <p className="text-sm text-blue-600">Different varieties</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <ShoppingCart className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 border-orange-200/20 backdrop-blur-xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Quantity</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {mockAuctionLots.reduce((sum, lot) => sum + lot.quantity, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-purple-600">Units available</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Sprout className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Marketplace Status */}
          <Card className="bg-white/90 border-orange-200/20 backdrop-blur-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Marketplace Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-gray-800 font-medium">Auction System</p>
                    <p className="text-sm text-gray-600">All auctions running smoothly</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-gray-800 font-medium">Payment Gateway</p>
                    <p className="text-sm text-gray-600">All transactions processing</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">Healthy</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-gray-800 font-medium">High Demand Alert</p>
                    <p className="text-sm text-gray-600">Rice auctions at peak capacity</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Peak</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/90 border-orange-200/20 backdrop-blur-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm">New auction: Rice - 50 quintals from Haryana</p>
                  <p className="text-gray-500 text-xs">2 minutes ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm">Auction completed: Wheat - ₹2,100/quintal</p>
                  <p className="text-gray-500 text-xs">15 minutes ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm">New buyer registered: AgroCorp Ltd</p>
                  <p className="text-gray-500 text-xs">1 hour ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm">High demand: Corn prices up 15% this week</p>
                  <p className="text-gray-500 text-xs">2 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Active Crop Listings */}
        <Card className="bg-white/90 border-orange-200/20 backdrop-blur-xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <Gavel className="w-5 h-5" />
              Active Crop Listings
            </CardTitle>
            <p className="text-sm text-gray-600">Browse and bid on quality produce from verified farmers</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {mockAuctionLots.map((lot) => (
                <Card key={lot.id} className="border-2 hover:border-orange-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{lot.crop_name}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {lot.farmer.district}, {lot.farmer.state}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className={`${lot.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {lot.status}
                        </Badge>
                        {isHighDemand(lot.current_bid, lot.msp_price) && (
                          <Badge className="bg-red-100 text-red-700 border-red-200">
                            <Zap className="w-3 h-3 mr-1" />
                            High Demand
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Sustainability & Quality Labels */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {lot.sustainability_labels.map((label, index) => (
                        <Badge key={index} className={`text-xs px-2 py-1 border ${getSustainabilityLabelColor(label)}`}>
                          {label === 'Organic Verified' && <Shield className="w-3 h-3 mr-1" />}
                          {label === 'Good Crop Rotation Practice' && <Leaf className="w-3 h-3 mr-1" />}
                          {label === 'Low Water Crop' && <Droplets className="w-3 h-3 mr-1" />}
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Farmer Profile Card */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Farmer Profile
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Name:</span>
                          <span className="font-medium ml-2">{lot.farmer.full_name}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Farm Size:</span>
                          <span className="font-medium ml-2">{lot.farmer.farm_size} {lot.farmer.farm_unit}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Last Crop:</span>
                          <span className="font-medium ml-2">{lot.farmer.last_crop}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Water:</span>
                          <span className={`font-medium ml-2 flex items-center gap-1 ${lot.farmer.water_availability ? 'text-green-600' : 'text-orange-600'}`}>
                            {lot.farmer.water_availability ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                            {lot.farmer.water_availability ? 'Available' : 'Limited'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Rating:</span>
                          <span className="font-medium ml-2 flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            {lot.farmer.rating} ({lot.farmer.total_sales} sales)
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Irrigation:</span>
                          <span className="font-medium ml-2">{lot.farmer.irrigation_type}</span>
                        </div>
                      </div>
                    </div>

                    {/* Profitability Snapshot */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Profitability Snapshot
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">MSP Reference</div>
                          <div className="text-lg font-bold text-blue-600">₹{lot.msp_price}/{lot.unit}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Current Bid</div>
                          <div className="text-lg font-bold text-green-600">₹{lot.current_bid}/{lot.unit}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-sm text-gray-600 mb-2">Price Trend (7 days)</div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-8 bg-gray-100 rounded flex items-end justify-between px-2 py-1">
                              {lot.price_trend.map((price, index) => (
                                <div
                                  key={index}
                                  className="bg-gradient-to-t from-orange-400 to-orange-500 rounded-sm"
                                  style={{
                                    height: `${((price - Math.min(...lot.price_trend)) / (Math.max(...lot.price_trend) - Math.min(...lot.price_trend))) * 100}%`,
                                    width: '8px'
                                  }}
                                />
                              ))}
                            </div>
                            <div className={`text-sm font-medium flex items-center gap-1 ${
                              getPriceTrendDirection(lot.price_trend) === 'up' ? 'text-green-600' : 
                              getPriceTrendDirection(lot.price_trend) === 'down' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {getPriceTrendDirection(lot.price_trend) === 'up' ? <TrendingUp className="w-3 h-3" /> : 
                               getPriceTrendDirection(lot.price_trend) === 'down' ? <TrendingDown className="w-3 h-3" /> : 
                               <BarChart3 className="w-3 h-3" />}
                              {getPriceTrendPercentage(lot.price_trend)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Details & Bidding */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-semibold">{lot.quantity} {lot.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time Left:</span>
                          <span className="font-semibold text-orange-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {Math.ceil((new Date(lot.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                          </span>
                        </div>
                      </div>

                      {/* Enhanced Bidding Section */}
                      <div className="border-t pt-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Current Bid:</span>
                          <span className="text-xl font-bold text-green-600 flex items-center gap-1">
                            <IndianRupee className="w-4 h-4" />
                            {lot.current_bid || lot.base_price}/{lot.unit}
                          </span>
                        </div>

                        {/* Bid Input with Auto-Bid */}
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <div className="flex-1 relative">
                              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="number"
                                placeholder="Enter bid amount"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                min={(lot.current_bid || lot.base_price) + 1}
                              />
                            </div>
                            <Button 
                              onClick={() => handleBid(lot.id, (lot.current_bid || lot.base_price) + 10)}
                              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                            >
                              <Hand className="w-4 h-4" />
                              Bid
                            </Button>
                          </div>

                          {/* Auto-Bid Option */}
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`auto-bid-${lot.id}`}
                                checked={autoBidEnabled[lot.id] || false}
                                onChange={() => toggleAutoBid(lot.id)}
                                className="rounded"
                              />
                              <label htmlFor={`auto-bid-${lot.id}`} className="text-sm font-medium text-gray-700">
                                Auto-Bid
                              </label>
                            </div>
                            {autoBidEnabled[lot.id] && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Max:</span>
                                <input
                                  type="number"
                                  placeholder="Max bid"
                                  className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                                  onChange={(e) => setMaxBidLimit(lot.id, parseInt(e.target.value))}
                                />
                              </div>
                            )}
                          </div>

                          <p className="text-xs text-gray-500">
                            Minimum bid: <IndianRupee className="w-3 h-3 inline" />{(lot.current_bid || lot.base_price) + 1}/{lot.unit}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedLot(lot.id);
                              setShowBidTracker(true);
                            }}
                            className="flex-1"
                          >
                            <Activity className="w-4 h-4 mr-2" />
                            Live Tracker
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedLot(lot.id);
                              setShowQualityLogistics(true);
                            }}
                            className="flex-1"
                          >
                            <Package className="w-4 h-4 mr-2" />
                            Quality & Logistics
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>

      {/* Live Bid Tracker Modal */}
      {showBidTracker && selectedLot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Live Bid Tracker</h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowBidTracker(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              {(() => {
                const lot = mockAuctionLots.find(l => l.id === selectedLot);
                if (!lot) return <div>Lot not found</div>;
                
                return (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                      <h3 className="font-semibold text-gray-800 mb-2">{lot.crop_name}</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Current Bid:</span>
                          <span className="font-bold text-green-600 ml-2">₹{lot.current_bid}/{lot.unit}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Time Left:</span>
                          <span className="font-semibold text-orange-600 ml-2">
                            {Math.ceil((new Date(lot.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-4">Bid Timeline</h4>
                      <div className="space-y-3">
                        {lot.bid_history.map((bid, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-orange-600">#{index + 1}</span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">{bid.bidder_id}</div>
                                <div className="text-sm text-gray-600">
                                  {bid.timestamp.toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-green-600">₹{bid.amount}</div>
                              <div className="text-sm text-gray-600">per {lot.unit}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Quality & Logistics Modal */}
      {showQualityLogistics && selectedLot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Quality & Logistics</h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowQualityLogistics(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              {(() => {
                const lot = mockAuctionLots.find(l => l.id === selectedLot);
                if (!lot) return <div>Lot not found</div>;
                
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Crop Photos */}
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Camera className="w-5 h-5" />
                          Crop Photos
                        </h3>
                        <div className="space-y-3">
                          <div className="bg-gray-100 rounded-lg p-4 text-center">
                            <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">Crop Photos</p>
                            <Button size="sm" variant="outline" className="mt-2">
                              <Download className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Logistics */}
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Truck className="w-5 h-5" />
                          Delivery Information
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Timeline:</span>
                            <span className="font-semibold">{lot.logistics.delivery_timeline}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Freight Estimate:</span>
                            <span className="font-semibold">{lot.logistics.freight_estimate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Package className="w-5 h-5" />
                          Logistics Providers
                        </h3>
                        <div className="space-y-3">
                          {lot.logistics.available_providers.map((provider, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                  <Truck className="w-4 h-4 text-orange-600" />
                                </div>
                                <span className="font-medium">{provider}</span>
                              </div>
                              <Button size="sm" variant="outline">
                                Select
                              </Button>
                            </div>
                          ))}
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <Truck className="w-4 h-4 text-green-600" />
                              </div>
                              <span className="font-medium">Self Transport</span>
                            </div>
                            <Button size="sm" variant="outline">
                              Select
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default MarketplaceDashboard;