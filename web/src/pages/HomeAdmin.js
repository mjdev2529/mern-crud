import React, { useEffect, useState } from "react";
import Modal from "../component/Modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit3, FiFileText, FiTrash2, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  clearStatus,
  setClientId,
  setFailure,
  setStart,
  setSuccess,
} from "../redux/user/userSlice";

export default function Home() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [listData, setListData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchUsersList();
  }, []);

  const fetchUsersList = async () => {
    try {
      const res = await axios.post("/user/list");
      console.log("users list", res.data);
      setListData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleView = (user_id) => {
    dispatch(setClientId(user_id));
    navigate("/view-client");
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const inputField = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setStart());
    if (formData.password === formData.password2) {
      try {
        const res = await axios.post("/auth/sign-up", formData);
        console.log("res: ", res);

        if (res.data.success === false) {
          dispatch(setFailure(res.data.message));
          return;
        }

        fetchUsersList();
        dispatch(clearStatus());
        setFormData({});
      } catch (error) {
        console.log(error);
        dispatch(setFailure(error));
      }
    } else {
      alert("Password does not match.");
      dispatch(clearStatus());
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    dispatch(clearStatus());
  }

  return (
    <div>
      <div className="flex flex-row justify-between px-5 mt-5">
        <h1 className="text-3xl text-center font-semibold">Clients list</h1>
        <button
          onClick={handleModal}
          type="button"
          className="flex w-50 justify-center rounded-md bg-slate-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
      </div>
      <div className="px-5">
        <div className="font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Client
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      No. of Password Saved
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {listData.length > 0 &&
                    listData.map((item) => {
                      const img = item.img_url
                        ? item.img_url
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                      return (
                        <tr key={item.user_id} className="hover:bg-gray-50">
                          <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                            <div className="relative h-10 w-10">
                              <img
                                className="h-full w-full rounded-full object-cover"
                                src={img}
                                alt="User profile"
                              />
                              {/* <span class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
                            </div>
                            <div className="text-sm">
                              <div className="font-medium text-gray-700">
                                {item.username}
                              </div>
                              <div className="text-gray-400">{item.email}</div>
                            </div>
                          </th>
                          <td className="px-6 py-4">
                            {item.total_credentials}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-4">
                              {/* <a href="#" onClick={()=>toggleDelete(item.credential_id)}>
                                <FiTrash2 size={20} />
                              </a> */}
                              <a
                                href="#"
                                className="flex gap-x-2 hover:underline"
                                onClick={() => toggleView(item.user_id)}
                              >
                                <FiFileText size={20} /> View
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        hasFooter={false}
        content={
          <>
            <div className="p-3 max-w-lg mx-auto">
              <h1 className="text-xl font-semibold mb-5 flex gap-x-2 items-center">
                <FiUserPlus size={22} />Add new client
              </h1>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Name"
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
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => handleCancel()}
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
              <p className="text-red-700 mt-5">
                {error ? error.message || "Error: Something went wrong." : ""}
              </p>
            </div>
          </>
        }
      />
    </div>
  );
}
