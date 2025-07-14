import React from 'react';
import { MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { LocationData } from '../types';

interface LocationTrackerProps {
  locationData: LocationData | null;
  isWorkingHours: boolean;
}

const LocationTracker: React.FC<LocationTrackerProps> = ({ 
  locationData, 
  isWorkingHours 
}) => {
  const getStatusColor = () => {
    if (!locationData) return 'bg-gray-100 text-gray-600';
    if (locationData.isAtWorkLocation && isWorkingHours) return 'bg-green-100 text-green-800';
    if (!locationData.isAtWorkLocation && isWorkingHours) return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getStatusMessage = () => {
    if (!locationData) return 'Location not available';
    if (locationData.isAtWorkLocation && isWorkingHours) return 'At work location';
    if (!locationData.isAtWorkLocation && isWorkingHours) return 'Away from work';
    return 'Outside work hours';
  };

  const getStatusIcon = () => {
    if (!locationData) return <AlertCircle className="w-5 h-5" />;
    if (locationData.isAtWorkLocation && isWorkingHours) return <CheckCircle className="w-5 h-5" />;
    return <AlertCircle className="w-5 h-5" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          Location Status
        </h3>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {getStatusMessage()}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <p className="text-sm font-medium text-gray-900">Current Status</p>
            <p className="text-xs text-gray-500">{getStatusMessage()}</p>
          </div>
        </div>
        
        {locationData && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500">Latitude</p>
              <p className="text-sm font-medium text-gray-900">
                {locationData.latitude.toFixed(4)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Longitude</p>
              <p className="text-sm font-medium text-gray-900">
                {locationData.longitude.toFixed(4)}
              </p>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Clock className="w-4 h-4" />
          <span>
            Working Hours: 9:00 AM - 6:00 PM
          </span>
        </div>
      </div>
    </div>
  );
};

export default LocationTracker;