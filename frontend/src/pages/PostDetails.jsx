import { useNavigate, useParams, useLocation } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL } from "../url";
import { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import avatarImage from "../assets/user.png";
import ArticleDetailSkeleton from "../components/ArticleDetailSkeleton";
import SuggestedPosts from "../components/SuggestedPosts";
import SocialShareButtons from "../components/SocialShareButtons";
import sampleImage from "../assets/sample.jpg";

const PostDetails = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchPosts = useCallback(async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts${search}`);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoader(false);
    }
  }, [search]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const fetchPost = useCallback(async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setPost(res.data);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const fetchPostComments = useCallback(async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/comments/post/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoader(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchPostComments();
  }, [fetchPostComments]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${URL}/api/comments/create`,
        {
          comment,
          author: user.username,
          postId,
          userId: user._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments((prevComments) => [...prevComments, res.data]);
      setComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const handleDeleteComment = useCallback(
    async (commentId) => {
      try {
        await axios.delete(`${URL}/api/comments/${commentId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setComments((prevComments) =>
          prevComments.filter((c) => c._id !== commentId)
        );
      } catch (err) {
        console.error("Error deleting comment:", err);
        alert("Failed to delete comment. Please try again.");
      }
    },
    [token]
  );

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${URL}/api/posts/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleUserProfileClick = async () => {
    try {
      await axios.put(`${URL}/api/users/${post?.userId}/increment-view`, null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/UserProfile/${post?.userId}`);
    } catch (err) {
      console.error(
        "Error updating view count or navigating to user profile:",
        err
      );
    }
  };

  return (
    <div>
      <Navbar />

      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <ArticleDetailSkeleton />
        </div>
      ) : (
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <div className="flex justify-between items-center">
              {user?._id === post?.userId && (
                <div className="flex items-center justify-center space-x-2">
                  <p
                    className="cursor-pointer"
                    onClick={() => navigate("/edit/" + postId)}
                  >
                    <BiEdit />
                  </p>
                  <p className="cursor-pointer" onClick={handleDeletePost}>
                    <MdDelete />
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-2 md:mt-4">
              <div
                className="flex items-center cursor-pointer"
                onClick={handleUserProfileClick}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                  <img
                    className="w-full h-full object-cover"
                    src={avatarImage}
                    alt="User Avatar"
                  />
                </div>
                <p className="text-gray-500">@{post.username}</p>
              </div>

              <div className="flex space-x-2 text-gray-500">
                <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
              </div>
            </div>
            <img
              src={post.photo ? post.photo : sampleImage}
              className="rounded-xl w-full mx-auto mt-8"
              alt="Post"
            />
            <h1 className="text-2xl font-bold text-[#0e2436] md:text-3xl">
              {post.title}
            </h1>
            <p className="text-gray-700 mx-auto mt-8">{post.desc}</p>
            <div className="text-[#0e2436] flex items-center mt-8 space-x-4 font-semibold">
              <p>Categories:</p>
              <div className="flex justify-center items-center space-x-2">
                {post.categories?.map((c, i) => (
                  <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                    {c}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <h3 className="text-[#0e2436] mt-6 mb-4 font-semibold">
                Queries:
              </h3>
              {comments.map((c) => (
                <Comment
                  key={c._id}
                  c={c}
                  post={post}
                  onDelete={handleDeleteComment}
                />
              ))}
            </div>
            <div className="w-full flex flex-col mt-4 md:flex-row">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Write a comment"
                className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
              />
              <button
                onClick={postComment}
                className="bg-[#0e2436] text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
              >
                Add Query
              </button>
            </div>
          </article>
          <div>
            <SuggestedPosts
              posts={posts}
              className="mt-8 lg:mt-0 lg:max-w-xs"
            />
            <div className="mt-7">
              <h2 className="text-[#0e2436] font-roboto font-medium text-dark-hard mb-4 md:text-xl">
                Share on:
              </h2>
              <SocialShareButtons
                url={encodeURI(window.location.href)}
                title={encodeURIComponent(post?.title)}
              />
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default PostDetails;
