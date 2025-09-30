import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bell, 
  X, 
  Check, 
  Trash2, 
  Clock,
  Droplets,
  Sprout,
  Wheat,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export interface Notification {
  id: string;
  type: 'advisory' | 'bidding';
  category: 'seeding' | 'sowing' | 'fertilizing' | 'harvesting' | 'new_bid' | 'bid_updated' | 'lot_sold';
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
    daysRemaining?: number;
  };
}

interface NotificationBellProps {
  farmerName?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'advisory',
    category: 'sowing',
    title: '🌱 Time to sow Paddy',
    message: 'Time to sow Paddy this week – favorable rainfall expected.',
    timestamp: '2 hours ago',
    isRead: false,
    priority: 'high',
    metadata: {
      cropName: 'Paddy',
      daysRemaining: 3
    }
  },
  {
    id: '2',
    type: 'advisory',
    category: 'fertilizing',
    title: '💧 Apply DAP fertilizer',
    message: 'Apply DAP fertilizer in 2 days for optimal growth.',
    timestamp: '4 hours ago',
    isRead: false,
    priority: 'medium',
    metadata: {
      cropName: 'Wheat',
      daysRemaining: 2
    }
  },
  {
    id: '3',
    type: 'bidding',
    category: 'new_bid',
    title: '🔔 New bid received',
    message: 'Buyer Rajesh Kumar offered ₹12,500 for your Wheat lot.',
    timestamp: '6 hours ago',
    isRead: false,
    priority: 'high',
    metadata: {
      cropName: 'Wheat',
      bidAmount: 12500,
      buyerName: 'Rajesh Kumar',
      lotId: 'LOT-001'
    }
  },
  {
    id: '4',
    type: 'bidding',
    category: 'bid_updated',
    title: '📈 Bid increased',
    message: 'Buyer Priya Sharma increased their bid on your Maize lot by 10%.',
    timestamp: '1 day ago',
    isRead: true,
    priority: 'medium',
    metadata: {
      cropName: 'Maize',
      bidAmount: 16500,
      buyerName: 'Priya Sharma',
      lotId: 'LOT-002'
    }
  },
  {
    id: '5',
    type: 'bidding',
    category: 'lot_sold',
    title: '✅ Lot sold successfully',
    message: 'Your Bajra lot was successfully sold at ₹18,000.',
    timestamp: '2 days ago',
    isRead: true,
    priority: 'high',
    metadata: {
      cropName: 'Bajra',
      bidAmount: 18000,
      lotId: 'LOT-003'
    }
  },
  {
    id: '6',
    type: 'advisory',
    category: 'harvesting',
    title: '🌾 Harvest window approaching',
    message: 'Your Rice crop is ready for harvest. Best window: next 5-7 days.',
    timestamp: '3 days ago',
    isRead: true,
    priority: 'high',
    metadata: {
      cropName: 'Rice',
      daysRemaining: 5
    }
  }
];

const NotificationBell = ({ farmerName }: NotificationBellProps) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'advisory' | 'bidding'>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (category: Notification['category']) => {
    switch (category) {
      case 'seeding':
      case 'sowing':
        return <Sprout className="w-4 h-4" />;
      case 'fertilizing':
        return <Droplets className="w-4 h-4" />;
      case 'harvesting':
        return <Wheat className="w-4 h-4" />;
      case 'new_bid':
      case 'bid_updated':
      case 'lot_sold':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
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
    return notification.type === activeTab;
  });

  const advisoryNotifications = notifications.filter(n => n.type === 'advisory');
  const biddingNotifications = notifications.filter(n => n.type === 'bidding');

  return (
    <div className="relative">
      {/* Bell Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="bg-white/80 hover:bg-white border-2 border-green-200 hover:border-green-300 text-green-700 hover:text-green-800 font-semibold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative"
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
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[500px] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800">Notifications</h3>
              <div className="flex items-center gap-2">
                <Button
                  onClick={markAllAsRead}
                  variant="ghost"
                  size="sm"
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
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
                    ? 'bg-green-100 text-green-800' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setActiveTab('advisory')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'advisory' 
                    ? 'bg-green-100 text-green-800' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Advisory ({advisoryNotifications.length})
              </button>
              <button
                onClick={() => setActiveTab('bidding')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'bidding' 
                    ? 'bg-green-100 text-green-800' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Bidding ({biddingNotifications.length})
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
                        : 'border-l-green-500 bg-white'
                    } hover:shadow-md transition-all duration-200`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${
                          notification.isRead ? 'bg-gray-200' : 'bg-green-100'
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
                                  className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
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
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationBell;
