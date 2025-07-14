import React from 'react';
import { BarChart3, Target, Zap, Clock } from 'lucide-react';
import { LocationData, NetworkInfo, ActivityData } from '../types';

interface ProductivityDashboardProps {
  locationData: LocationData | null;
  networkInfo: NetworkInfo | null;
  activityData: ActivityData[];
  isWorkingHours: boolean;
}

const ProductivityDashboard: React.FC<ProductivityDashboardProps> = ({
  locationData,
  networkInfo,
  activityData,
  isWorkingHours
}) => {
  const calculateProductivityScore = (): number => {
    let score = 0;
    
    
    if (locationData?.isAtWorkLocation && isWorkingHours) score += 30;
    
    
    if (networkInfo) {
      const { effectiveType, downlink, rtt } = networkInfo;
      if (effectiveType === '4g' && downlink > 10 && rtt < 100) score += 20;
      else if (effectiveType === '4g' && downlink > 5) score += 15;
      else if (effectiveType === '3g') score += 10;
    }
    
    
    const today = new Date().toDateString();
    const todayActivities = activityData.filter(
      activity => new Date(activity.timestamp).toDateString() === today
    );
    
    if (todayActivities.length > 0) {
      const totalTime = todayActivities.reduce((sum, activity) => sum + activity.duration, 0);
      const focusRatio = todayActivities.filter(a => a.type === 'focus').length / todayActivities.length;
      score += Math.min(50, (totalTime / 3600) * 10 + focusRatio * 20);
    }
    
    return Math.min(100, score);
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number): string => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const productivityScore = calculateProductivityScore();

  return (
    <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl" data-section="dashboard">
      <div className="flex items-center justify-between mb-6">
        <h3 className="flex items-center text-lg font-semibold text-gray-900">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
          Productivity Dashboard
        </h3>
        <div className={`px-4 py-2 rounded-lg ${getScoreBackground(productivityScore)}`}>
          <span className={`text-sm font-bold ${getScoreColor(productivityScore)}`}>
            {productivityScore.toFixed(0)}%
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="text-center">
          <div className="inline-block p-3 mb-3 bg-blue-100 rounded-lg">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="mb-1 text-sm font-medium text-gray-900">Location Score</h4>
          <p className="text-2xl font-bold text-gray-900">
            {locationData?.isAtWorkLocation && isWorkingHours ? '100%' : '0%'}
          </p>
          <p className="text-xs text-gray-500">
            {locationData?.isAtWorkLocation && isWorkingHours ? 'At work location' : 'Away from work'}
          </p>
        </div>
        
        <div className="text-center">
          <div className="inline-block p-3 mb-3 bg-green-100 rounded-lg">
            <Zap className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="mb-1 text-sm font-medium text-gray-900">Network Quality</h4>
          <p className="text-2xl font-bold text-gray-900">
            {networkInfo ? `${networkInfo.effectiveType.toUpperCase()}` : 'N/A'}
          </p>
          <p className="text-xs text-gray-500">
            {networkInfo ? `${networkInfo.downlink} Mbps` : 'No data'}
          </p>
        </div>
        
        <div className="text-center">
          <div className="inline-block p-3 mb-3 bg-purple-100 rounded-lg">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="mb-1 text-sm font-medium text-gray-900">Active Time</h4>
          <p className="text-2xl font-bold text-gray-900">
            {activityData.reduce((total, activity) => total + activity.duration, 0)}s
          </p>
          <p className="text-xs text-gray-500">
            {activityData.length} activities
          </p>
        </div>
      </div>
      
      <div className="p-4 mt-6 rounded-lg bg-gray-50">
        <h4 className="mb-2 text-sm font-medium text-gray-900">Productivity Insights</h4>
        <div className="space-y-2">
          {productivityScore >= 80 && (
            <p className="text-sm text-green-600"> Excellent productivity! Keep up the great work.</p>
          )}
          {productivityScore >= 60 && productivityScore < 80 && (
            <p className="text-sm text-yellow-600"> Good productivity. Consider improving network quality or location compliance.</p>
          )}
          {productivityScore < 60 && (
            <p className="text-sm text-red-600">Productivity could be improved. Check your location and network connection.</p>
          )}
          
          {!isWorkingHours && (
            <p className="text-sm text-gray-500">Currently outside working hours (9 AM - 6 PM)</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductivityDashboard;