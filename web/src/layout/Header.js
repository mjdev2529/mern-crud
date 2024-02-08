import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { signOut } from "../redux/user/userSlice";
import axios from "axios";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //     const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
  //     if (!token && currentUser) {
  //       alert('Session expired. Please log out and log in again.');
  //       handleSignOut()
  //     }
  // }, [currentUser]);

  // const handleSignOut = async () => {
  //   try {
  //     await axios.get("/auth/signout");
  //     dispatch(signOut());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl  mx-auto p-3">
        <Link to={currentUser?"/home":"/"}>
          <h1 className="font-bold">PassPortal</h1>
        </Link>
        <ul className="flex gap-4">
          {/* <Link to="/about"><li>About</li></Link> */}
          {
            currentUser &&
            <Link to="/home">
              <li>Home</li>
            </Link>
          }
            { currentUser ? (
              <Link to="/profile">
                  <img src={currentUser.img_url} alt="User Profile" className="h-7 w-7 rounded-full object-cover" />
              </Link>
            ):(
              // <Link to="/sign-in">
              //   <li>Sign In</li>
              // </Link>
              ""
            )}
        </ul>
      </div>
    </div>
  );
}
