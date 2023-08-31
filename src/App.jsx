import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import isAnon from "./Components/IsAnon";
import isPrivate from "./Components/isPrivate";

/* Import all the pages */
import HomePage from "./Pages/Home";
import BandListPage from "./Pages/BandList";
import CreateBandPage from "./Pages/CreateBand";
import EditBandPage from "./Pages/EditBand";
import ProfilePage from "./Pages/Profile";
import EditProfilePage from "./Pages/EditProfile";
import SignupPage from "./Pages/Signup";
import LoginPage from "./Pages/Login";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/bands" element={<BandListPage />} />
        <Route path="/bands/create" element={<CreateBandPage />} />
        <Route path="/bands/edit" element={<EditBandPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
