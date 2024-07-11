import moment from 'moment';
import  { useEffect, useState } from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


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
  status: string;
}

interface Application {
  id: string;
  job_id: string;
  applicant: string;
  status: string;
}

interface User {
  username: string;
}

const GeeksDash_prem = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as User | null;
  const [, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalApplications, setTotalApplications] = useState<number>(0);
  const [pendingApplications, setPendingApplications] = useState<number>(0);
  const [selectedApplications, setSelectedApplications] = useState<number>(0);
  const [rejectedApplications, setRejectedApplications] = useState<number>(0);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/get-jobs`);
        if (res.status === 200) {
          const sortedJobs = res.data.sort((a: Job, b: Job) => moment(b.created_at).diff(moment(a.created_at)));
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

    const fetchApplications = async () => {
      try {
        const res = await axios.get(`https://jobera.onrender.com/api/get-application?username=${currentUser?.username}`);
        if (res.status === 200) {
          const applications: Application[] = res.data;
          setTotalApplications(applications.length);
          setPendingApplications(applications.filter(app => app.status === 'Pending').length);
          setSelectedApplications(applications.filter(app => app.status === 'Selected').length);
          setRejectedApplications(applications.filter(app => app.status === 'Rejected').length);
        } else {
          throw new Error('Failed to fetch applications');
        }
      } catch (err) {
        toast.error('Applications not found');
      }
    };

    if (currentUser) {
      fetchJobs();
      fetchApplications();
    }
  }, [currentUser]);

  const data = {
    labels: ['Pending', 'Selected', 'Rejected'],
    datasets: [
      {
        label: '# of Applications',
        data: [pendingApplications, selectedApplications, rejectedApplications],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='p-3 md:mx-auto'>
      <h1 className='text-center font-bold text-white text-xl bg-orange-600 rounded-md mb-2'>Premium Dashboard for the Geeks</h1>
      <div className='flex-wrap flex gap-4 justify-center'>
        <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-black text-md uppercase'>Total Jobs on JobEra</h3>
              <p className='text-2xl'>{jobs.length}</p>
            </div>
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              Created By Recruiters
            </span>
          </div>
        </div>
        <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-black text-md uppercase'>Total Applications</h3>
              <p className='text-2xl'>{totalApplications}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-blue-500 text-md uppercase'>Pending Applications</h3>
              <p className='text-2xl'>{pendingApplications}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-green-500 text-md uppercase'>Selected Applications</h3>
              <p className='text-2xl'>{selectedApplications}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-red-500 text-md uppercase'>Rejected Applications</h3>
              <p className='text-2xl'>{rejectedApplications}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className='mt-8 flex justify-center'>
       
        <div style={{ width: '400px', height: '400px' }}>
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};

export default GeeksDash_prem;
