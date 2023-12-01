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
    // <div>
    //   <Navbar />
    //   <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
    //     <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
    //       <h1 className="text-xl font-bold mb-4">User's posts:</h1>
    //       {posts?.map((p) => (
    //         <ProfilePosts key={p._id} p={p} />
    //       ))}
    //     </div>
    //     <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
    //       <div className="flex flex-col space-y-4 items-start">
    //         <h1 className="text-xl font-bold mb-4">Profile</h1>
    //         <p className="px-4 py-2 text-gray-500">Username: {username}</p>
    //         <p className="px-4 py-2 text-gray-500">Email: {email}</p>
    //       </div>
    //     </div>
    //       <div className="flex flex-col space-y-4 items-start">
    //         <h1 className="text-2xl font-bold mb-4 text-gray-800">Profile</h1>
    //         <div className="bg-gray-100 p-2 rounded-md hover:shadow-md transition-all duration-300">
    //           <p className="px-4 py-2 text-gray-700">Username: {username}</p>
    //         </div>
    //         <div className="bg-gray-100 p-2 rounded-md hover:shadow-md transition-all duration-300">
    //           <p className="px-4 py-2 text-gray-700">Email: {email}</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <Footer />
    // </div>

    // <div>
    //   <Navbar />
    //   <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
    //     <div className="flex flex-col md:w-[60%] w-full mt-8 md:mt-0">
    //       <h1 className="text-3xl font-bold mb-6 text-gray-800">
    //         User's Posts:
    //       </h1>
    //       {posts?.map((p) => (
    //         <ProfilePosts key={p._id} p={p} />
    //       ))}
    //     </div>
    //     <div className="md:sticky md:top-12 p-4 flex flex-col md:items-end items-start md:w-[40%] w-full transition-all duration-300">
    //       <div className="flex flex-col space-y-4 items-start">
    //         <h1 className="text-2xl font-bold mb-4 text-gray-800">Profile</h1>
    //         <div className="bg-gray-100 p-3 rounded-md hover:shadow-md transition-all duration-300">
    //           <p className="text-lg text-gray-700">Username: {username}</p>
    //         </div>
    //         <div className="bg-gray-100 p-3 rounded-md hover:shadow-md transition-all duration-300">
    //           <p className="text-lg text-gray-700">Email: {email}</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <Footer />
    // </div>

    <div>
      <Navbar />
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[60%] w-full mt-8 md:mt-0 mb-14">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            User's Posts:
          </h1>
          {posts?.map((p) => (
            <ProfilePosts key={p._id} p={p} />
          ))}
        </div>
        <div className="md:sticky md:top-12 p-4 flex flex-col md:items-end items-start md:w-[40%] w-full transition-all duration-300">
          <div className="flex flex-col space-y-4 items-start bg-slate-200 p-8 px-14 py-10 shadow-md rounded-md">
            <h1 className="flex items-center text-2xl font-bold mb-4 text-gray-800">
              Profile
              <img
                src={profileImg}
                alt=""
                className="h-10 w-10 ml-2 object-cover rounded-full"
              />
            </h1>
            <div className="bg-gray-100 p-3 rounded-md hover:shadow-md transition-all duration-300">
              <p className="text-lg text-gray-700 font-semibold">
                Username: {username}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-md hover:shadow-md transition-all duration-300">
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
