"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { toast, Toaster } from "react-hot-toast";

interface UserProfile {
  name: string;
  email: string;
  photo: string;
  location: string;
  skills: string; 
  role: string;
  verified: boolean;
}

export default function ClientProfilePage() {
  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    email: "",
    photo: "",
    location: "",
    skills: "",
    role: "client",
    verified: false,
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user/profile");
      const data = await res.json();

      if (res.ok) {
        setFormData({
          name: data.name || "",
          email: data.email || "",
          photo: data.photo || "",
          location: data.location || "",
          role: data.role || "client",
          verified: data.verified || false,
          skills: Array.isArray(data.skills) ? data.skills.join(", ") : "",
        });
      }
    } catch (error) {
      toast.error("Could not load profile data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    const skillsArray = formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");

    const payload = {
      name: formData.name,
      location: formData.location,
      photo: formData.photo,
      skills: skillsArray,
    };

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
       
        const updatedData = await res.json();
        if (updatedData.profile) {
            setFormData(prev => ({
                ...prev,
                ...updatedData.profile,
                skills: Array.isArray(updatedData.profile.skills) ? updatedData.profile.skills.join(", ") : ""
            }));
        }
      } else {
        const errData = await res.json();
        throw new Error(errData.error || "Update failed");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-slate-500 font-medium">Loading your account...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <Toaster position="top-right" />
      
      <div className="max-w-xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="avatar relative">
            <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden shadow-xl bg-slate-200 relative">
              <Image
                src={formData.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || "User")}`}
                alt={`${formData.name}'s profile`}
                fill 
                sizes="112px"
                className="object-cover"
                priority 
              />
            </div>
            {formData.verified && (
              <div className="absolute bottom-0 right-0 z-10 bg-blue-500 text-white rounded-full p-1 border-2 border-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.607.309 1.183.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <h1 className="mt-4 text-2xl font-black text-slate-900 uppercase tracking-tight">{formData.name}</h1>
          <div className="flex gap-2 mt-1">
            <span className="badge badge-ghost badge-sm text-slate-500">{formData.email}</span>
            <span className="badge badge-primary badge-sm uppercase font-bold">{formData.role}</span>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-800 border-b pb-4">Personal Information</h2>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-slate-600">Full Name</span>
            </label> <br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="input input-bordered focus:border-primary h-12"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-slate-600">Location</span>
            </label> <br />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Area"
              className="input input-bordered focus:border-primary h-12"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-slate-600">Skills (Separate with commas)</span>
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. Graphic Design, Data Entry"
              className="input input-bordered focus:border-primary h-12"
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={updating}
              className={`btn btn-primary w-full h-14 rounded-2xl text-lg shadow-lg ${updating ? 'loading' : ''}`}
            >
              {updating ? "Saving Changes..." : "Update Profile"}
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn btn-ghost w-full mt-2 h-12 text-slate-400 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}