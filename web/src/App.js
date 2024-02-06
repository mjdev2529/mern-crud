import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./layout/Header";
import PrivateRoute from "./helper/PrivateRoute";
import EditCredentials from "./pages/EditCredentials";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/edit-credentials" element={<EditCredentials />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
