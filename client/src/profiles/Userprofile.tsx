import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import { BadgeCheck } from 'lucide-react';



interface User {
  fullname: string;
  description: string;
  bio: string;
  address: string;
  username: string;
  resume: string;
  profile_image: string;
  position: string;
  email: string;
  skills: string;
  portfolio: string;
  is_recruiter: boolean;
  is_premium: boolean;
}

const stripePromise = loadStripe('pk_test_51PRK9Z2Mr9crS3hzDmyQoEQnuUWO555sYUSGdEpxu3pAhGjxYSaNWjujgzWe3ub8T3FiCF5u5CHztwyh92qk51R200PsvewTyF'); // Replace with your actual Stripe publishable key

const Userprofile = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as User | null;
  const { username } = useParams<{ username: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/get-user?username=${username}`);
        if (res.status === 200) {
          setUser(res.data);
        } else {
          throw new Error('Failed to fetch user');
        }
      } catch (err) {
        toast.error('User not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  const handleBuyPremium = async () => {
    try {
      const sessionIdRes = await axios.post('/api/buy-premium', { username });
      const sessionId = sessionIdRes.data.sessionId;

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        toast.error('Failed to redirect to Checkout');
      }
    } catch (err) {
      toast.error('Failed to initiate Checkout session');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-auto px-10 mt-20">
        <Oval color="#fff" height={50} width={50} />
      </div>
    );
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <MaxWidthWrapper>
      <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={user?.profile_image || "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"}
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                    alt="User Profile"
                  />
                  <h1 className="text-xl font-bold flex items-center">
                    {user.fullname[0].toUpperCase()}{user.fullname.slice(1)} 
                    {user.is_premium && (
                       <BadgeCheck color='green'/>
                    )}
                    
                  </h1>
                  <span className="ml-2 bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded">
                      {user?.is_recruiter ? 'Recruiter' : 'User'}
                    </span>
                  <p className="text-gray-700">{user.position}</p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <a
                      href={`mailto:${user.email}?subject=Your%20Subject&body=Your%20message%20here`}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                      target="_blank"
                    >
                      Contact
                    </a>
                    {user.resume ? (
                      <a
                        href={user.resume}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                        target="_blank"
                      >
                        Resume
                      </a>
                    ) : null}
                  </div>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Location</span>
                  <ul>{user.address}</ul>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Skills</span>
                  <ul>{user.skills || 'Nothing to show'}</ul>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Bio</h2>
                <p className="text-gray-700">{user.bio ? <>{user.bio}</> : <>No bio to show! </>}</p>

                <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
                <div className="mb-6">{user.description ? <h1>{user.description}</h1> : <>No Experience to show! </>}</div>

                <h2 className="text-xl font-bold mt-6 mb-4">Portfolio</h2>
                <div className="mb-6">{user.description ? <a href={user.portfolio} className='text-blue-800 hover:underline' target="_blank">{user.portfolio}</a> : <>No Experience to show!</>}</div>

                {currentUser && currentUser.username === user.username && (
                  <>
                    <Link to={`/edit-profile/${currentUser.username}`}>
                      <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                          Edit Profile
                        </a>
                      </div>
                    </Link>
                    {!currentUser.is_premium && (
                      <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        <button onClick={handleBuyPremium} className="flex items-center gap-2">
                          <div className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded inline-flex items-center justify-center">
                            <img src="/flames-icon.svg" className='' width={20} height={20} alt="" />
                            <h2 className='ml-2 font-bold'>Buy Premium</h2>
                          </div>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Userprofile;
