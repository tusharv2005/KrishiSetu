import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wheat, TrendingUp, Users, MapPin } from "lucide-react";
import farmHero from "@/assets/farm-hero.jpg";

interface IndexProps {
  onStartJourney: () => void;
}

const Index = ({ onStartJourney }: IndexProps) => {
  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Hero Section */}
      <div className="relative">
        <div 
          className="h-[70vh] bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${farmHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
          <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
                🌾 Smart Crop Recommendations
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Get personalized crop recommendations based on your location, land size, and farming conditions. 
                Maximize your profits with data-driven agricultural insights.
              </p>
              <Button 
                onClick={onStartJourney}
                className="h-16 px-12 text-xl font-bold bg-gradient-farm hover:shadow-button transition-all duration-300 transform hover:scale-105"
              >
                🚀 Start Your Farming Journey
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose Our Crop Recommendation System?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="shadow-card border-border/50 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Location-Based</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Recommendations tailored to your specific state and district's climate and soil conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border/50 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-profit/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-profit" />
                </div>
                <CardTitle className="text-xl">Profit Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Crops ranked by potential profit per acre with detailed economic breakdowns.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border/50 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Wheat className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl">Variety Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Choose from multiple seed varieties and fertilizer plans for each crop.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border/50 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-success/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Users className="h-8 w-8 text-success" />
                </div>
                <CardTitle className="text-xl">Farmer Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Simple interface with large buttons and minimal typing required.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6 text-foreground">
            Ready to Optimize Your Farming?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who have increased their profits by making informed crop choices. 
            Get started in just 3 simple steps.
          </p>
          <Button 
            onClick={onStartJourney}
            className="h-14 px-10 text-lg font-semibold bg-gradient-farm hover:shadow-button transition-all duration-300 transform hover:scale-105"
          >
            Get Crop Recommendations Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
