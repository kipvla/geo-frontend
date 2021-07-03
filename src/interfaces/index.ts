export interface MapSettings {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

export interface User {
  username: string;
  friendsList: any[];
  friendRequests: any[];
  gameInvites: any[];
  pendingRequests: any[];
  highestScore: number;
  exp: number;
  currentLevel: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
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
  _id: string;
  active: boolean;
  currentTurn: number;
  locations: Location[];
  guesses: UserGuess[];
  userID: string;
  currentScore: number;
  createdAt: string;
  updatedAt: string;
  isMultiplayer?: boolean;
  multiplayerGameID?: string;
  template?: boolean;
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
export interface FriendDetails {
  id: string;
  username: string;
}
