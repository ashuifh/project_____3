export interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: number;
  isAtWorkLocation: boolean;
}

export interface NetworkInfo {
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
}

export interface ActivityData {
  id: string;
  type: 'focus' | 'break' | 'distraction';
  duration: number;
  timestamp: number;
  section: string;
}

export interface ProductivityMetrics {
  focusTime: number;
  breakTime: number;
  distractionTime: number;
  locationCompliance: number;
  networkQuality: number;
}