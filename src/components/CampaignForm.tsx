import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, DollarSign, Zap, Users } from "lucide-react";

interface CampaignData {
  productType: string;
  campaignGoal: string;
  budget: string;
  location: string;
  ageRange: string;
  gender: string;
}

interface CampaignFormProps {
  onSubmit: (data: CampaignData) => void;
}

export function CampaignForm({ onSubmit }: CampaignFormProps) {
  const [formData, setFormData] = useState<CampaignData>({
    productType: "",
    campaignGoal: "",
    budget: "",
    location: "",
    ageRange: "",
    gender: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.productType && formData.campaignGoal && formData.budget && formData.location && formData.ageRange && formData.gender) {
      onSubmit(formData);
    }
  };

  const updateField = (field: keyof CampaignData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = Object.values(formData).every(value => value !== "");

  return (
    <Card variant="elevated" className="h-fit">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Target className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Campaign Details</CardTitle>
            <CardDescription>
              Tell us about your campaign to get AI-powered recommendations
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Type */}
          <div className="space-y-3">
            <Label htmlFor="productType" className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              Product or Service Type
            </Label>
            <Input
              id="productType"
              placeholder="e.g., Baby toys, SaaS software, Fitness equipment"
              value={formData.productType}
              onChange={(e) => updateField('productType', e.target.value)}
              className="transition-smooth focus:shadow-primary"
            />
          </div>

          {/* Campaign Goal */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              Campaign Goal
            </Label>
            <Select value={formData.campaignGoal} onValueChange={(value) => updateField('campaignGoal', value)}>
              <SelectTrigger className="w-full transition-smooth focus:shadow-primary bg-background">
                <SelectValue placeholder="Select your primary goal" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-elevated z-50">
                <SelectItem value="awareness">Brand Awareness</SelectItem>
                <SelectItem value="traffic">Drive Website Traffic</SelectItem>
                <SelectItem value="leads">Generate Leads</SelectItem>
                <SelectItem value="sales">Increase Sales</SelectItem>
                <SelectItem value="app_installs">App Installs</SelectItem>
                <SelectItem value="engagement">Social Engagement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget */}
          <div className="space-y-3">
            <Label htmlFor="budget" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              Monthly Budget
            </Label>
            <Select value={formData.budget} onValueChange={(value) => updateField('budget', value)}>
              <SelectTrigger className="w-full transition-smooth focus:shadow-primary bg-background">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-elevated z-50">
                <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                <SelectItem value="10000+">$10,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              Target Location
            </Label>
            <Select value={formData.location} onValueChange={(value) => updateField('location', value)}>
              <SelectTrigger className="w-full transition-smooth focus:shadow-primary bg-background">
                <SelectValue placeholder="Select target location" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-elevated z-50">
                <SelectItem value="united-states">United States</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="united-kingdom">United Kingdom</SelectItem>
                <SelectItem value="australia">Australia</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
                <SelectItem value="france">France</SelectItem>
                <SelectItem value="japan">Japan</SelectItem>
                <SelectItem value="global">Global (Worldwide)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Age Range */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              Target Age Range
            </Label>
            <Select value={formData.ageRange} onValueChange={(value) => updateField('ageRange', value)}>
              <SelectTrigger className="w-full transition-smooth focus:shadow-primary bg-background">
                <SelectValue placeholder="Select age range" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-elevated z-50">
                <SelectItem value="18-24">18-24 years</SelectItem>
                <SelectItem value="25-34">25-34 years</SelectItem>
                <SelectItem value="35-44">35-44 years</SelectItem>
                <SelectItem value="45-54">45-54 years</SelectItem>
                <SelectItem value="55-64">55-64 years</SelectItem>
                <SelectItem value="65+">65+ years</SelectItem>
                <SelectItem value="all-ages">All Ages</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              Target Gender
            </Label>
            <Select value={formData.gender} onValueChange={(value) => updateField('gender', value)}>
              <SelectTrigger className="w-full transition-smooth focus:shadow-primary bg-background">
                <SelectValue placeholder="Select gender targeting" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-elevated z-50">
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            variant="action"
            size="xl"
            disabled={!isFormValid}
            className="w-full"
          >
            🤖 Generate AI Recommendations
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}