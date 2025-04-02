
export interface Profile {
  id: string;
  name: string;
  avatar: string;
  description: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  phone?: string;
  email?: string;
  profession?: string;
  skills?: string[];
  interests?: string[];
}

export interface ProfileFormData {
  id?: string;
  name: string;
  avatar: string;
  description: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  phone?: string;
  email?: string;
  profession?: string;
  skills?: string[];
  interests?: string[];
}

export interface MapMarker {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  }
}
