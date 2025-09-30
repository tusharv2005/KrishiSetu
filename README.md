# 🌾 Crop Kisan Sahayyak - Smart Agriculture Platform

A comprehensive digital platform that empowers farmers with intelligent crop advisory, marketplace access, and data-driven agricultural insights.

## 🚀 Features

### 👨‍🌾 **Farmer Dashboard**
- **Smart Crop Advisory**: AI-powered recommendations based on soil, weather, and market conditions
- **Cultivation Planner**: Step-by-step guidance for optimal crop cultivation
- **Rainfall Forecasting**: Advanced weather prediction for better planning
- **Marketplace Access**: Direct connection to buyers and auction system

### 🏢 **Marketplace Dashboard**
- **Auction Management**: Live bidding system for agricultural produce
- **Quality Assessment**: Comprehensive quality metrics and lab reports
- **Logistics Integration**: Multiple transport providers including self-transport options
- **Real-time Analytics**: Market trends, pricing insights, and demand forecasting

### 💡 **Intelligent Pricing System**
- **Smart Recommendations**: AI-driven pricing based on:
  - Current mandi trends and transaction rates
  - Government MSP (Minimum Support Price)
  - Storage viability and shelf life analysis
  - Demand forecasting for next 2-3 months
  - Logistics costs and regional competition
- **Real-time Updates**: Dynamic pricing recommendations as market conditions change

### 📊 **Advanced Analytics**
- **Market Trends**: Real-time price tracking and trend analysis
- **Demand Forecasting**: Predictive analytics for crop demand
- **Sustainability Metrics**: Environmental impact tracking
- **Performance Insights**: Farmer success metrics and recommendations

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or bun package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/crop-kisan-sahayyak.git
   cd crop-kisan-sahayyak
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Key Components

### **Create Lot to Bid**
- **Step 1**: Basic crop information (name, variety, quantity)
- **Step 2**: Quality & Pricing with intelligent recommendations
- **Step 3**: Additional details and image uploads

### **Smart Pricing Algorithm**
The pricing recommendation system analyzes:
- **MSP Floor**: Government minimum support price as baseline
- **Market Rates**: Current mandi prices and trends
- **Quality Premiums**: Grade-based pricing adjustments
- **Demand Factors**: Seasonal and regional demand patterns
- **Storage Impact**: Freshness and shelf life considerations
- **Competition**: Regional buyer competition levels

### **Cultivation Planner**
- Crop selection based on soil and climate
- Seasonal planning and timeline management
- Resource optimization recommendations
- Risk assessment and mitigation strategies

## 🌐 Application Routes

- `/` - Home page with login options
- `/farmer-login` - Farmer authentication
- `/farmer-choice` - Farmer dashboard options
- `/create-lot` - Create auction lot with pricing recommendations
- `/farmer-input` - Crop advisory input form
- `/recommendations` - AI-powered crop recommendations
- `/planner` - Cultivation planning tool
- `/admin-login` - Marketplace admin login
- `/admin-dashboard` - Marketplace management dashboard

## 📱 User Roles

### **Farmer**
- Access crop advisory and recommendations
- Create auction lots with smart pricing
- View market trends and pricing insights
- Plan cultivation with guided assistance

### **Marketplace Admin/Buyer**
- Manage auction lots and bidding
- Access quality metrics and logistics
- View market analytics and trends
- Handle transactions and payments

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# With bun
bun run dev
bun run build
bun run preview
bun run lint
```

## 📊 Market Data Integration

The platform includes comprehensive market data for:
- **Cereals**: Rice, Wheat, Maize
- **Cash Crops**: Cotton, Sugarcane, Soybean
- **Vegetables**: Potato, Tomato, Onion
- **Real-time Pricing**: MSP, mandi rates, trend analysis
- **Regional Variations**: State and district-specific data

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme switching capability
- **Accessibility**: WCAG compliant components
- **Modern Interface**: Clean, intuitive design with shadcn/ui
- **Real-time Updates**: Live data and notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Government of India**: For MSP data and agricultural policies
- **Indian Meteorological Department**: For weather data integration
- **Agricultural Universities**: For crop advisory algorithms
- **Open Source Community**: For the amazing tools and libraries

## 📞 Support

For support, email support@cropkisansahayyak.com or create an issue in this repository.

---

**Built with ❤️ for Indian Farmers** 🇮🇳

*Empowering agriculture through technology and innovation*