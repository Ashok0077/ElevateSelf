import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useContext, useState } from "react"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"


const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const {setUser}=useContext(UserContext)
  const navigate=useNavigate()

  const handleLogin=async()=>{
    try{
      const res=await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true})
      // console.log(res.data)
      const { token, info } = res.data;
      localStorage.setItem('token', token); // we are storing token in local storage from the response
      setUser(res.data)
      navigate("/")

    }
    catch(err){
      setError(true)
      console.log(err)

    }

  }
  return (
    <>
      <section className="sticky top-0 left-0 right-0 z-50 bg-white">
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
          <h1 className="text-[#183b56] text-lg md:text-3xl font-extrabold"><Link to="/">ElevateSelf</Link></h1>
          <h3 className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"><Link to="/register">Register</Link></h3>
        </div>
      </section>
      <div className="flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-full md:w-[25%] max-w-[400px] bg-blue-100 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-700">Log in to your account</h1>
          
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-500 rounded-lg outline-0 focus:ring focus:ring-blue-300"
              type="text"
              placeholder="Enter your email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-500 rounded-lg outline-0 focus:ring focus:ring-blue-300"
              type="password"
              placeholder="Enter your password"
            />
            <button
              onClick={handleLogin}
              className="w-full px-4 py-3 text-lg font-bold text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Log in
            </button>
          
          {error && <h3 className="text-red-500 text-sm">Something went wrong</h3>}
          <div className="flex justify-center items-center space-x-3 text-blue-700">
            <p>New here?</p>
            <p><Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

