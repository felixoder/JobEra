import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Application {
  id: number;
  application: string;
  author: string;
  created_at: string;
  status: string;
}

interface User{
    username:string;
}

const Selected: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as User | null;
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get<Application[]>(`https://jobera.onrender.com/api/get-application?author=${currentUser?.username}&status=Selected`);
        if (res.status === 200) {
          setApplications(res.data);
        } else {
          throw new Error('Failed to fetch applications');
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const timeSince = (dateString: string) => {
    const currentDate = moment();
    const postDate = moment(dateString, 'YYYY-MM-DD HH:mm:ss.SSSSSS');
    const diffInSeconds = currentDate.diff(postDate, 'seconds');

    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'blue';
      case 'Rejected':
        return 'red';
      case 'Selected':
        return 'green';
      default:
        return 'black';
    }
  };
  if(!applications){
    return  <div className="flex justify-center items-center mx-auto px-10 mt-20 flex-col gap-4">
        <h1 className='text-center font-semibold'>You dont have any applications</h1>
   
  
  </div>
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Applications</h1>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Oval color="#000" height={50} width={50} />
        </div>
      ) : (
        <table className="min-w-full bg-white border-gray-200 border rounded-lg overflow-hidden">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-3 px-6 text-left">Application</th>
              <th className="py-3 px-6 text-left">Author</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="py-4 px-6">
                  <Link to={`/jobs/${app.application}`} className="font-bold text-green-600 hover:underline">
                    {app.application}
                  </Link>
                </td>
                <td className="py-4 px-6">
                  <Link to={`/profile/${app.author}`} className="hover:underline">
                    {app.author}
                  </Link>
                </td>
                <td className="py-4 px-6">{timeSince(app.created_at)}</td>
                <td className={`py-4 px-6 text-${getStatusColor(app.status)}-500`}>{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Selected;
