import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, DollarSign, Zap, Users, Loader2 } from "lucide-react";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface CampaignFormProps {
  onRecommendations: (data: any) => void;
  onLoadingChange?: (loading: boolean) => void;
}

export function CampaignForm({ onRecommendations, onLoadingChange }: CampaignFormProps) {
  const [formData, setFormData] = useState({
    product_name: "",
    target_audience: {
      age_group: "",
      interests: ""
    },
    budget: "",
    location: "",
    objectives: ["awareness"]
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.product_name || !formData.budget || !formData.location || !formData.target_audience.age_group) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    onLoadingChange?.(true);

    try {
      const campaignData = {
        ...formData,
        budget: parseFloat(formData.budget.split('-')[0].replace('$', '').replace(',', '')) || 1000,
        target_audience: {
          ...formData.target_audience,
          interests: formData.target_audience.interests ? 
            formData.target_audience.interests.split(',').map(s => s.trim()).filter(s => s) : 
            []
        }
      };

      const response = await apiService.getCampaignRecommendations(campaignData);
      
      if (response.success && response.data) {
        onRecommendations(response.data);
        toast({
          title: "Success! 🎉",
          description: "AI recommendations generated successfully",
        });
      } else {
        throw new Error(response.error || 'Failed to get recommendations');
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get recommendations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      onLoadingChange?.(false);
    }
  };

  const updateField = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else if (field === 'objectives') {
      setFormData(prev => ({ ...prev, objectives: [value] }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const isFormValid = formData.product_name && formData.budget && formData.location && formData.target_audience.age_group;

  return (
    <Card className="h-fit border shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Target className="h-5 w-5 text-blue-600" />
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
          {/* Product Name */}
          <div className="space-y-3">
            <Label htmlFor="productName" className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              Product or Service Name *
            </Label>
            <Input
              id="productName"
              placeholder="e.g., Wireless Headphones, CRM Software, Fitness App"
              value={formData.product_name}
              onChange={(e) => updateField('product_name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Budget */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              Monthly Budget *
            </Label>
            <Select value={formData.budget} onValueChange={(value) => updateField('budget', value)}>
              <SelectTrigger className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
                <SelectItem value="500-1000" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">$500 - $1,000</SelectItem>
                <SelectItem value="1000-2500" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">$1,000 - $2,500</SelectItem>
                <SelectItem value="2500-5000" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">$2,500 - $5,000</SelectItem>
                <SelectItem value="5000-10000" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">$5,000 - $10,000</SelectItem>
                <SelectItem value="10000+" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">$10,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-500" />
              Target Location *
            </Label>
            <Select value={formData.location} onValueChange={(value) => updateField('location', value)}>
              <SelectTrigger className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select target location" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
                <SelectItem value="United States" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">United States</SelectItem>
                <SelectItem value="Canada" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Canada</SelectItem>
                <SelectItem value="United Kingdom" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">United Kingdom</SelectItem>
                <SelectItem value="Australia" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Australia</SelectItem>
                <SelectItem value="Germany" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Germany</SelectItem>
                <SelectItem value="France" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">France</SelectItem>
                <SelectItem value="Japan" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Japan</SelectItem>
                <SelectItem value="Global" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Global (Worldwide)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Age Range */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              Target Age Range *
            </Label>
            <Select value={formData.target_audience.age_group} onValueChange={(value) => updateField('target_audience.age_group', value)}>
              <SelectTrigger className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select age range" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
                <SelectItem value="18-24" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">18-24 years</SelectItem>
                <SelectItem value="25-34" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">25-34 years</SelectItem>
                <SelectItem value="35-44" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">35-44 years</SelectItem>
                <SelectItem value="45-54" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">45-54 years</SelectItem>
                <SelectItem value="55-64" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">55-64 years</SelectItem>
                <SelectItem value="65+" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">65+ years</SelectItem>
                <SelectItem value="all-ages" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">All Ages</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <Label htmlFor="interests" className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-500" />
              Target Interests (Optional)
            </Label>
            <Input
              id="interests"
              placeholder="e.g., technology, fitness, cooking, travel"
              value={formData.target_audience.interests}
              onChange={(e) => updateField('target_audience.interests', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500">
              Separate multiple interests with commas
            </p>
          </div>

          {/* Campaign Goal */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-500" />
              Primary Campaign Goal
            </Label>
            <Select value={formData.objectives[0]} onValueChange={(value) => updateField('objectives', value)}>
              <SelectTrigger className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select your primary goal" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
                <SelectItem value="awareness" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Brand Awareness</SelectItem>
                <SelectItem value="traffic" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Drive Website Traffic</SelectItem>
                <SelectItem value="leads" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Generate Leads</SelectItem>
                <SelectItem value="conversions" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Increase Sales</SelectItem>
                <SelectItem value="engagement" className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Social Engagement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            disabled={!isFormValid || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating AI Recommendations...
              </>
            ) : (
              "🤖 Generate AI Recommendations"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
