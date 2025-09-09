import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Lightbulb, TrendingUp, Target, Globe, Calendar, Sparkles } from "lucide-react";

interface CampaignData {
  productType: string;
  campaignGoal: string;
  budget: string;
  platform: string;
}

interface AISuggestionsProps {
  campaignData: CampaignData;
}

export function AISuggestions({ campaignData }: AISuggestionsProps) {
  // Generate AI suggestions based on campaign data
  const generateSuggestions = () => {
    const suggestions = {
      locations: getLocationSuggestions(),
      audience: getAudienceSuggestions(),
      creative: getCreativeSuggestions(),
      budget: getBudgetSuggestions()
    };
    return suggestions;
  };

  const getLocationSuggestions = () => {
    const baseLocations = ["United States", "Canada", "United Kingdom", "Australia"];
    if (campaignData.productType.toLowerCase().includes('baby')) {
      return ["Suburban Areas", "Family-dense Cities", "High-income Zip Codes", ...baseLocations];
    }
    if (campaignData.productType.toLowerCase().includes('saas')) {
      return ["Tech Hubs", "Business Districts", "Major Cities", "San Francisco Bay Area"];
    }
    return baseLocations;
  };

  const getAudienceSuggestions = () => {
    const baseAudience = [
      { filter: "Age Range", value: "25-45", color: "bg-primary" },
      { filter: "Income Level", value: "Middle to High", color: "bg-success" }
    ];

    if (campaignData.productType.toLowerCase().includes('baby')) {
      return [
        { filter: "Parental Status", value: "New Parents", color: "bg-action" },
        { filter: "Age Range", value: "25-40", color: "bg-primary" },
        { filter: "Interests", value: "Baby Products, Parenting", color: "bg-success" },
        { filter: "Income Level", value: "Middle to High", color: "bg-success" }
      ];
    }

    if (campaignData.productType.toLowerCase().includes('fitness')) {
      return [
        { filter: "Interests", value: "Fitness, Health", color: "bg-action" },
        { filter: "Age Range", value: "20-50", color: "bg-primary" },
        { filter: "Behavior", value: "Active Lifestyle", color: "bg-success" }
      ];
    }

    return baseAudience;
  };

  const getCreativeSuggestions = () => {
    const goal = campaignData.campaignGoal;
    const platform = campaignData.platform;

    const suggestions = [];

    if (goal === 'awareness') {
      suggestions.push("Use bright, eye-catching visuals with your brand colors");
      suggestions.push("Include your logo prominently in the creative");
      suggestions.push("Focus on brand storytelling rather than direct sales");
    } else if (goal === 'sales') {
      suggestions.push("Show the product in action with real customers");
      suggestions.push("Include clear pricing and promotional offers");
      suggestions.push("Use action-oriented language like 'Shop Now' or 'Limited Time'");
    }

    if (platform === 'meta') {
      suggestions.push("Video content performs 48% better on Meta platforms");
      suggestions.push("Use square (1:1) or vertical (4:5) aspect ratios");
    } else if (platform === 'google') {
      suggestions.push("Responsive search ads with 3+ headlines work best");
      suggestions.push("Include location extensions if you have physical stores");
    }

    return suggestions;
  };

  const getBudgetSuggestions = () => {
    const budget = campaignData.budget;
    const platform = campaignData.platform;

    const suggestions = [];

    if (budget === '500-1000') {
      suggestions.push("Focus on 1-2 core audience segments initially");
      suggestions.push("Start with broad targeting to gather data");
      suggestions.push("Allocate 70% to prospecting, 30% to retargeting");
    } else if (budget === '5000-10000' || budget === '10000+') {
      suggestions.push("Test multiple audience segments simultaneously");
      suggestions.push("Implement advanced bidding strategies");
      suggestions.push("Allocate 40% prospecting, 60% optimization and retargeting");
    }

    if (platform === 'both') {
      suggestions.push("Split 60% Google Ads, 40% Meta Ads for most verticals");
      suggestions.push("Use unified tracking to compare platform performance");
    }

    return suggestions;
  };

  const suggestions = generateSuggestions();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AI Recommendations
          </h2>
        </div>
        <p className="text-muted-foreground">
          Optimized suggestions for your {campaignData.productType} campaign
        </p>
      </div>

      {/* Location Targeting */}
      <Card className="shadow-card hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-primary-muted rounded-lg">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            Recommended Locations
          </CardTitle>
          <CardDescription>
            Target these areas for higher audience concentration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {suggestions.locations.map((location, index) => (
              <Badge key={index} variant="secondary" className="hover-glow">
                <Globe className="h-3 w-3 mr-1" />
                {location}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audience Targeting */}
      <Card className="shadow-card hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-success-muted rounded-lg">
              <Users className="h-5 w-5 text-success" />
            </div>
            Audience Filters
          </CardTitle>
          <CardDescription>
            Demographic and interest targeting recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {suggestions.audience.map((filter, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-subtle rounded-lg">
                <span className="font-medium">{filter.filter}</span>
                <Badge className={filter.color}>
                  {filter.value}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Creative Tips */}
      <Card className="shadow-card hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-action-muted rounded-lg">
              <Lightbulb className="h-5 w-5 text-action" />
            </div>
            Creative Recommendations
          </CardTitle>
          <CardDescription>
            Optimize your ad creative for maximum impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {suggestions.creative.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gradient-subtle rounded-lg">
                <Target className="h-4 w-4 text-action mt-0.5 flex-shrink-0" />
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Distribution */}
      <Card className="shadow-card hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-primary-muted rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            Budget Optimization
          </CardTitle>
          <CardDescription>
            Smart allocation strategies for your ${campaignData.budget} budget
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {suggestions.budget.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gradient-subtle rounded-lg">
                <Calendar className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}