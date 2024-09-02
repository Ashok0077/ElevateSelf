import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { IF, URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [view, setView] = useState("");
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);
  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setView(res.data.view);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + "/api/users/" + user._id,
        {
          username,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setUser(res.data); 
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      await axios.delete(URL + "/api/users/" + user._id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  useEffect(() => {
    fetchUserPosts();
  }, [param]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="px-4 md:px-10 lg:px-20 py-8">
        <div className="md:flex md:justify-between md:space-x-8">
          <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Your Posts</h1>
            {posts.length > 0 ? (
              posts.map((p) => <ProfilePosts key={p._id} p={p} />)
            ) : (
              <p className="text-gray-600">No posts available.</p>
            )}
          </div>
          <div className="mt-8 md:mt-0 md:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold mb-4">Profile</h1>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="block w-full p-3 mb-4 bg-gray-200 rounded-md border border-gray-300"
                placeholder="Your username"
                type="text"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="block w-full p-3 mb-4 bg-gray-200 rounded-md border border-gray-300"
                placeholder="Your email"
                type="email"
              />
              <p className="mb-4 p-3 bg-gray-200 rounded-md border border-gray-300">
                Views: {view}
              </p>
              {/* <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="block w-full p-3 mb-4 bg-gray-200 rounded-md border border-gray-300"
                placeholder="Your password"
                type="password"
              /> */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleUserUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Update
                </button>
                <button
                  onClick={handleUserDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
              {updated && (
                <p className="text-green-500 text-sm text-center mt-4">
                  User updated successfully!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
