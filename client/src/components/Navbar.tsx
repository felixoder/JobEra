import { Link } from 'react-router-dom';
import MaxWidthWrapper from './MaxWidthWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { signOutSuccess } from '../redux/user/userSlice';
import toast, { Toaster } from 'react-hot-toast';

interface User {
  fullname: string;
  description: string;
  bio: string;
  address: string;
  username: string;
  is_recruiter: boolean;
  profile_image: string;
}

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as User | null;
  const dispatch = useDispatch();

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/sign-out', {
        method: 'POST',
      });

      if (!res.ok) {
        toast.error('Failed to sign out');
      } else {
        dispatch(signOutSuccess());
        toast.success("Signed out");
      }
    } catch (error) {
      toast.error('Network failed');
    }
  };

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <Toaster />
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link to="/">
            <div className="flex z-40 font-semibold">
              Job<span className="text-green-600"> Era</span>
            </div>
          </Link>

          <div className="h-full flex items-center space-x-4 gap-3 text-[13px]">
            {!currentUser && (
              <>
                <Link to="/log-in">
                  <div className="flex z-40 font-semibold flex-col justify-center items-center">
                    Login
                  </div>
                </Link>
                <Link to="/register/register-recruiter">
                  <div className="flex z-40 font-semibold flex-col justify-center items-center">
                    Register
                  </div>
                </Link>
                
              </>
            )}
            {currentUser?.is_recruiter && (
              <>
               
              <Link to="/post-job">
                <div className="flex z-40 font-semibold flex-col justify-center items-center">
                  Post-Job
                </div>
              </Link>
             
              <Link to="/premium-dash-recruiter">
                <div className="flex z-40 font-semibold flex-col justify-center items-center bg-orange-500 rounded-md text-white px-2 py-2">
                 Premium Dash
                </div>
              </Link>
              
            
              </>
            )}
            {currentUser && !currentUser?.is_recruiter && (
              <>
               
              
             
              <Link to="/premium-dash-geeks">
                <div className="flex z-40 font-semibold flex-col justify-center items-center bg-orange-500 rounded-md text-white px-2 py-2">
                 Premium Dash
                </div>
              </Link>
              
            
              </>
            )}
         
            <div className="h-8 w-px bg-zinc-200 hidden md:block" />
            <div className="relative">
              <button onClick={toggleDropdown} className="relative z-50">
                <img
                  src={currentUser?.profile_image || 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'}
                  alt="Profile"
                  className="w-9 h-9 rounded-full"
                />
              </button>
              {dropdownVisible && currentUser && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                  <Link
                    to={`/profile/${currentUser.username}`}
                    className="block px-4 py-2 text-red-800 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  {currentUser.is_recruiter && (
                    <>
                    <Link to="/jobs">
                <div className="flex z-40 font-semibold flex-col justify-center items-center">
                  All Jobs
                </div>
              </Link>
                    
                    <Link to="/your-jobs" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Your Jobs
                    </Link>
                    <Link to="/pending" className="block px-4 py-2 text-red-600 hover:bg-gray-100">
                      Pending Applications
                    </Link>
                    <Link to="/selected" className="block px-4 py-2 text-green-600 hover:bg-gray-100">
                      Selected Applications
                    </Link>

              <Link to="/recommended-geeks">
                <div className="flex z-40 font-semibold flex-col justify-center items-center bg-orange-500 rounded-md text-white px-2 py-2">
                  Recommended by JobEra
                </div>
              </Link>
                    
                 
                    </>
                  )}
                  {!currentUser.is_recruiter && (
                    <>
                      <Link to="/All-jobs" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        All Jobs
                      </Link>
                      <Link to="/pending-application" className="block px-4 py-2 text-blue-800 hover:bg-gray-100">
                        Pending Applications
                      </Link>
                      <Link to="/selected-application" className="block px-4 py-2 text-green-600 hover:bg-gray-100 ">
                        Selected Applications
                      </Link>
                      <Link to="/rejected-application" className="block px-4 py-2 text-red-600 hover:bg-gray-100">
                        Rejected Applications
                      </Link>
                      <Link to="/quiz">
                <div className="flex z-40 font-semibold flex-col justify-center items-center bg-orange-500 rounded-md text-white px-2 py-2">
                  Practise Quiz
                </div>
              </Link>
                     
                    </>
                  )}
                  <button className="block px-4 py-2 text-red-800 hover:bg-gray-100 w-full" onClick={handleSignOut}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
