import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./layout/Header";
import EditCredentials from "./pages/EditCredentials";
import HomeAdmin from "./pages/HomeAdmin";

import PrivateRoute from "./helper/PrivateRoute";
import { useSelector } from "react-redux";

export default function App() {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* <Route path="/sign-up" element={<SignUp />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          {currentUser && currentUser.role === 0 ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/edit-credentials" element={<EditCredentials />} />
            </>
          ):(
            <>
              <Route path="/home" element={<HomeAdmin />} />
              <Route path="/view-client" element={<Home />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
