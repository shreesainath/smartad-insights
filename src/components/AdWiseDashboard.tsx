import { useState } from "react";
import { CampaignForm } from "./CampaignForm";
import { AISuggestions } from "./AISuggestions";
import { Button } from "@/components/ui/button";
import { Zap, BarChart3, Target } from "lucide-react";

interface CampaignData {
  productType: string;
  campaignGoal: string;
  budget: string;
  location: string;
  ageRange: string;
  gender: string;
}

export function AdWiseDashboard() {
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleFormSubmit = (data: CampaignData) => {
    setCampaignData(data);
    setShowResults(true);
  };

  const handleReset = () => {
    setCampaignData(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AdWise</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Campaign Optimization</p>
              </div>
            </div>
            
            {showResults && (
              <Button 
                onClick={handleReset}
                variant="outline" 
                size="default"
                className="hover-glow transition-smooth"
              >
                New Campaign
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!showResults && (
        <section className="py-16 text-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Optimize Your Ad Campaigns with AI
              </h2>
              <p className="text-xl text-muted-foreground">
                Get intelligent recommendations for targeting, budget allocation, and creative strategies 
                across Google Ads and Meta platforms.
              </p>
              
              <div className="flex items-center justify-center gap-8 pt-8">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Smart Targeting</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium">Budget Optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-action" />
                  <span className="text-sm font-medium">AI-Powered</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Form */}
          <div className={`${showResults ? 'lg:col-span-1' : 'lg:col-span-2 max-w-2xl mx-auto'}`}>
            <CampaignForm onSubmit={handleFormSubmit} />
          </div>

          {/* Right Column - AI Suggestions */}
          {showResults && campaignData && (
            <div className="animate-slide-up">
              <AISuggestions campaignData={campaignData} />
            </div>
          )}
        </div>

        {/* Call to Action */}
        {!showResults && (
          <div className="text-center pt-16">
            <div className="max-w-2xl mx-auto space-y-4">
              <h3 className="text-2xl font-semibold">Ready to optimize your campaigns?</h3>
              <p className="text-muted-foreground">
                Fill in your campaign details above to get started with AI-powered recommendations.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}