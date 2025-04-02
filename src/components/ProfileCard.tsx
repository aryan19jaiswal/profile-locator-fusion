
import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Profile } from "@/types";
import { Link } from "react-router-dom";
import { useProfiles } from "@/context/ProfileContext";

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const { selectProfile } = useProfiles();

  return (
    <Card className="w-full border border-lightGray hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-4 pb-2 space-y-2">
        <div className="flex items-center space-x-4">
          <img 
            src={profile.avatar} 
            alt={`${profile.name}'s avatar`} 
            className="w-16 h-16 rounded-full object-cover border-2 border-softBlue"
          />
          <div>
            <h3 className="text-lg font-bold">{profile.name}</h3>
            {profile.profession && (
              <p className="text-sm text-mediumGray">{profile.profession}</p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm mb-3">{profile.description}</p>
        <div className="flex items-center text-sm text-mediumGray">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">{profile.address}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => selectProfile(profile)}
        >
          Show on Map
        </Button>
        <Link to={`/profile/${profile.id}`}>
          <Button variant="default" size="sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
