import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../helper";
import axios from "axios";


export default function SignIn() {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const inputField = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    try {
      const res = await axios.post('/auth/sign-in', formData);
      console.log(res);
      setLoading(false);
      setError(false);

      if(res.success === false){
        setError(true);
        return;
      }
        
      alert("Success: Logging in, Please wait...");
      setTimeout(()=>{
        navigate("/home");
      },500);

    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">PassPortal: One click, All access.</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={inputField}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={inputField}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          { loading ? "loading..." : "Sign in" }
        </button> 
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{ error && "Error: Something went wrong." }</p>
    </div>
  )
}
