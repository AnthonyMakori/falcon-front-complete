import React from 'react';

const ProfilePage = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-center mb-8">
          <img
            src="profile-picture.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-600 object-cover"
          />
        </div>
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">User Profile</h2>

        {/* Profile Information Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-700">Personal Information</h3>
          <div className="mt-4 space-y-2">
            <p className="text-lg text-gray-600"><strong>Name:</strong> John Doe</p>
            <p className="text-lg text-gray-600"><strong>Email:</strong> john.doe@example.com</p>
            <p className="text-lg text-gray-600"><strong>Phone:</strong> +1234567890</p>
          </div>
        </div>

        {/* Payment History Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-700">Payment History</h3>
          <div className="mt-4">
            <ul className="space-y-4">
              <li className="text-lg text-gray-600 hover:bg-gray-100 p-3 rounded-lg transition duration-300">
                <span className="font-semibold">Payment #1:</span> $10 for "Movie Title" on 01/01/2025
              </li>
              <li className="text-lg text-gray-600 hover:bg-gray-100 p-3 rounded-lg transition duration-300">
                <span className="font-semibold">Payment #2:</span> $15 for "Another Movie" on 15/12/2024
              </li>
            </ul>
          </div>
        </div>

        {/* Watched Movies Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-700">Watched Movies</h3>
          <div className="mt-4">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <li className="bg-gray-100 p-6 rounded-lg transition-transform transform hover:scale-105">
                <img src="movie-thumbnail.jpg" alt="Movie 1" className="w-full h-40 object-cover rounded-md" />
                <p className="text-center text-gray-600 mt-2">Movie Title 1</p>
              </li>
              <li className="bg-gray-100 p-6 rounded-lg transition-transform transform hover:scale-105">
                <img src="movie-thumbnail.jpg" alt="Movie 2" className="w-full h-40 object-cover rounded-md" />
                <p className="text-center text-gray-600 mt-2">Movie Title 2</p>
              </li>
              <li className="bg-gray-100 p-6 rounded-lg transition-transform transform hover:scale-105">
                <img src="movie-thumbnail.jpg" alt="Movie 3" className="w-full h-40 object-cover rounded-md" />
                <p className="text-center text-gray-600 mt-2">Movie Title 3</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
