import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import LoginButton from "./Login.jsx";
import LogoutButton from "./Logout.jsx";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  // Log user object and access token after authentication
  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        console.log("Full User Object:", user); // Full profile info from OAuth

        try {
          const token = await getAccessTokenSilently();
          console.log("Access Token (JWT):", token);

          // Decode JWT payload to see additional claims
          const payload = JSON.parse(atob(token.split(".")[1]));
          console.log("Decoded Access Token Payload:", payload);
        } catch (error) {
          console.error("Error fetching access token:", error);
        }
      }
    };
    fetchToken();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-600 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center w-full justify-center min-h-screen bg-gray-600 px-4">
      <div className="flex flex-col items-center justify-center w-full max-w-xs sm:max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8 text-center">
        {isAuthenticated ? (
          <>
            {/* Profile Info */}
            <img
              src={user.picture}
              alt={user.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-md mb-4"
            />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {user.name}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              {user.email}
            </p>

            {/* Logout Button */}
            <div className="w-full sm:w-auto">
              <LogoutButton />
            </div>
          </>
        ) : (
          <>
            {/* Guest Layout */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Welcome, Guest 👋
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Please log in to access your profile.
            </p>

            {/* Login Button */}
            <div className="w-full sm:w-auto">
              <LoginButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
