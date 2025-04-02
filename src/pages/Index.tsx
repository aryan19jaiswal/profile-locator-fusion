
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ProfileList from "@/components/ProfileList";
import Map from "@/components/Map";
import { useProfiles } from "@/context/ProfileContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { selectedProfile, clearSelectedProfile } = useProfiles();
  const isMobile = useIsMobile();
  const [showMap, setShowMap] = useState(!isMobile);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-navy text-white p-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Profile Locator</h1>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <SearchBar />
            <Link to="/admin">
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile View Controls */}
      {isMobile && (
        <div className="bg-lightGray p-2">
          <div className="flex gap-2 container mx-auto">
            <Button 
              variant={showMap ? "outline" : "default"}
              onClick={() => setShowMap(false)}
              className="flex-1"
            >
              Profiles
            </Button>
            <Button 
              variant={!showMap ? "outline" : "default"}
              onClick={() => setShowMap(true)}
              className="flex-1"
            >
              Map View
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row p-4 gap-4 h-[calc(100vh-140px)]">
          {/* Profile List Section */}
          {(!isMobile || !showMap) && (
            <div className="md:w-1/3 flex flex-col space-y-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto pr-1">
                <ProfileList />
              </div>
            </div>
          )}

          {/* Map Section */}
          {(!isMobile || showMap) && (
            <div className="flex-1 relative">
              {selectedProfile && isMobile && (
                <div className="absolute top-2 left-2 z-10">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearSelectedProfile}
                    className="bg-white"
                  >
                    Back to All Profiles
                  </Button>
                </div>
              )}
              <Map className="h-full w-full" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
