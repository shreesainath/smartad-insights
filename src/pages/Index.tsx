import { useState } from "react";
import { CampaignForm } from "@/components/CampaignForm";
import AISuggestions from "@/components/AISuggestions";

const Index = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRecommendations = (data: any) => {
    setRecommendations(data);
  };

  const handleLoadingChange = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            SmartAd Insights
          </h1>
          <p className="text-gray-600">
            AI-Powered Campaign Optimization Platform
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <CampaignForm 
              onRecommendations={handleRecommendations}
              onLoadingChange={handleLoadingChange}
            />
          </div>
          <div>
            <AISuggestions 
              recommendations={recommendations}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
