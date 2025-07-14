import React from 'react';
import { Wifi, Signal, Database, Smartphone } from 'lucide-react';
import { NetworkInfo } from '../types';

interface NetworkMonitorProps {
  networkInfo: NetworkInfo | null;
}

const NetworkMonitor: React.FC<NetworkMonitorProps> = ({ networkInfo }) => {
  const getConnectionQuality = () => {
    if (!networkInfo) return 'unknown';
    
    const { effectiveType, downlink, rtt } = networkInfo;
    
    if (effectiveType === '4g' && downlink > 10 && rtt < 100) return 'excellent';
    if (effectiveType === '4g' && downlink > 5 && rtt < 200) return 'good';
    if (effectiveType === '3g' || (downlink > 1 && rtt < 500)) return 'fair';
    return 'poor';
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const quality = getConnectionQuality();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Wifi className="w-5 h-5 mr-2 text-blue-600" />
          Network Status
        </h3>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getQualityColor(quality)}`}>
          {quality.charAt(0).toUpperCase() + quality.slice(1)}
        </div>
      </div>
      
      {networkInfo ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Signal className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Connection Type</p>
                <p className="text-sm font-medium text-gray-900">
                  {networkInfo.effectiveType.toUpperCase()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Database className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Downlink</p>
                <p className="text-sm font-medium text-gray-900">
                  {networkInfo.downlink} Mbps
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Round Trip Time</p>
              <p className="text-sm font-medium text-gray-900">
                {networkInfo.rtt}ms
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Data Saver</p>
                <p className="text-sm font-medium text-gray-900">
                  {networkInfo.saveData ? 'On' : 'Off'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">Network information not available</p>
        </div>
      )}
    </div>
  );
};

export default NetworkMonitor;