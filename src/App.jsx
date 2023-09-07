import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import IsAnon from "./Components/IsAnon";
import IsPrivate from "./Components/isPrivate";

/* Import all the pages */
import HomePage from "./Pages/Home";
import BandListPage from "./Pages/BandList";
import CreateBandPage from "./Pages/CreateBand";
import EditBandPage from "./Pages/EditBand";
import ProfilePage from "./Pages/Profile";
import EditProfilePage from "./Pages/EditProfile";
import SignupPage from "./Pages/Signup";
import LoginPage from "./Pages/Login";
import ContactsPage from "./Pages/Contacts";
import BandDetailsPage from "./Pages/BandDetails";
import PostDetails from "./Pages/PostDetails";
import CreateSamplePage from "./Pages/CreateSample";
import CreateSampleBandPage from "./Pages/CreateSampleBand";
import AboutPage from "./Pages/About";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={
            <IsPrivate>
            <HomePage />
            </IsPrivate>
          } 
        />
        <Route 
        path="/feed/:postId" 
        element={
        <PostDetails />
        } />
        
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/about"
          element={
            <IsAnon>
              <AboutPage />
            </IsAnon>
          }
        />
        <Route
          path="/bands"
          element={
            <IsPrivate>
              <BandListPage />
            </IsPrivate>
          }
        />
        <Route
          path="/bands/:bandId"
          element={
            <IsPrivate>
              <BandDetailsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/bands/create"
          element={
            <IsPrivate>
              <CreateBandPage />
            </IsPrivate>
          }
        />
        <Route
          path="/bands/:bandId/edit"
          element={
            <IsPrivate>
              <EditBandPage />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <IsPrivate>
              <EditProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/:userId/samples"
          element={
            <IsPrivate>
              <CreateSamplePage />
            </IsPrivate>
          }
        />
        <Route
          path="/bands/:bandId/samples"
          element={
            <IsPrivate>
              <CreateSampleBandPage />
            </IsPrivate>
          }
        />
        <Route
          path="/contacts"
          element={
              <ContactsPage/>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
