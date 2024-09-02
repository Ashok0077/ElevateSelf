import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { useParams } from "react-router-dom";
import profileImg from "../assets/profileImg.webp";

const UserProfile = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + id);
      setUsername(res.data.username);
      setEmail(res.data.email);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + id);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUserPosts();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] px-4 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        {/* User Posts Section */}
        <div className="flex flex-col md:w-[60%] w-full mt-8 md:mt-0 mb-14">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            User's Posts:
          </h1>
          {posts?.map((p) => (
            <ProfilePosts key={p._id} p={p} />
          ))}
        </div>

        {/* Profile Information Section */}
        <div className="md:sticky md:top-12 p-4 flex flex-col md:items-end items-start md:w-[40%] w-full transition-all duration-300">
          <div className="flex flex-col space-y-4 items-start bg-white p-6 md:p-8 shadow-lg rounded-md w-full md:w-auto">
            <div className="flex items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
              <img
                src={profileImg}
                alt="Profile"
                className="h-12 w-12 ml-3 object-cover rounded-full"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-md w-full hover:shadow-md transition-all duration-300">
              <p className="text-lg text-gray-700 font-semibold">
                Username: {username}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md w-full hover:shadow-md transition-all duration-300">
              <p className="text-lg text-gray-700 font-semibold">
                Email: {email}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
