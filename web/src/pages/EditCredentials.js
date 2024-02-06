import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearStatus, setCredsData, setFailure, setStart, setSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditCredentials() {
  const { credsData, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(credsData);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(()=>{
    dispatch(setFailure());
  }, []);

  const inputField = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setStart());
      const res = await axios.post("/credentials/update-credential", formData);
      console.log("res: ", res.data);

      if (res.data.success === false) {
        dispatch(setFailure(res.data.message));
        return;
      }

      alert("Details successfully updated.");
      dispatch(setCredsData(res.data));
      dispatch(clearStatus());
      setFormData(res.data);
    } catch (error) {
      console.log("res: ", error);
      dispatch(setFailure(error));
    }
  }

  const handleBack = () => {
    dispatch(setCredsData(null));
    navigate("/home");
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <div className="w-3/6 mx-auto mt-10">
        {/* <h1 className="text-3xl text-center font-semibold my-2">Sign Up</h1> */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="w-full">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Social Media / Site <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <select
                id="platform"
                name="platform"
                className="rounded-lg p-3 bg-slate-100 block w-full"
                onChange={inputField}
                defaultValue={credsData.platform}
              >
                <option>Select:</option>
                <option value="google">Google</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
              </select>
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Username"
                id="username"
                className="bg-slate-100 p-3 rounded-lg block w-full"
                onChange={inputField}
                defaultValue={credsData.username}
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              {/* <input
                type="password"
                placeholder="Password"
                id="password"
                className="bg-slate-100 p-3 rounded-lg block w-full"
                onChange={inputField}
                defaultValue={credsData.password}
              /> */}
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                id="password"
                className="bg-slate-100 p-3 rounded-lg block w-full"
                onChange={inputField}
                defaultValue={credsData.password}
              />
              <button type="button" onClick={toggleShowPassword}>
                <u>{showPassword ? 'Hide' : 'Show'} Password</u>
              </button>
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Notes
            </label>
            <div className="mt-2">
              <textarea
                type="text"
                placeholder="Notes"
                id="notes"
                className="bg-slate-100 p-3 rounded-lg block w-full"
                onChange={inputField}
                defaultValue={credsData.notes}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => handleBack()}
              className="bg-white py-2 px-3 rounded-lg hover:bg-slate-100 shadow-sm ring-1 ring-inset ring-gray-300"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className="bg-slate-700 text-white py-2 px-3 rounded-lg hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "loading..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
