import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import UpdateStatus from './UpdateStatus';
import { CircleX } from 'lucide-react';

interface Application {
  id: number;
  application: string;
  author: string;
  created_at: string;
  status: string;
  username: string;
  glassdoor: boolean;
  glassdoor_answer: string;
  fullname: string;
  resume: string;
  additional: string;
}

interface User {
  username: string;
}

const ViewApplication: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApplicationId, setSelectedApplicationId] = useState<number | null>(null);
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as User | null;

  const fetchApplications = async () => {
    try {
      const res = await axios.get<Application[]>(`https://jobera.onrender.com/api/get-application?author=${currentUser?.username}&status=Pending`);
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

  useEffect(() => {
    fetchApplications();
  }, [currentUser]);

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

  const handleOpenFeedbackModal = (appId: number) => {
    setSelectedApplicationId(appId);
  };

  const handleCloseFeedbackModal = () => {
    setSelectedApplicationId(null);
  };

  const handleFeedbackSubmit = () => {
    fetchApplications(); // Refresh applications after feedback submission
    setSelectedApplicationId(null); // Close feedback modal
  };

  if (!applications && !isLoading) {
    return (
      <div className="flex justify-center items-center mx-auto px-10 mt-20 flex-col gap-4">
        <h1 className='text-center font-semibold'>You don't have any applications</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Applications</h1>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Oval color="#000" height={50} width={50} />
        </div>
      ) : (
        <div className="overflow-auto rounded-lg shadow">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left font-medium text-gray-500 uppercase tracking-wider">Application</th>
                <th className="py-3 px-6 text-left font-medium text-gray-500 uppercase tracking-wider">Applicant's Name</th>
                <th className="py-3 px-6 text-left font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                <th className="py-3 px-6 text-left font-medium text-gray-500 uppercase tracking-wider">Additional Info</th>
                <th className="py-3 px-6 text-left font-medium text-gray-500 uppercase tracking-wider">Glassdoor Answer</th>
                <th className="py-3 px-6 text-left font-medium text-gray-500 uppercase tracking-wider">Applied on</th>
                <th className="py-3 px-6 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id}>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <Link to={`/jobs/${app.application}`} className="font-bold text-green-600 hover:underline">
                      {app.application}
                    </Link>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <Link to={`/profile/${app.username}`} className="hover:underline">
                      {app.fullname}
                    </Link>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <Link to={app.resume} target='_blank' className="text-blue-700 hover:underline">
                      {app.resume}
                    </Link>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">{app.additional}</td>
                 
                  <td className="py-4 px-6 whitespace-nowrap">{app.glassdoor_answer || <CircleX color="red"/>}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{timeSince(app.created_at)}</td>
                  <td className={`py-4 px-6 whitespace-nowrap text-${getStatusColor(app.status)}-500`}>{app.status}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {(app.status === 'Selected' || app.status === 'Rejected') && (
                      <button
                        onClick={() => handleOpenFeedbackModal(app.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg mr-2"
                      >
                        Provide Feedback
                      </button>
                    )}
                    <UpdateStatus applicationId={app.id} currentStatus={app.status} onUpdate={fetchApplications} author={''} username={''} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Render FeedbackModal if selectedApplicationId is not null */}
      
    </div>
  );
};

export default ViewApplication;
