import React, { useState, useEffect } from "react";
import { Profile, ProfileFormData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "sonner";

interface ProfileFormProps {
  profile?: Profile;
  onSubmit: (data: ProfileFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const defaultFormData: ProfileFormData = {
  name: "",
  avatar: "/placeholder.svg",
  description: "",
  address: "",
  location: { lat: 0, lng: 0 },
  phone: "",
  email: "",
  profession: "",
  skills: [],
  interests: []
};

const ProfileForm = ({ profile, onSubmit, onCancel, isLoading }: ProfileFormProps) => {
  const [formData, setFormData] = useState<ProfileFormData>(defaultFormData);
  const [addressFetchError, setAddressFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        avatar: profile.avatar,
        description: profile.description,
        address: profile.address,
        location: profile.location,
        phone: profile.phone || "",
        email: profile.email || "",
        profession: profile.profession || "",
        skills: profile.skills || [],
        interests: profile.interests || []
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(",").map(skill => skill.trim());
    setFormData({ ...formData, skills });
  };

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interests = e.target.value.split(",").map(interest => interest.trim());
    setFormData({ ...formData, interests });
  };

  const handleGeocodeAddress = async () => {
    if (!formData.address) {
      setAddressFetchError("Please enter an address");
      return;
    }

    setAddressFetchError(null);
    
    try {
      const lat = 37.7749 + (Math.random() - 0.5) * 0.1;
      const lng = -122.4194 + (Math.random() - 0.5) * 0.1;
      
      setFormData({ ...formData, location: { lat, lng } });
      toast.success("Address geocoded successfully");
    } catch (error) {
      setAddressFetchError("Failed to geocode address. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (formData.location.lat === 0 && formData.location.lng === 0) {
      toast.error("Please geocode the address to get location coordinates");
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <div>
        <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="profession">Profession</Label>
        <Input
          id="profession"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
        <div className="flex gap-2">
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="flex-grow"
          />
          <Button 
            type="button" 
            onClick={handleGeocodeAddress}
            variant="outline"
          >
            Geocode
          </Button>
        </div>
        {addressFetchError && (
          <p className="text-red-500 text-sm">{addressFetchError}</p>
        )}
        {formData.location.lat !== 0 && (
          <p className="text-sm text-mediumGray">
            Coordinates: {formData.location.lat.toFixed(6)}, {formData.location.lng.toFixed(6)}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="skills">Skills (comma-separated)</Label>
        <Input
          id="skills"
          name="skills"
          value={formData.skills?.join(", ")}
          onChange={handleSkillsChange}
          placeholder="React, TypeScript, UI/UX, etc."
        />
      </div>
      
      <div>
        <Label htmlFor="interests">Interests (comma-separated)</Label>
        <Input
          id="interests"
          name="interests"
          value={formData.interests?.join(", ")}
          onChange={handleInterestsChange}
          placeholder="Hiking, Photography, etc."
        />
      </div>
      
      <div className="flex justify-end gap-4 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
          {profile ? "Update Profile" : "Add Profile"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
