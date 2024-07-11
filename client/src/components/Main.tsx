import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../Search/SearchBar';
import FilterBar from '../Search/FilterBar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Oval } from 'react-loader-spinner';

interface Job {
  id: number;
  title: string;
  company: string;
  salary: string;
  experience: string;
  slug:string,
  logo:string,
  address:string,
  type:string,
  created_at:string
}

const Main: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/get-jobs'); // Adjust URL as per your backend endpoint
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/get-jobs?title=${query}`); // Adjust URL as per your backend endpoint
      setJobs(res.data);
    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  };

  const handleFilter = async (filters: Record<string, string>) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/get-jobs`, {
        params: filters, // Send filters as query parameters
      });
      setJobs(res.data);
    } catch (error) {
      console.error('Error filtering jobs:', error);
    }
  };

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
  

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4 text-center">All Available Jobs</h1>
      <SearchBar onSearch={handleSearch} />
      <FilterBar onFilter={handleFilter} />
      {isLoading ? (
        <div className="flex justify-center items-center mt-8">
          <div className="flex justify-center items-center mx-auto px-10 mt-20">
        <Oval color="#000" height={50} width={50} />
      </div>
        </div>
      ) : !jobs ? (
        <p className="mt-4">No jobs found.</p>
      ) : (
        <div className="mt-4">
       {jobs.map((job) => (
          <Link to={`/jobs/${job.slug}`} key={job.id}>
            <div className="relative flex bg-slate-100 shadow-md rounded-lg overflow-hidden mt-5">
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
                
              </div>
              <div className="absolute bottom-1 right-2 text-gray-600 text-sm">
                {' '}&middot;{' '}
                {timeSince(job.created_at)}
              </div>
            </div>
          </Link>
        ))}
        </div>
      )}
    </div>
  );
};

export default Main;
