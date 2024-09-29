import React, { useState, useEffect } from 'react';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    profilePicture: null,
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profile'));
    if (savedProfile) {
      setProfile(savedProfile);
    } else {
      setProfile({
        username: 'JohnDoe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        password: '',
        profilePicture: null,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, profilePicture: URL.createObjectURL(e.target.files[0]) });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!validateEmail(profile.email)) {
      formErrors.email = 'Invalid email address';
    }

    if (profile.password && profile.password.length < 8) {
      formErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      localStorage.setItem('profile', JSON.stringify(profile));
      alert('Profile updated successfully!');
    }
  };

  return (
    <div className="flex-1 min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-orange-500">Profile Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className={`w-full p-3 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">New Password</label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleInputChange}
              className={`w-full p-3 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900`}
              placeholder="Leave blank to keep the current password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {profile.profilePicture && (
              <img
                src={profile.profilePicture}
                alt="Profile Preview"
                className="mt-4 w-32 h-32 object-cover rounded-full"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
