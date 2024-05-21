"use client";

import Image from "next/image";
import { Provider } from "@supabase/supabase-js";

import { createClient } from "@/utils/supabase/client";

import GoogleLogo from "../../public/Google_Logo.svg";
import MicrosoftLogo from "../../public/Microsoft_Logo.svg";
import GitHubLogo from "../../public/GitHub_Logo.svg";

const OAuthButton = ({ provider }: { provider: Provider }) => {
  const showProviderDisplayName = () => {
    switch (provider) {
      case "google":
        return "Google";

      case "azure":
        return "Microsoft";

      case "github":
        return "GitHub";
    }
  };

  const showProviderLogo = () => {
    switch (provider) {
      case "google":
        return GoogleLogo;

      case "azure":
        return MicrosoftLogo;

      case "github":
        return GitHubLogo;
    }
  };

  const handleOAuth = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div>
      <button
        onClick={handleOAuth}
        className="btn btn-outline btn-square rounded-lg"
      >
        <Image
          src={showProviderLogo()}
          alt={showProviderDisplayName() || "Auth Button"}
          height={provider === "azure" ? 20 : 25}
          width={provider === "azure" ? 20 : 25}
          className={`${provider === "github" && "bg-white rounded-full"}`}
        />
        {/* Continue with {showProviderDisplayName()} */}
      </button>
    </div>
  );
};

export default OAuthButton;
