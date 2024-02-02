import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {

  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const googleData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      const res = await axios.post("auth/google", googleData);
      dispatch(signInSuccess(res));
    } catch (error) {
      console.log("Connection Error", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleButtonClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-90"
    >
      Continue with google
    </button>
  );
}
