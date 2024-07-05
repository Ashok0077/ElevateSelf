import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL,IF } from '../url';
import sampleImage from '../assets/sample.jpg';
import axios from "axios"
import avatar from "../assets/user.png"
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const HomePosts = ({ post, className }) => {
  const { user } = useContext(UserContext);
  const navigate=useNavigate()

  const handleUserProfileClick = async () => {
    try {
      // Increment the view count in the backend
      await axios.put(`${URL}/api/users/${post?.userId}/increment-view`, null, { withCredentials: true });
  
      // Navigate to the user's profile
      navigate(`/UserProfile/${post?.userId}`);
    } catch (err) {
      console.error('Error updating view count or navigating to user profile:', err);
    }
  };

  return (
    <div className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}>
      <Link to={user ? `/posts/post/${post._id}` : '/login'}>
        <img
          src={post.photo ? post.photo : sampleImage}
          alt="title"
          className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
        />
      </Link>

      <div className="p-5">
        <Link to={user ? `/posts/post/${post._id}` : '/login'}>
          <h2 className="font-roboto font-bold text-xl text-[#183b56] md:text-2xl lg:text-[28px]">
            {post.title}
          </h2>
          <p className="text-[#5f7384] mt-3 text-sm md:text-lg">{post.desc.slice(0, 100)} ...Read more</p>
        </Link>
        <div className="flex justify-between flex-nowrap items-center mt-6 " >
          <div className="flex items-center gap-x-2 md:gap-x-2.5 cursor-pointer" onClick={handleUserProfileClick}>
            <img
              src={avatar}
              alt="post profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full"
            />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-[#183b56] text-sm md:text-base">
                {post.username}
              </h4>
            </div>
          </div>
          <span className="font-bold text-[#5f7384] italic text-sm md:text-base">
            {new Date(post.updatedAt).getDate()}{' '}
            {new Date(post.updatedAt).toLocaleString('default', {
              month: 'long',
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePosts;
