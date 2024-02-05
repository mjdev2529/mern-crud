import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice";
import axios from "axios";

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [image, setImage] = useState(undefined);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageError, setImageError] = useState(null);
  const [formData, setFormData] = useState({
    user_id: currentUser.user_id,
    username: currentUser.username,
    email: currentUser.email
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const isImage = image.type.startsWith("image/");
    const isSizeValid = image.size <= 2 * 1024 * 1024;

    if (!isImage) {
      setImageError("File format invalid.");
      return;
    }

    if (!isSizeValid) {
      setImageError("File size should be 2MB or less.");
      return;
    }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const upload = uploadBytesResumable(storageRef, image);

    upload.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + " done.");
        setUploadProgress(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setImageError(true);
      },
      () => {
        getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, photo: downloadURL });
        });
      }
    );
  };

  const inputField = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    setUpdateSuccess(false);
    try {
      dispatch(updateUserStart());
      const res = await axios.post("/user/update-user", formData);
      console.log("res: ", res);

      if (res.data.success === false) {
        dispatch(updateUserFailure(res.data.message));
        return;
      }

      dispatch(updateUserSuccess(res.data));
      setUpdateSuccess(true);
    } catch (error) {
      console.log("res: ", error);
      dispatch(updateUserFailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.photo || currentUser.img_url}
          alt="User profile"
          className="h-24 w-24 rounded-full self-center object-cover cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              {imageError || "Error uploading image"}
            </span>
          ) : uploadProgress > 0 && uploadProgress < 100 ? (
            <span className="text-slate-700">{`Uploading: ${uploadProgress} %`}</span>
          ) : uploadProgress === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : null}
        </p>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={inputField}
          defaultValue={currentUser.username}
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={inputField}
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={inputField}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "loading..." : "update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Signout</span>
      </div>
      <p className="text-red-700 mt-5">{ error ? error || "Error: Something went wrong." : "" }</p>
      <p className="text-green-700 mt-5">{ updateSuccess && "User info was updated." }</p>
    </div>
  );
}
