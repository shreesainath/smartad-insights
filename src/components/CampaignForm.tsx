import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

      console.log('🚀 Sending campaign data:', campaignData);
      const response = await apiService.getCampaignRecommendations(campaignData);
      
      console.log('📥 Full API response:', response);
      console.log('📊 Response.data:', response.data);
      
      if (response.success && response.data) {
        console.log('✅ About to call onRecommendations with:', response.data);
        onRecommendations(response.data);
        toast({
          title: "Success! 🎉",
          description: "AI recommendations generated successfully",
        });
      } else {
        console.error('❌ API response missing data:', response);
        throw new Error(response.error || 'Failed to get recommendations');
      }
    } catch (error) {
      console.error('❌ Error getting recommendations:', error);
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
            <CardTitle className="text-xl">Tamil Nadu Campaign Details</CardTitle>
            <CardDescription>
              Tell us about your Tamil Nadu campaign to get AI-powered recommendations
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
              placeholder="e.g., Software Development, Textile Manufacturing, IT Services"
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
            <select
              value={formData.budget}
              onChange={(e) => updateField('budget', e.target.value)}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
              required
            >
              <option value="">Select budget range</option>
              <option value="500-1000">$500 - $1,000</option>
              <option value="1000-2500">$1,000 - $2,500</option>
              <option value="2500-5000">$2,500 - $5,000</option>
              <option value="5000-10000">$5,000 - $10,000</option>
              <option value="10000+">$10,000+</option>
            </select>
          </div>

          {/* Location - UPDATED TO TAMIL NADU DISTRICTS */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-500" />
              Tamil Nadu District *
            </Label>
            <select
              value={formData.location}
              onChange={(e) => updateField('location', e.target.value)}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
              required
            >
              <option value="">Select Tamil Nadu district</option>
              <option value="Chennai">Chennai (Metro)</option>
              <option value="Coimbatore">Coimbatore (Industrial Hub)</option>
              <option value="Salem">Salem (Steel City)</option>
              <option value="Vellore">Vellore (Medical Hub)</option>
              <option value="Thiruvallur">Thiruvallur (Industrial)</option>
              <option value="Kancheepuram">Kancheepuram (Silk City)</option>
              <option value="Chengalpattu">Chengalpattu (IT Corridor)</option>
              <option value="Tiruppur">Tiruppur (Textile Capital)</option>
              <option value="Erode">Erode (Textile Hub)</option>
              <option value="Namakkal">Namakkal (Poultry Hub)</option>
              <option value="Dharmapuri">Dharmapuri (Steel & Mining)</option>
              <option value="Krishnagiri">Krishnagiri (Mango & Granite)</option>
              <option value="Ranipet">Ranipet (Leather & Engineering)</option>
              <option value="Tirupathur">Tirupathur (Silk & Handicrafts)</option>
            </select>
          </div>

          {/* Age Range */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              Target Age Range *
            </Label>
            <select
              value={formData.target_audience.age_group}
              onChange={(e) => updateField('target_audience.age_group', e.target.value)}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
              required
            >
              <option value="">Select age range</option>
              <option value="18-24">18-24 years</option>
              <option value="25-34">25-34 years</option>
              <option value="35-44">35-44 years</option>
              <option value="45-54">45-54 years</option>
              <option value="55-64">55-64 years</option>
            </select>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <Label htmlFor="interests" className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-500" />
              Target Interests (Optional)
            </Label>
            <Input
              id="interests"
              placeholder="e.g., technology, manufacturing, textiles, agriculture"
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
            <select
              value={formData.objectives[0]}
              onChange={(e) => updateField('objectives', e.target.value)}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="">Select your primary goal</option>
              <option value="awareness">Brand Awareness</option>
              <option value="traffic">Drive Website Traffic</option>
              <option value="leads">Generate Leads</option>
              <option value="conversions">Increase Sales</option>
              <option value="engagement">Social Engagement</option>
            </select>
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
              "🤖 Generate Tamil Nadu AI Recommendations"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
