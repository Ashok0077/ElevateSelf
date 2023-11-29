import { Link, useLocation, useNavigate } from "react-router-dom"
import {BsSearch} from 'react-icons/bs'
import {FaBars} from 'react-icons/fa'
import { useContext, useState } from "react"
import Menu from "./Menu"
import { UserContext } from "../context/UserContext"



const Navbar = () => {
  
  const [prompt,setPrompt]=useState("")
  const [menu,setMenu]=useState(false)
  const navigate=useNavigate()
  const path=useLocation().pathname
  
  // console.log(prompt)
  

  const showMenu=()=>{
    setMenu(!menu)
  }
  
   
    const {user}=useContext(UserContext)
    
  return (
    <section className="sticky top-0 left-0 right-0 z-50 bg-white">
    <div className="container mx-auto px-5 flex justify-between py-4 items-center">
    <h1 className="text-[#183b56] text-lg md:text-3xl font-extrabold"><Link to="/">ElevateSelf</Link></h1>
    {path==="/" && <div className="flex justify-center items-center space-x-0">
    <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="text-[#1565d8] cursor-pointer"><BsSearch/></p>
    <input onChange={(e)=>setPrompt(e.target.value)} className="outline-none px-3 " placeholder="Search a post" type="text"/>
    
    </div>}
    <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
      {user? <h3 className="text-[#1565d8] font-bold md:text-lg"><Link to="/write">Write</Link></h3> :<h3 className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"><Link to="/login">Login</Link></h3>}
      {user? <div onClick={showMenu}>
        <p className="text-[#1565d8] font-bold md:text-lg cursor-pointer relative"><FaBars/></p>
        {menu && <Menu/>}
      </div>:<h3 className="text-[#1565d8] font-bold md:text-lg"><Link to="/register">Register</Link></h3>}
    </div>
    <div onClick={showMenu} className="md:hidden text-lg">
      <p className="cursor-pointer relative"><FaBars/></p>
      {menu && <Menu/>}
    </div>

    </div>
    </section>
  )
}

export default Navbar 