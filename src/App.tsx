import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductivityDashboard from './components/ProductivityDashboard';
import LocationTracker from './components/LocationTracker';
import NetworkMonitor from './components/NetworkMonitor';
import ActivityTracker from './components/ActivityTracker';

import { LocationData, NetworkInfo, ActivityData } from './types';
import { useBackgroundTasks } from './hooks/useBackgroundTasks';
import { useNetworkInfo } from './hooks/useNetworkInfo';
import { useGeolocation } from './hooks/useGeolocation';

function App() {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [isWorkingHours, setIsWorkingHours] = useState(false);
  
  const networkInfo = useNetworkInfo();
  const location = useGeolocation();
  

  useBackgroundTasks(() => {
    const now = Date.now();
    const dayAgo = now - 24 * 60 * 60 * 1000;
    setActivityData(prev => prev.filter(item => item.timestamp > dayAgo));
  });

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    setIsWorkingHours(hours >= 9 && hours <= 18);
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      setLocationData({
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp: Date.now(),
        isAtWorkLocation: checkIfAtWorkLocation(location.latitude, location.longitude)
      });
    }
  }, [location]);

  const checkIfAtWorkLocation = (lat: number, lng: number): boolean => {
  // Set these to your actual current latitude and longitude
  const workLat = 30.2708;
  const workLng = 78.0036;
  const threshold = 0.01; // ~1km radius

  const distance = Math.sqrt(
    Math.pow(lat - workLat, 2) + Math.pow(lng - workLng, 2)
  );

  return distance <= threshold;
};

  const handleActivityUpdate = (activity: ActivityData) => {
    setActivityData(prev => [...prev, activity]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
   
          <div className="space-y-6 lg:col-span-1">
            <LocationTracker 
              locationData={locationData}
              isWorkingHours={isWorkingHours}
            />
            <NetworkMonitor networkInfo={networkInfo} />
            <ActivityTracker 
              onActivityUpdate={handleActivityUpdate}
              activityData={activityData}
            />
          </div>
          
       
          <div className="space-y-6 lg:col-span-2">
            <ProductivityDashboard 
              locationData={locationData}
              networkInfo={networkInfo}
              activityData={activityData}
              isWorkingHours={isWorkingHours}
            />
           
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;