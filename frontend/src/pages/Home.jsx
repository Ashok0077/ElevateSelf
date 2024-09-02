import axios from "axios";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from '../components/Loader';
import { UserContext } from "../context/UserContext";
import Subscribe from "../components/Subscribe";
import Hero from "../components/Hero.jsx";
import { FaArrowRight } from "react-icons/fa";
import ErrorMessage from "../components/ErrorMessage";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const [noMoreArticles, setNoMoreArticles] = useState(false); // Add state for no more articles
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      console.log(res);
      if (res.data.length === 0) {
        setNoResults(true);
        setNoMoreArticles(true); // Set no more articles if the response is empty
      } else {
        setPosts(res.data);
        setNoResults(false);
        setNoMoreArticles(false); // Reset no more articles state if there are posts
      }
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
    <>
      <Navbar />
      <Hero />
      <section className="flex flex-col container mx-auto px-5 py-10">
        <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
          {loader ? (
            [...Array(3)].map((item, index) => (
              <ArticleCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          ) : noResults ? (
            <ErrorMessage message={"No Posts Available"} />
          ) : (
            posts.map((post) => (
              <HomePosts
                key={post._id} // Add key for HomePosts component
                post={post}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          )}
        </div>
        <div className="text-center">
          <button
            className="mx-auto flex items-center gap-x-2 font-bold text-blue-500 border-2 border-blue-500 px-6 py-3 rounded-lg"
            onClick={() => {
              if (!noMoreArticles) {
                // Logic for loading more articles can go here
                // For now, just setting noMoreArticles to true as a placeholder
                setNoMoreArticles(true);
              }
            }}
          >
            <span>More articles</span>
            <FaArrowRight className="w-3 h-3" />
          </button>
          {noMoreArticles && (
            <p className="text-red-500 mt-2">No more articles</p>
          )}
        </div>
      </section>
      <Subscribe />
      <Footer />
    </>
  );
};

export default Home;
