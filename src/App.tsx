import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Settings } from './pages';
import AppLaunch from './pages/appLaunch/AppLaunch';
import SignInForm from './pages/appLaunch/forms/SignInForm';
import SignUpForm from './pages/appLaunch/forms/SignUpForm';
import CreatePost from './pages/createPost/CreatePost';
import Explore from './pages/explore/Explore';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import RootLayout from './rootlayout/RootLayout';

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route element={<AppLaunch />}>
            <Route path='/sign-in' element={<SignInForm />} />
            <Route path='/sign-up' element={<SignUpForm />} />
          </Route>
          <Route element={<RootLayout />}>
            <Route index path='/' element={<Home />} />
            <Route path='/createPost' element={<CreatePost />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
