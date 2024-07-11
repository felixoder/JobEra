import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import { Link } from 'react-router-dom';
import moment from 'moment';

interface Job {
  id: string;
  logo: string;
  description: string;
  title: string;
  type: string;
  company: string;
  skills: string;
  address: string;
  created_at: string;
  author: string;
  slug: string;
  experience: string;
}

interface User {
  username: string;
}

const YourJobs = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as User | null;
  const [isLoading, setIsLoading] = useState(true);
  const [loading , setLoading] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`https://jobera.onrender.com/api/get-jobs?username=${currentUser?.username}`);
        if (res.status === 200) {
          // Sort jobs by created_at in descending order
          const sortedJobs = res.data.sort((a: Job, b: Job) => {
            return moment(b.created_at).diff(moment(a.created_at));
          });
          setJobs(sortedJobs);
        } else {
          throw new Error('Failed to fetch jobs');
        }
      } catch (err) {
        toast.error('Jobs not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
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

  const handleDeleteJob = async (jobId: string) => {
    try {
      const res = await axios.delete(`https://jobera.onrender.com/api/delete-jobs/${jobId}`);
      setLoading(true)

      if (res.status === 200) {
        toast.success('Job deleted successfully');
        // Remove the deleted job from the state
        setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
        setLoading(false)
      } else {
        throw new Error('Failed to delete job');
      }
    } catch (err) {
      toast.error('Failed to delete job');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-auto px-10 mt-20">
        <Oval color="#000" height={50} width={50} />
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center mx-auto px-10 mt-20">
        <Oval color="#000" height={50} width={50} />
      </div>
    );
  }

  if (!jobs.length) {
    return <div>Jobs not found</div>;
  }

  return (
    <MaxWidthWrapper className="">
      <div className="flex flex-col gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="relative flex bg-slate-100 shadow-md rounded-lg overflow-hidden mt-5">
            <div className="p-4">
              <img src={job.logo} alt={job.title} className="w-28 h-28 rounded-full object-fit" />
            </div>
            <div className="flex-grow p-4">
              <p className="text-slate-500 mb-1 font-bold">{job.company}</p>
              <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
              <div className="lg:flex">
                <p className="text-slate-500 mb-1">{job.type.charAt(0).toUpperCase() + job.type.slice(1)}</p>
                <p className="text-slate-500 mb-1 md:ml-3">{job.address}</p>
              </div>
              {currentUser?.username === job.author && (
                <div className=" text-gray-600 text-sm flex gap-2 font-bold">
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className="absolute bottom-1 right-2 text-gray-600 text-sm">
              {' '}&middot;{' '}
              {timeSince(job.created_at)}
            </div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default YourJobs;
