
import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProfiles } from "@/context/ProfileContext";
import Map from "@/components/Map";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profiles, loading, selectProfile } = useProfiles();
  
  const profile = profiles.find(p => p.id === id);
  
  // Set the selected profile for the map when this component loads
  useEffect(() => {
    if (profile) {
      selectProfile(profile);
    }
  }, [profile, selectProfile]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
        <p className="text-mediumGray mb-6">The profile you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-navy text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <Button 
            variant="ghost" 
            className="text-white mr-4 p-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src={profile.avatar} 
                  alt={`${profile.name}'s avatar`} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-softBlue"
                />
                <div>
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  {profile.profession && (
                    <p className="text-mediumGray">{profile.profession}</p>
                  )}
                </div>
              </div>
              
              <p className="mb-6">{profile.description}</p>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-deepBlue" />
                  <span>{profile.address}</span>
                </div>
                
                {profile.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-deepBlue" />
                    <a href={`mailto:${profile.email}`} className="text-deepBlue hover:underline">
                      {profile.email}
                    </a>
                  </div>
                )}
                
                {profile.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-deepBlue" />
                    <a href={`tel:${profile.phone}`} className="text-deepBlue hover:underline">
                      {profile.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            {/* Skills Section */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Interests Section */}
            {profile.interests && profile.interests.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-4">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <Badge key={index} variant="outline">{interest}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4 h-[500px]">
              <h3 className="font-bold text-lg mb-2">Location</h3>
              <Map className="h-[450px] w-full" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileDetail;
