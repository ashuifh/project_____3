import React, { useEffect, useRef, useState } from 'react';
import { Eye, Timer, TrendingUp } from 'lucide-react';
import { ActivityData } from '../types';

interface ActivityTrackerProps {
  onActivityUpdate: (activity: ActivityData) => void;
  activityData: ActivityData[];
}

const ActivityTracker: React.FC<ActivityTrackerProps> = ({ 
  onActivityUpdate, 
  activityData 
}) => {
  const [currentSection, setCurrentSection] = useState<string>('header');
  const [timeInSection, setTimeInSection] = useState<number>(0);
  const sectionRefs = useRef<{ [key: string]: HTMLElement }>({});
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section') || 'unknown';
            setCurrentSection(sectionName);
            setTimeInSection(0);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeInSection(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSection]);

  useEffect(() => {
    if (timeInSection > 0 && timeInSection % 10 === 0) {
      // Record activity every 10 seconds
      const activity: ActivityData = {
        id: Date.now().toString(),
        type: 'focus',
        duration: 10,
        timestamp: Date.now(),
        section: currentSection
      };
      onActivityUpdate(activity);
    }
  }, [timeInSection, currentSection, onActivityUpdate]);

  const getTotalTimeToday = () => {
    const today = new Date().toDateString();
    return activityData
      .filter(activity => new Date(activity.timestamp).toDateString() === today)
      .reduce((total, activity) => total + activity.duration, 0);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Eye className="w-5 h-5 mr-2 text-blue-600" />
          Activity Tracker
        </h3>
        <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Active
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Timer className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">Current Section</p>
            <p className="text-sm font-medium text-gray-900">
              {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Time in Section</p>
            <p className="text-sm font-medium text-gray-900">
              {formatTime(timeInSection)}
            </p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500">Total Today</p>
            <p className="text-sm font-medium text-gray-900">
              {formatTime(getTotalTimeToday())}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <TrendingUp className="w-4 h-4" />
          <span>
            {activityData.length} activities recorded
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityTracker;