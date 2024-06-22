export interface News {
  author: string,
  content: string,
  description: string,
  publishedAt: string,
  source: {
    id: string,
    name: string
  },
  title: String,
  url: string,
  urlToImage: string
}

export type NewsArray = {
  newsData: [News]
}

export interface Port {
  COORDINATES: [number, number];
  COUNTRY: string;
  LOCODE: string;
  NAME: string;
  SEARCH_PARAMETER: string;
  STATUS: string;
}

export interface PortData {
  loading: string,
  portData: Port[],
  searchData: string[],
}

export interface userData {
  userId: String,
  userName: String,
  email: String,
  profileImage: String
}

type FindCoordinatesType = (srcIndex: [number, number], destIndex: [number, number] ,srcValue:string |null,destValue:string|null,srcCode:string|null,destCode:string|null) => void;

export interface MapInputLayerProps {
  findCoordinates: FindCoordinatesType,
  getPath: (allowPanama:boolean,allowSuez:boolean,allowIceCaps:boolean) => void; 
  midPoints:any,
  durationInfo:any
}

export interface MapProps {
  srcCoordinate: [number, number];
  destCoordinate: [number, number];
  pathCoordinates:any,
  midPoints:any
}

export type PathCoordinates = {
  srcCoordinate: [number, number];
  destCoordinate: [number, number];
};

export interface Location {
  srcCoordinates: string;
  destCoordinates: string;
  allowPanama: boolean;
  allowSuez: boolean;
  blockIceCaps: boolean;
};

export interface WeatherData {
  latitude: number;
  longitude: number;
  distance: number;
  duration: number;
  timestamp: number;
  type: string;
  properties: any;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  direction: number;
  weather: {
    latitude: number;
    longitude: number;
    timestamp: number;
    air: {
      temperature: {
        value: number;
        last3Hours: { max: number; min: number };
        daily: { max: number; min: number };
      };
      humidity: number;
      pressure: number;
    };
    precipitation: {
      last3Hours: { cumulative: number; mean: number };
    };
    wave: {
      height: null;
      period: null;
      length: null;
      direction: null;
      vector: { u: number; v: number };
      speed: null;
    };
    water: {
      temperature: {
        value: number;
        daily: { max: number; min: number };
      };
      salinity: null;
    };
    current: {
      direction: null;
      vector: { u: null; v: null };
      speed: null;
    };
    wind: {
      direction: number;
      vector: { u: number; v: number };
      gust: number;
      speed: number;
      beaufort: number;
    };
    condition: { overall: string };
    cloudCoverage: number;
    iceCoverage: number;
    isLand: boolean;
  };
}

export interface ChartProps {
  data: WeatherData[];
}