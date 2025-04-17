import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [userPhoto, setUserPhoto] = useState("");


  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) return;

      setUser(user);

      // Load existing partner profile (if any)
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setProfileExists(true);
        setFullName(data.full_name || "");
        setBio(data.bio || "");
        setUserPhoto(data.photo_url || "");
      }
    };

    fetchUserAndProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!user) return;

    const payload = {
      user_id: user.id,
      full_name: fullName,
      bio,
    };

    let response;

    if (profileExists) {
      response = await supabase
        .from("partners")
        .update(payload)
        .eq("user_id", user.id);
    } else {
      response = await supabase.from("partners").insert(payload);
    }

    if (response.error) {
      alert("Error saving profile: " + response.error.message);
    } else {
      alert("Profile saved!");
      setProfileExists(true);
    }

    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
  
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;
  
    const { error: uploadError } = await supabase.storage
      .from("profile-photos")
      .upload(filePath, file, { upsert: true });
  
    if (uploadError) {
      alert("Upload error: " + uploadError.message);
      return;
    }
  
    const { data } = supabase.storage
      .from("profile-photos")
      .getPublicUrl(filePath);
  
    const publicUrl = data?.publicUrl;
    setUserPhoto(publicUrl);
  
    await supabase
      .from("partners")
      .update({ photo_url: publicUrl })
      .eq("user_id", user.id);
  };
    
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Partner Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Bio"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />


        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : profileExists ? "Update Profile" : "Create Profile"}
        </button>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4"
        />
        {userPhoto && (
          <img
            src={userPhoto}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
        )}

      </form>
    </div>
  );
}
