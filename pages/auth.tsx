import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";


export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [message, setMessage] = useState("");
  const router = useRouter();


  useEffect(() => {
    supabase.auth
      .getSession()
      .then((res) => console.log("Session:", res))
      .catch((err) => console.error("Auth error:", err));
  }, []);

  const handleAuth = async () => {
    setLoading(true);
    setMessage("");
  
    const { error } =
      mode === "signup"
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });
  
    if (error) {
      setMessage(error.message);
    } else {
      if (mode === "login") {
        router.push("/profile"); // 👈 redirect immediately after login
      } else {
        setMessage("Check your email to confirm your account.");
      }
    }
  
    setLoading(false);
  };
  

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{mode === "signup" ? "Sign Up" : "Log In"}</h1>
      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="w-full p-2 border rounded mb-4"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        onClick={handleAuth}
        disabled={loading}
        className="bg-green-600 text-white w-full py-2 rounded"
      >
        {loading ? "Processing..." : mode === "signup" ? "Sign Up" : "Log In"}
      </button>
      <p className="text-sm mt-4">
        {mode === "signup" ? "Have an account?" : "Need an account?"}{" "}
        <button
          className="text-green-600 underline"
          onClick={() => setMode(mode === "signup" ? "login" : "signup")}
        >
          Switch
        </button>
      </p>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
}
