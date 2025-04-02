
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useProfiles } from "@/context/ProfileContext";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useProfiles();

  return (
    <div className="relative w-full max-w-lg">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mediumGray h-4 w-4" />
      <Input
        type="text"
        placeholder="Search profiles by name, profession, or location..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-deepBlue"
      />
    </div>
  );
};

export default SearchBar;
