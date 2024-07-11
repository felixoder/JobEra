import { Route,Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Register from "./components/Register"
import RegisterRecruiter from "./components/RegisterRecruiter"
import RegisterNormal from "./components/RegisterNormal"
import Login from "./components/Login"
import Userprofile from "./profiles/Userprofile"
import EditProfile from "./profiles/EditProfile"
import OnlyRecruiterPrivateRoute from "./OnlyRecruiterPrivateRoute"
import JobPost from "./job-post/JobPost"
import PrivateRoute from "./PrivateRoute"
import Quiz from "./quiz/Quiz"
import YourJobs from "./job-post/YourJobs"
import Congratulation from "./profiles/Congratulation"
import Jobs from "./job-post/Jobs"
import ViewApplication from "./Applications/ViewApplication"
import Selected from "./Types/Recruiter/Selected"
import Pending_Geeks from "./Types/Geeks/Pending_Geeks"
import Selected_Geeks from "./Types/Geeks/Selected_Geeks"
import Rejected_Geeks from "./Types/Geeks/Rejected_Geeks"
import Main from "./components/Main"
import Recommended from "./components/Recommended"
import OnlyPremiumPrivateRoute from "./OnlyPremiumPrivateRoute"
import Page from "./components/Page"
import RecruirterDash_prem from "./components/RecruirterDash_prem"
import GeeksDash_prem from "./components/GeeksDash_prem"
import Footer from "./components/Footer"


const App = () => {
  return (
    <>
<Navbar/>

<Routes>

  <Route path='/register' element={<Register/>}/>
  <Route path='/log-in' element={<Login/>}/>
  <Route path='/' element={<Page/>}/>
  



{/* for geeks */}

    {/* private routes */}
    <Route element={<PrivateRoute/>}>
    <Route path='/jobs' element={<Main/>}/>
    <Route path='/your-jobs' element={<YourJobs/>}/>  
    <Route path='/confirm' element={<Congratulation/>}/>
    <Route path='/jobs/:slug' element={<Jobs/>}/>
    <Route path='/all-jobs' element={<Main/>}/>
    
    <Route path='/profile/:username' element={<Userprofile/>}/>

   
    <Route path='/edit-profile/:username' element={<EditProfile/>}/>

    <Route path='/pending-application' element={<Pending_Geeks/>}/>
    <Route path='/selected-application' element={<Selected_Geeks/>}/>
    <Route path='/rejected-application' element={<Rejected_Geeks/>}/>
    <Route element={<OnlyPremiumPrivateRoute/>}>
<Route path='/premium-dash-geeks' element={<GeeksDash_prem/>}/>
</Route>
    
    </Route>

{/* premium */}
<Route element={<OnlyPremiumPrivateRoute/>}>
<Route path='/quiz' element={<Quiz/>}/>
</Route>
{/* recruiter */}

  <Route element={<OnlyRecruiterPrivateRoute/>}>
  <Route path='/post-job' element={<JobPost/>}/>
 
  <Route path='/pending' element={<ViewApplication/>}/>
  <Route path='/selected' element={<Selected/>}/>
  <Route path='/recommended-geeks' element={<Recommended/>}/>
  {/* premium */}
<Route element={<OnlyPremiumPrivateRoute/>}>
<Route path='/premium-dash-recruiter' element={<RecruirterDash_prem/>}/>
</Route>

  
  </Route>
  <Route path='/register/register-recruiter' element={
    <>
    <Register/>
    <RegisterRecruiter/>
    </>
  }/>
   <Route path='/register/register-normal' element={
    <>
    <Register/>
    <RegisterNormal/>
    </>
  }/>



</Routes>

<Footer/>


     
    </>
  )
}

export default App