export interface MapSettings {
  width: string;
  height: string;
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface UserGuess {
  lat: number;
  lng: number;
  distance?: number;
  score?: number;
}

export interface Location {
  images: string[];
  title: string;
  lat: number;
  lng: number;
}

export interface Game {
  id: string;
  guesses: UserGuess[];
  locations: Location[];
  currentTurn: number;
  createdAt: string;
  updatedAt: string;
}
