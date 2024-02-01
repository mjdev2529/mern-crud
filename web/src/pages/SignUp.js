import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../helper";
import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputField = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(formData.password === formData.password2){
      try {
        const res = await axios.post('/auth/sign-up', formData);
        console.log(res);
        setLoading(false);
        setError(false);

        if(res.success === false){
          setError(true);
          return;
        }
          
        alert("Success: Account was registered.");
        setTimeout(()=>{
          navigate("/sign-in");
        },500);

      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }else{
      alert("Password does not match.");
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={inputField}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          id="password2"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={inputField}
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          { loading ? "loading..." : "Sign up" }
        </button> 
        {/* <button className='bg-slate- text-white p-3 rounded-lg'>Sign up</button> */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{ error && "Error: Something went wrong." }</p>
    </div>
  );
}
