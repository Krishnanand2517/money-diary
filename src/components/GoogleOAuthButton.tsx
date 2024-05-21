"use client";

import { createClient } from "@/utils/supabase/client";

const GoogleOAuthButton = () => {
  const handleGoogleOAuth = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div>
      <button
        onClick={handleGoogleOAuth}
        className="btn btn-info text-base px-6"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleOAuthButton;
