import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Lightbulb, TrendingUp, Target, Globe, Calendar, Sparkles } from "lucide-react";

interface CampaignData {
  productType: string;
  campaignGoal: string;
  budget: string;
  location: string;
  ageRange: string;
  gender: string;
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
    const selectedLocation = campaignData.location;
    
    if (selectedLocation === 'united-states') {
      return ["Major US Cities", "Suburban Areas", "Tech Hubs", "California", "New York", "Texas"];
    }
    if (selectedLocation === 'global') {
      return ["North America", "Europe", "Asia-Pacific", "English-speaking Countries"];
    }
    if (selectedLocation === 'canada') {
      return ["Toronto", "Vancouver", "Montreal", "Major Canadian Cities"];
    }
    if (selectedLocation === 'united-kingdom') {
      return ["London", "Manchester", "Birmingham", "Scotland", "Wales"];
    }
    
    // Default suggestions based on product type
    if (campaignData.productType.toLowerCase().includes('baby')) {
      return ["Family-dense Areas", "Suburban Neighborhoods", "High-income Regions"];
    }
    if (campaignData.productType.toLowerCase().includes('saas')) {
      return ["Business Districts", "Tech Cities", "Metropolitan Areas"];
    }
    
    return ["Urban Areas", "Suburban Areas", "Metropolitan Regions"];
  };

  const getAudienceSuggestions = () => {
    const ageRange = campaignData.ageRange;
    const gender = campaignData.gender;
    
    const suggestions = [];
    
    // Age-based suggestions
    if (ageRange) {
      suggestions.push({ filter: "Age Range", value: ageRange.replace('-', ' - '), color: "bg-primary" });
    }
    
    // Gender-based suggestions  
    if (gender && gender !== 'all') {
      suggestions.push({ filter: "Gender", value: gender.charAt(0).toUpperCase() + gender.slice(1), color: "bg-action" });
    }
    
    // Product-based suggestions
    if (campaignData.productType.toLowerCase().includes('baby')) {
      suggestions.push(
        { filter: "Parental Status", value: "New Parents", color: "bg-success" },
        { filter: "Interests", value: "Baby Products, Parenting", color: "bg-success" }
      );
    } else if (campaignData.productType.toLowerCase().includes('fitness')) {
      suggestions.push(
        { filter: "Interests", value: "Fitness, Health", color: "bg-success" },
        { filter: "Behavior", value: "Active Lifestyle", color: "bg-action" }
      );
    } else if (campaignData.productType.toLowerCase().includes('saas')) {
      suggestions.push(
        { filter: "Job Title", value: "Decision Makers", color: "bg-success" },
        { filter: "Company Size", value: "10-500 Employees", color: "bg-action" }
      );
    }
    
    // Income level based on age
    if (ageRange === '25-34' || ageRange === '35-44') {
      suggestions.push({ filter: "Income Level", value: "Middle to High", color: "bg-primary" });
    }
    
    return suggestions;
  };

  const getCreativeSuggestions = () => {
    const goal = campaignData.campaignGoal;
    const suggestions = [];

    // Goal-based creative suggestions
    if (goal === 'awareness') {
      suggestions.push("🎨 Use bright, eye-catching visuals with your brand colors");
      suggestions.push("📱 Include your logo prominently in the creative");
      suggestions.push("📖 Focus on brand storytelling rather than direct sales");
    } else if (goal === 'sales') {
      suggestions.push("🛍️ Show the product in action with real customers");
      suggestions.push("💰 Include clear pricing and promotional offers");
      suggestions.push("⚡ Use action-oriented language like 'Shop Now' or 'Limited Time'");
    } else if (goal === 'leads') {
      suggestions.push("📋 Highlight lead magnets like free trials or downloads");
      suggestions.push("🎯 Use benefit-focused headlines and clear CTAs");
      suggestions.push("✨ Show value proposition immediately");
    }

    // Age-based creative suggestions
    if (campaignData.ageRange === '18-24') {
      suggestions.push("📱 Use trendy, mobile-first video content");
      suggestions.push("🌈 Incorporate current social media aesthetics");
    } else if (campaignData.ageRange === '45-54' || campaignData.ageRange === '55-64') {
      suggestions.push("📰 Use clear, professional imagery with readable text");
      suggestions.push("🔍 Focus on detailed product information and benefits");
    }

    // Gender-specific suggestions
    if (campaignData.gender === 'male') {
      suggestions.push("🏆 Use achievement and competition themes");
    } else if (campaignData.gender === 'female') {
      suggestions.push("👥 Include community and relationship elements");
    }

    // Multi-platform suggestions
    suggestions.push("📹 Video content performs 48% better across all platforms");
    suggestions.push("📐 Use square (1:1) or vertical (4:5) aspect ratios for mobile");
    suggestions.push("🔄 Test multiple ad variations for optimal performance");

    return suggestions;
  };

  const getBudgetSuggestions = () => {
    const budget = campaignData.budget;
    const location = campaignData.location;
    const suggestions = [];

    // Budget-based suggestions
    if (budget === '500-1000') {
      suggestions.push("💡 Focus on 1-2 core audience segments initially");
      suggestions.push("📊 Start with broad targeting to gather data");
      suggestions.push("📈 Allocate 70% to prospecting, 30% to retargeting");
    } else if (budget === '5000-10000' || budget === '10000+') {
      suggestions.push("🎯 Test multiple audience segments simultaneously");
      suggestions.push("🤖 Implement advanced automated bidding strategies");
      suggestions.push("⚖️ Allocate 40% prospecting, 60% optimization and retargeting");
    } else {
      suggestions.push("🚀 Balance between testing and scaling proven audiences");
      suggestions.push("📱 Focus on mobile-first targeting for better ROI");
    }

    // Location-based budget suggestions
    if (location === 'united-states') {
      suggestions.push("💰 US markets typically require 20-30% higher budgets");
      suggestions.push("🏙️ Consider geo-targeting expensive metros vs suburban areas");
    } else if (location === 'global') {
      suggestions.push("🌍 Start with English-speaking markets before expanding");
      suggestions.push("⏰ Adjust bidding schedules for different time zones");
    }

    // Platform distribution suggestions
    suggestions.push("📊 Split budget: 60% Google Ads, 40% Meta Ads for most verticals");
    suggestions.push("📈 Use unified tracking to compare platform performance");
    suggestions.push("🔄 Reallocate budget weekly based on performance data");

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
          🤖 Optimized AI suggestions for your {campaignData.productType} campaign targeting {campaignData.location} audience
        </p>
      </div>

      {/* Location Targeting */}
      <Card variant="elevated" className="hover-lift">
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
      <Card variant="elevated" className="hover-lift">
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
                <Badge 
                  variant={
                    filter.color === "bg-primary" ? "primary" :
                    filter.color === "bg-action" ? "action" :
                    filter.color === "bg-success" ? "success" : "default"
                  }
                >
                  {filter.value}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Creative Tips */}
      <Card variant="elevated" className="hover-lift">
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
      <Card variant="elevated" className="hover-lift">
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