import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bell, 
  X, 
  Check, 
  Trash2, 
  Clock,
  Gavel,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Users,
  DollarSign,
  Package,
  Truck,
  Target,
  Zap,
  BarChart3,
  ShoppingCart,
  IndianRupee,
  MapPin
} from "lucide-react";

export interface MarketplaceNotification {
  id: string;
  type: 'auction' | 'transaction' | 'marketplace';
  category: 'new_lot' | 'bid_accepted' | 'bid_outbid' | 'high_demand' | 'payment_confirmed' | 'dispatch_update' | 'new_buyer' | 'auction_ending' | 'seasonal_trend';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  metadata?: {
    cropName?: string;
    bidAmount?: number;
    buyerName?: string;
    lotId?: string;
    hoursLeft?: number;
    location?: string;
    priceChange?: number;
    quantity?: string;
  };
}

interface MarketplaceNotificationBellProps {
  userType?: 'buyer' | 'seller' | 'admin';
}

const mockNotifications: MarketplaceNotification[] = [
  {
    id: '1',
    type: 'auction',
    category: 'new_lot',
    title: '📢 New lot created in your area',
    message: 'Rice – 50 quintals now open for bidding in Karnal, Haryana',
    timestamp: '5 minutes ago',
    isRead: false,
    priority: 'high',
    metadata: {
      cropName: 'Rice',
      quantity: '50 quintals',
      location: 'Karnal, Haryana',
      lotId: 'LOT-124'
    }
  },
  {
    id: '2',
    type: 'auction',
    category: 'bid_accepted',
    title: '✅ Your bid has been accepted',
    message: 'Farmer accepted your ₹2,100/quintal bid on Wheat lot',
    timestamp: '15 minutes ago',
    isRead: false,
    priority: 'high',
    metadata: {
      cropName: 'Wheat',
      bidAmount: 2100,
      lotId: 'LOT-089'
    }
  },
  {
    id: '3',
    type: 'auction',
    category: 'bid_outbid',
    title: '📈 You\'ve been outbid',
    message: 'Another buyer placed a higher bid on the Maize lot you\'re watching',
    timestamp: '1 hour ago',
    isRead: false,
    priority: 'medium',
    metadata: {
      cropName: 'Maize',
      lotId: 'LOT-067'
    }
  },
  {
    id: '4',
    type: 'marketplace',
    category: 'high_demand',
    title: '🚀 High demand alert',
    message: 'Corn prices surged 15% this week - great time to sell!',
    timestamp: '2 hours ago',
    isRead: true,
    priority: 'high',
    metadata: {
      cropName: 'Corn',
      priceChange: 15
    }
  },
  {
    id: '5',
    type: 'transaction',
    category: 'payment_confirmed',
    title: '💰 Payment confirmed',
    message: 'Your purchase of 25 quintals of Bajra is successful',
    timestamp: '3 hours ago',
    isRead: true,
    priority: 'high',
    metadata: {
      cropName: 'Bajra',
      quantity: '25 quintals',
      lotId: 'LOT-045'
    }
  },
  {
    id: '6',
    type: 'transaction',
    category: 'dispatch_update',
    title: '📦 Dispatch confirmed',
    message: 'Farmer has confirmed shipment of your Wheat lot',
    timestamp: '4 hours ago',
    isRead: true,
    priority: 'medium',
    metadata: {
      cropName: 'Wheat',
      lotId: 'LOT-089'
    }
  },
  {
    id: '7',
    type: 'marketplace',
    category: 'new_buyer',
    title: '👤 New verified buyer joined',
    message: 'AgroCorp Ltd has been verified and is actively bidding',
    timestamp: '6 hours ago',
    isRead: true,
    priority: 'low',
    metadata: {
      buyerName: 'AgroCorp Ltd'
    }
  },
  {
    id: '8',
    type: 'auction',
    category: 'auction_ending',
    title: '⚠️ Auction ending soon',
    message: 'Only 2 hours left for Paddy Lot #102 - place your final bid!',
    timestamp: '8 hours ago',
    isRead: true,
    priority: 'high',
    metadata: {
      cropName: 'Paddy',
      lotId: 'LOT-102',
      hoursLeft: 2
    }
  },
  {
    id: '9',
    type: 'marketplace',
    category: 'seasonal_trend',
    title: '🌾 Seasonal trend alert',
    message: 'Soybean demand rising in your region - prices up 8%',
    timestamp: '1 day ago',
    isRead: true,
    priority: 'medium',
    metadata: {
      cropName: 'Soybean',
      priceChange: 8,
      location: 'Madhya Pradesh'
    }
  }
];

const MarketplaceNotificationBell = ({ userType = 'buyer' }: MarketplaceNotificationBellProps) => {
  const [notifications, setNotifications] = useState<MarketplaceNotification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'bids' | 'alerts'>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (category: MarketplaceNotification['category']) => {
    switch (category) {
      case 'new_lot':
        return <Gavel className="w-4 h-4" />;
      case 'bid_accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'bid_outbid':
        return <TrendingUp className="w-4 h-4" />;
      case 'high_demand':
        return <Zap className="w-4 h-4" />;
      case 'payment_confirmed':
        return <DollarSign className="w-4 h-4" />;
      case 'dispatch_update':
        return <Truck className="w-4 h-4" />;
      case 'new_buyer':
        return <Users className="w-4 h-4" />;
      case 'auction_ending':
        return <AlertTriangle className="w-4 h-4" />;
      case 'seasonal_trend':
        return <BarChart3 className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: MarketplaceNotification['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'bids') return notification.type === 'auction';
    if (activeTab === 'alerts') return notification.type === 'marketplace' || notification.type === 'transaction';
    return true;
  });

  const bidNotifications = notifications.filter(n => n.type === 'auction');
  const alertNotifications = notifications.filter(n => n.type === 'marketplace' || n.type === 'transaction');

  return (
    <div className="relative" style={{ zIndex: 99999 }}>
      {/* Bell Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="border-orange-200 text-gray-700 hover:bg-orange-50 relative"
        style={{ zIndex: 99999 }}
      >
        <Bell className="w-4 h-4 mr-2" />
        Notifications
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Dropdown */}
      {isOpen && createPortal(
        <div 
          className="fixed top-20 right-4 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[500px] overflow-hidden flex flex-col"
          style={{ zIndex: 999999 }}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-yellow-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800">Marketplace Updates</h3>
              <div className="flex items-center gap-2">
                <Button
                  onClick={markAllAsRead}
                  variant="ghost"
                  size="sm"
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Mark all read
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-white rounded-lg p-1">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'all' 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setActiveTab('bids')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'bids' 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                My Bids & Lots ({bidNotifications.length})
              </button>
              <button
                onClick={() => setActiveTab('alerts')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'alerts' 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Marketplace Alerts ({alertNotifications.length})
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {filteredNotifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No notifications</p>
              </div>
            ) : (
              <div className="p-2 pb-4">
                {filteredNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`mb-2 border-l-4 ${
                      notification.isRead 
                        ? 'border-l-gray-300 bg-gray-50/50' 
                        : 'border-l-orange-500 bg-white'
                    } hover:shadow-md transition-all duration-200`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${
                          notification.isRead ? 'bg-gray-200' : 'bg-orange-100'
                        }`}>
                          {getNotificationIcon(notification.category)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className={`font-semibold text-sm ${
                                notification.isRead ? 'text-gray-600' : 'text-gray-900'
                              }`}>
                                {notification.title}
                              </h4>
                              <p className={`text-xs mt-1 ${
                                notification.isRead ? 'text-gray-500' : 'text-gray-700'
                              }`}>
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Clock className="w-3 h-3" />
                                  {notification.timestamp}
                                </div>
                                {notification.metadata?.bidAmount && (
                                  <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                                    <IndianRupee className="w-3 h-3" />
                                    {notification.metadata.bidAmount}
                                  </div>
                                )}
                                {notification.metadata?.location && (
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <MapPin className="w-3 h-3" />
                                    {notification.metadata.location}
                                  </div>
                                )}
                                <Badge className={`text-xs px-2 py-0.5 ${getPriorityColor(notification.priority)}`}>
                                  {notification.priority}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1 ml-2">
                              {!notification.isRead && (
                                <Button
                                  onClick={() => markAsRead(notification.id)}
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                                >
                                  <Check className="w-3 h-3" />
                                </Button>
                              )}
                              <Button
                                onClick={() => deleteNotification(notification.id)}
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <Button
                onClick={clearAllNotifications}
                variant="ghost"
                size="sm"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Notifications
              </Button>
            </div>
          )}
        </div>,
        document.body
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0" 
          style={{ zIndex: 999998 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default MarketplaceNotificationBell;
