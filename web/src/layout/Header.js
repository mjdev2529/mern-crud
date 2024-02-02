import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser)
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
              <Link to="/sign-in">
                <li>Sign In</li>
              </Link>
            )}
        </ul>
      </div>
    </div>
  );
}
