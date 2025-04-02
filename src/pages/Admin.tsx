
import React, { useState } from "react";
import { useProfiles } from "@/context/ProfileContext";
import ProfileForm from "@/components/ProfileForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Profile, ProfileFormData } from "@/types";
import { ArrowLeft, Edit, Trash } from "lucide-react";

const Admin = () => {
  const { profiles, loading, addProfile, updateProfile, deleteProfile } = useProfiles();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [deletingProfile, setDeletingProfile] = useState<Profile | null>(null);

  const handleAddSubmit = (data: ProfileFormData) => {
    addProfile(data);
    setShowAddForm(false);
  };

  const handleEditSubmit = (data: ProfileFormData) => {
    if (editingProfile) {
      updateProfile(editingProfile.id, data);
      setEditingProfile(null);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingProfile) {
      deleteProfile(deletingProfile.id);
      setDeletingProfile(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-navy text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="text-white p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <Button onClick={() => setShowAddForm(true)}>
            Add New Profile
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-lightGray">
            <h2 className="text-xl font-bold">Manage Profiles</h2>
            <p className="text-mediumGray">Add, edit, or remove profile information</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-lightGray">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Profession</th>
                  <th className="px-4 py-3 text-left">Address</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile) => (
                  <tr key={profile.id} className="border-b border-lightGray hover:bg-gray-50">
                    <td className="px-4 py-3">{profile.name}</td>
                    <td className="px-4 py-3">{profile.profession || "-"}</td>
                    <td className="px-4 py-3">{profile.address}</td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingProfile(profile)}
                        className="text-deepBlue mr-2"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingProfile(profile)}
                        className="text-red-500"
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </td>
                  </tr>
                ))}
                {profiles.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-mediumGray">
                      No profiles found. Click "Add New Profile" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Profile Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add New Profile</DialogTitle>
          </DialogHeader>
          <ProfileForm
            onSubmit={handleAddSubmit}
            onCancel={() => setShowAddForm(false)}
            isLoading={loading}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={!!editingProfile} onOpenChange={(open) => !open && setEditingProfile(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          {editingProfile && (
            <ProfileForm
              profile={editingProfile}
              onSubmit={handleEditSubmit}
              onCancel={() => setEditingProfile(null)}
              isLoading={loading}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog 
        open={!!deletingProfile} 
        onOpenChange={(open) => !open && setDeletingProfile(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the profile for {deletingProfile?.name}. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
