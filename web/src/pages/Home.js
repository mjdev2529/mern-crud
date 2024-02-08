import React, { useEffect, useState } from "react";
import Modal from "../component/Modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  FaArrowRight,
  FaFacebook,
  FaGoogle,
  FaInstagramSquare,
} from "react-icons/fa";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { setCredsData } from "../redux/user/userSlice";

export default function Home() {
  const { currentUser, clientId } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listData, setListData] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  // const data = [
  //   { id: 1, platform: "John", username: "john@example.com", notes: "" },
  //   { id: 2, platform: "Jane", username: "jane@example.com", notes: "" },
  //   { id: 3, platform: "Doe", username: "doe@example.com", notes: "" },
  // ];

  useEffect(() => {
    fetchUserPasswordList();
  }, []);

  const fetchUserPasswordList = async () => {
    const userData = {
      user_id: currentUser.role === 0 ? currentUser.user_id : clientId,
    };
    try {
      const res = await axios.post("/credentials/list", userData);
      console.log("user data list", res.data);
      setListData(res.data);
    } catch (error) {
      console.log(error);
    }
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
    const newFormData = { ...formData, user_id: currentUser.user_id };

    if (formData.socmed === "google" && formData.username) {
      if (!formData.username.endsWith("@gmail.com")) {
        alert(`Username must end with "gmail.com"`);
        return;
      }
    }

    try {
      setLoading(true);
      const res = await axios.post("/credentials/create", newFormData);
      console.log(res);
      setLoading(false);
      alert(res.data);
      setShowModal(false);
      fetchUserPasswordList();
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  const toggleDelete = (credential_id) => {
    setShowDeleteModal(true);
    setDeleteId(credential_id);
  };

  const deleteCredentials = async () => {
    const data = { credential_id: deleteId };
    try {
      // console.log(deleteId)
      const res = await axios.post("/credentials/delete-credential", data);
      console.log(res);
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchUserPasswordList();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const toggleEdit = (data) => {
    dispatch(setCredsData(data));
    navigate("/edit-credentials");
  };

  return (
    <div>
      <div className="flex flex-row justify-between px-5 mt-5">
        <h1 className="text-3xl text-center font-semibold">Password list</h1>
        {currentUser.role === 0 ? (
          <button
            onClick={handleModal}
            type="button"
            className="flex w-50 justify-center rounded-md bg-slate-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="bg-slate-700 py-2 px-3 rounded-lg hover:opacity-95 text-white"
          >
            Back to home
          </button>
        )}
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
                      Platform
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Notes
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Last Updated
                    </th>
                    {currentUser.role === 0 && (
                      <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900"
                      ></th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  { listData.length > 0 ?
                    (
                      listData.map((item) => {
                        return (
                          <tr
                            key={item.credential_id}
                            className="hover:bg-gray-50"
                          >
                            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                              <div className="flex items-center h-10 w-10">
                                {item.platform === "google" ? (
                                  <FaGoogle size={35} />
                                ) : item.platform === "facebook" ? (
                                  <FaFacebook size={35} />
                                ) : (
                                  <FaInstagramSquare size={35} />
                                )}
                              </div>
                              <div className="text-sm">
                                <div className="font-medium text-gray-700 capitalize mb-1 text-lg">
                                  {item.platform}
                                </div>
                                <button className="border border-blue-500 text-blue-500 p-1 rounded-lg text-xs flex items-center gap-x-2">
                                  Access account{" "}
                                  <FaArrowRight className="h-4 w-4" />
                                </button>
                              </div>
                            </th>
                            <td className="px-6 py-4">{item.username}</td>
                            <td className="px-6 py-4">{item.notes}</td>
                            <td className="px-6 py-4">
                              {moment(item.updatedon).format("YYYY-MM-DD h:m A")}
                            </td>
                            {currentUser.role === 0 && (
                              <td className="px-6 py-4">
                                <div className="flex justify-end gap-4">
                                  <a
                                    href="#"
                                    onClick={() =>
                                      toggleDelete(item.credential_id)
                                    }
                                  >
                                    <FiTrash2 size={20} />
                                  </a>
                                  <a href="#" onClick={() => toggleEdit(item)}>
                                    <FiEdit3 size={20} />
                                  </a>
                                </div>
                              </td>
                            )}
                          </tr>
                        );
                    })):(
                      <td colSpan={5} className="px-6 py-4">No data available.</td>
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={showModal}
        onClose={()=>setShowModal(false)}
        title=""
        hasFooter={false}
        customTitleClass={"text-center"}
        content={
          <div className="p-3 w-full">
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
                    id="socmed"
                    name="socmed"
                    autoComplete="country-name"
                    className="rounded-lg p-3 bg-slate-100 block w-full"
                    onChange={inputField}
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
                  />
                </div>
              </div>
              {/* <input
                type="text"
                placeholder="Email"
                id="email"
                className="bg-slate-100 p-3 rounded-lg"
                onChange={inputField}
              /> */}
              <div className="w-full">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="bg-slate-100 p-3 rounded-lg block w-full"
                    onChange={inputField}
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    id="password2"
                    className="bg-slate-100 p-3 rounded-lg block w-full"
                    onChange={inputField}
                  />
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
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-white py-2 px-3 rounded-lg hover:bg-slate-100 shadow-sm ring-1 ring-inset ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  className="bg-slate-700 text-white py-2 px-3 rounded-lg hover:opacity-95 disabled:opacity-80"
                >
                  {loading ? "loading..." : "Save Entry"}
                </button>
              </div>
            </form>
          </div>
        }
      />

      <Modal
        open={showDeleteModal}
        onClose={()=>setShowDeleteModal(false)}
        title=""
        btnText="Delete"
        content={<h1 className="font-medium">Are you sure to delete?</h1>}
        toggleButtonMain={deleteCredentials}
      />
    </div>
  );
}
