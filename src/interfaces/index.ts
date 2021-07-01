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
  active: boolean;
  currentScore: number;
  locations: Location[];
  currentTurn: number;
  guesses: UserGuess[];
  id: string;
  userID: string;
  createdAt: string;
  updatedAt: string;
}

export interface Leaderboard {
  exp: number;
  userEmail: string;
  username: string;
  scoreGameRatio: number;
  currentScore: number;
  userTotalGameCounter: number;
  currentLevel: number;
}
