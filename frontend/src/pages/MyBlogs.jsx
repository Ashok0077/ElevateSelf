import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import HomePosts from "../components/HomePosts";
import Loader from "../components/Loader";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton";

const MyBlogs = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <div>
      <Navbar />
      <section className="container mx-auto px-5 py-10">
      <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
          {loader ? (
            [...Array(3)].map((item, index) => (
              <ArticleCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          ) : noResults ? (
            <h3 className="text-center font-bold text-lg">No posts available</h3>
          ) : (
            posts.map((post) => (
              <HomePosts
                key={post.id}
                post={post}
                className="w-full md:w-1/2 lg:w-1/3 aspect-w-16 aspect-h-9"
              />
            ))
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MyBlogs;
