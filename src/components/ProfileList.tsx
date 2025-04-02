
import React from "react";
import ProfileCard from "./ProfileCard";
import LoadingSpinner from "./LoadingSpinner";
import { useProfiles } from "@/context/ProfileContext";

const ProfileList = () => {
  const { filteredProfiles, loading } = useProfiles();

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (filteredProfiles.length === 0) {
    return (
      <div className="h-full flex justify-center items-center">
        <p className="text-mediumGray">No profiles found. Try adjusting your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-full pb-4">
      {filteredProfiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default ProfileList;
