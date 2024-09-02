
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ImCross } from 'react-icons/im'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from '../firebase'

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false); // Add uploading state

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  }

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  }

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Display the selected image preview
    if (selectedFile) {
      try {
        // Start uploading
        setUploading(true);
        const storage = getStorage(app);
        const filename = Date.now() + selectedFile.name;
        const storageRef = ref(storage, "images/" + filename);
        
        // Upload file and track the progress
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progress can be handled here if needed
          },
          (error) => {
            console.error("Upload failed:", error);
            setUploading(false); // Reset uploading state on error
          },
          async () => {
            const downloadURL = await getDownloadURL(storageRef);
            setImageURL(downloadURL);
            setImagePreview(downloadURL);
            setUploading(false); // Reset uploading state on success
          }
        );
      } catch (error) {
        console.error(error);
        setUploading(false); // Reset uploading state on error
      }
    } else {
      setImagePreview(null);
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
      photo: imageURL
    }

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(URL + "/api/posts/create", post, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Navbar />
      
      <section className='container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-col lg:gap-x-5 lg:items-start'>
        <h1 className='text-[#183b56] font-bold md:text-2xl text-xl '>Create a post</h1>
        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>

          {/* Title */}
          <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Enter post title' className='px-4 py-2 outline-none border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none' />

          {/* File Upload */}
          <div className='relative mt-4'>
            <label
              htmlFor="fileInput"
              className='cursor-pointer bg-blue-500 text-white py-2 px-4 font-semibold rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'
            >
              Choose File
            </label>
            <input
              id="fileInput"
              type="file"
              className='hidden'
              onChange={handleFileChange}
            />
            {/* Display uploading message or image preview */}
            {uploading ? (
              <p className='text-blue-500 mt-2'>Uploading...</p>
            ) : (
              imagePreview && (
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="mt-2 rounded-md max-h-40"
                />
              )
            )}
          </div>

          {/* Categories */}
          <div className='flex flex-col'>
            <div className='flex items-center space-x-4 md:space-x-8'>
              <input value={cat} onChange={(e) => setCat(e.target.value)} className='px-4 py-2 outline-none border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none' placeholder='Enter post category' type="text" />
              <div onClick={addCategory} className='bg-blue-500 text-white px-4 py-2 font-semibold cursor-pointer rounded-md'>Add</div>
            </div>

            <div className='flex px-4 mt-3 space-x-2'>
              {cats?.map((c, i) => (
                <div key={i} className='flex items-center bg-gray-200 px-2 py-1 rounded-md'>
                  <p>{c}</p>
                  <p onClick={() => deleteCategory(i)} className='text-white bg-red-500 rounded-full cursor-pointer p-1 text-sm'><ImCross /></p>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <textarea onChange={(e) => setDesc(e.target.value)} rows={8} className='px-4 py-2 outline-none border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none' placeholder='Enter post description' />

          {/* Create Button */}
          <button onClick={handleCreate} className='bg-blue-500 w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'>
            Create
          </button>
        </form>
      </section>
      <Footer />
    </div>
  )
}

export default CreatePost;
