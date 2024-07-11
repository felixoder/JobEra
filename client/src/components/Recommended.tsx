import axios from 'axios';
import { BadgeCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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

const Recommended: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>('https://jobera.onrender.com/api/get-premium?is_premium=true');
        if (res.status === 200) {
          setUsers(res.data);
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (err) {
        toast.error('Premium users not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
        
      {isLoading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No premium users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
           
          {users.map((user) => (
            <div key={user.username} className="bg-white shadow-xl rounded-lg py-3">
              <div className="photo-wrapper p-2">
                <img className="w-32 h-32 rounded-full mx-auto" src={user.profile_image} alt={user.fullname} />
              </div>
              <div className="p-2">
                <div className="flex justify-center items-center gap-2">
                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user.fullname}</h3>
                <BadgeCheck color='green'/>
                </div>
               
                <div className="text-center text-gray-400 text-xs font-semibold">
                  <p>{user.position}</p>
                </div>
                <table className="text-xs my-3">
                  <tbody>
                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                      <td className="px-2 py-2">{user.address}</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                      <td className="px-2 py-2">{user.email}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center my-3">
                  <a
                    className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                    href={`/profile/${user.username}`}
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommended;
