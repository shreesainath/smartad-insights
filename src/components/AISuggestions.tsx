import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Lightbulb, TrendingUp, Target, Globe, Calendar, Sparkles, Monitor, Loader2 } from "lucide-react";

interface AISuggestionsProps {
  recommendations: any;
  loading?: boolean;
}

function AISuggestions({ recommendations, loading }: AISuggestionsProps) {
  if (loading) {
    return (
      <Card className="h-fit border shadow-sm">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-lg font-medium">Generating AI Recommendations...</span>
          </div>
          <p className="text-gray-500 mt-2">
            🤖 Analyzing your campaign data with advanced AI algorithms
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!recommendations) {
    return (
      <Card className="h-fit border shadow-sm">
        <CardContent className="p-8 text-center space-y-4">
          <Sparkles className="h-12 w-12 text-blue-600 mx-auto opacity-50" />
          <div>
            <h3 className="text-lg font-semibold text-gray-600">Ready for AI Magic?</h3>
            <p className="text-gray-500 mt-1">
              Fill out the campaign form to get personalized AI recommendations
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            AI Recommendations
          </h2>
        </div>
        <p className="text-gray-600">
          🤖 AI-powered insights with {(recommendations.confidence_score * 100).toFixed(0)}% confidence
        </p>
      </div>

      {/* Platform Recommendations */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Monitor className="h-5 w-5 text-blue-600" />
            </div>
            Recommended Platform
          </CardTitle>
          <CardDescription>
            🎯 AI-selected platform optimized for your campaign
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold capitalize">
                    {recommendations.recommended_platform?.replace('_', ' ') || 'Platform Analysis'}
                  </h4>
                  <Badge className="text-xs bg-blue-100 text-blue-700">
                    Primary
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Optimized based on your target audience and campaign goals
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">
                {(recommendations.confidence_score * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-500">Confidence</div>
            </div>
          </div>

          {/* Platform Scores */}
          {recommendations.platform_scores && (
            <div className="mt-4 space-y-2">
              <h5 className="font-medium text-sm text-gray-600">Platform Performance Scores</h5>
              {Object.entries(recommendations.platform_scores).map(([platform, score]: [string, any]) => (
                <div key={platform} className="flex justify-between items-center">
                  <span className="text-sm capitalize">{platform.replace('_', ' ')}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${score * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{(score * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Budget Allocation */}
      {recommendations.budget_allocation && (
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              Budget Allocation
            </CardTitle>
            <CardDescription>
              💰 Smart budget distribution across platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(recommendations.budget_allocation).map(([platform, allocation]: [string, any]) => (
                <div key={platform} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium capitalize">{platform.replace('_', ' ')}</span>
                  <div className="text-right">
                    <div className="font-bold text-green-600">${allocation.amount}</div>
                    <div className="text-xs text-gray-500">({allocation.percentage}%)</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ad Copy Suggestions */}
      {recommendations.ad_copy_suggestions && (
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Lightbulb className="h-5 w-5 text-purple-600" />
              </div>
              Ad Copy Suggestions
            </CardTitle>
            <CardDescription>
              ✍️ AI-generated copy optimized for engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.ad_copy_suggestions.map((copy: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Target className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{copy}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Optimal Timing */}
      {recommendations.optimal_timing && (
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              Optimal Timing
            </CardTitle>
            <CardDescription>
              ⏰ Best times to run your campaign
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-sm mb-2">Best Days</h5>
                <div className="flex flex-wrap gap-1">
                  {recommendations.optimal_timing.best_days?.map((day: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {day}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium text-sm mb-2">Best Hours</h5>
                <div className="flex flex-wrap gap-1">
                  {recommendations.optimal_timing.best_hours?.map((hour: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {hour}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Predictions */}
      {recommendations.performance_predictions && (
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              Performance Predictions
            </CardTitle>
            <CardDescription>
              📈 Expected campaign performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {recommendations.performance_predictions.estimated_reach?.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Estimated Reach</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {(recommendations.performance_predictions.estimated_ctr * 100)?.toFixed(2)}%
                </div>
                <div className="text-sm text-gray-600">Expected CTR</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {recommendations.performance_predictions.estimated_conversions}
                </div>
                <div className="text-sm text-gray-600">Est. Conversions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Info */}
      <div className="text-center text-xs text-gray-500">
        Generated at: {new Date(recommendations.generated_at).toLocaleString()}
      </div>
    </div>
  );
}

export default AISuggestions;
