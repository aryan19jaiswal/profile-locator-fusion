import React, { createContext, useState, useContext, useEffect } from "react";
import { Profile, ProfileFormData } from "../types";
import { profiles as initialProfiles } from "../data/profiles";
import { toast } from "sonner";

interface ProfileContextType {
  profiles: Profile[];
  loading: boolean;
  filteredProfiles: Profile[];
  selectedProfile: Profile | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectProfile: (profile: Profile) => void;
  clearSelectedProfile: () => void;
  addProfile: (profile: ProfileFormData) => void;
  updateProfile: (id: string, profile: ProfileFormData) => void;
  deleteProfile: (id: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [loading, setLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProfiles = profiles.filter(profile => {
    const searchLower = searchQuery.toLowerCase();
    return (
      profile.name.toLowerCase().includes(searchLower) ||
      profile.description.toLowerCase().includes(searchLower) ||
      profile.address.toLowerCase().includes(searchLower) ||
      (profile.profession && profile.profession.toLowerCase().includes(searchLower))
    );
  });

  const selectProfile = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  const clearSelectedProfile = () => {
    setSelectedProfile(null);
  };

  const addProfile = (profileData: ProfileFormData) => {
    setLoading(true);
    
    setTimeout(() => {
      const newProfile: Profile = {
        ...profileData,
        id: Date.now().toString(),
      };
      
      setProfiles([...profiles, newProfile]);
      setLoading(false);
      toast.success("Profile added successfully");
    }, 800);
  };

  const updateProfile = (id: string, profileData: ProfileFormData) => {
    setLoading(true);
    
    setTimeout(() => {
      const updatedProfiles = profiles.map(profile => 
        profile.id === id ? { ...profileData, id } : profile
      );
      
      setProfiles(updatedProfiles);
      
      if (selectedProfile?.id === id) {
        setSelectedProfile({ ...profileData, id });
      }
      
      setLoading(false);
      toast.success("Profile updated successfully");
    }, 800);
  };

  const deleteProfile = (id: string) => {
    setLoading(true);
    
    setTimeout(() => {
      setProfiles(profiles.filter(profile => profile.id !== id));
      
      if (selectedProfile?.id === id) {
        setSelectedProfile(null);
      }
      
      setLoading(false);
      toast.success("Profile deleted successfully");
    }, 800);
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        loading,
        filteredProfiles,
        selectedProfile,
        searchQuery,
        setSearchQuery,
        selectProfile,
        clearSelectedProfile,
        addProfile,
        updateProfile,
        deleteProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfiles = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfiles must be used within a ProfileProvider");
  }
  return context;
};
