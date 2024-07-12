import  { useState, useEffect, ChangeEvent } from 'react';
import { GetCountries, GetState, GetCity } from 'react-country-state-city';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import { RootState } from '../redux/store';

interface FormData {
  title: string;
  post: string;
  company: string;
  address: string;
  glassdoor: boolean;
  logo: string;
  author: string;
  type: string;
  skills: string;
  salary: string;
  experience: string;
  glassdoortext?: string; // Optional property for glassdoor answer
}

interface User {
  username: string;
}


const JobPost = () => {
  const [countryId, setCountryId] = useState<string | null>(null);
  const [stateId, setStateId] = useState<string | null>(null);
  const [, setCityId] = useState<string | null>(null);
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as User | null;

  const [formData, setFormData] = useState<FormData>({
    title: '',
    post: '',
    logo: '',
    address: '',
    glassdoor: false,
    company: '',
    author: currentUser?.username || '',
    type: 'remote',
    skills: '',
    salary: '',
    experience: '',
  });
console.log(formData)
  const navigate = useNavigate();
  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [stateList, setStateList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetCountries().then((result: React.SetStateAction<any[]>) => setCountriesList(result));
  }, []);

  const handleCountryChange = (selectedOption: any) => {
    setCountryId(selectedOption.id);
    setStateId(null);
    setCityId(null);
    setFormData({ ...formData, address: selectedOption.name });

    GetState(selectedOption.id).then((result: React.SetStateAction<any[]>) => setStateList(result));
  };

  const handleStateChange = (selectedOption: any) => {
    setStateId(selectedOption.id);
    setCityId(null);
    setFormData({ ...formData, address: `${formData.address}, ${selectedOption.name}` });

    GetCity(countryId!, selectedOption.id).then((result: React.SetStateAction<any[]>) => setCityList(result));
  };

  const handleCityChange = (selectedOption: any) => {
    setCityId(selectedOption.id);
    setFormData({ ...formData, address: `${formData.address}, ${selectedOption.name}` });
  };

  const handleGlassdoorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const glassdoor = e.target.value === 'yes';
    setFormData({ ...formData, glassdoor, glassdoortext: glassdoor ? formData.glassdoortext : '' });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.post || !formData.company || !formData.address || !formData.author || !formData.type) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      setLoading(true); // Set loading state to true
      const res = await fetch('https://jobera.onrender.com/api/post-jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      toast.success('Job posted successfully!');
      console.log(data.message)
      navigate('/your-jobs');  // Redirect to jobs page
    } catch (error) {
      toast.error('Sorry, try again later!');
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <MaxWidthWrapper>
      <Toaster />
      <div className="w-full mx-auto mt-10 mb-10 container">
        <h1 className="text-center font-bold text-xl mb-6">Post<span className="text-green-600 font-bold underline">Job</span></h1>
        <form className="bg-white shadow-md rounded-lg px-4 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="flex flex-col md:grid grid-cols-2 gap-10">
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="post">Job Post</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="post"
                  type="text"
                  placeholder="Enter the Job Post (eg, SDE)"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Job Title</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Enter the Job Title"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">Company Name</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="company"
                  type="text"
                  placeholder="Enter The company Name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="logo">Company Logo</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="logo"
                  type="text"
                  placeholder="Enter the logo of the company"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">Skills Required</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="skills"
                  type="text"
                  placeholder="Enter The Skills required"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
                <Select
                  options={countriesList}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  onChange={handleCountryChange}
                  placeholder="Select Country"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
                <Select
                  options={stateList}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  onChange={handleStateChange}
                  placeholder="Select State"
                  isDisabled={!countryId}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                <Select
                  options={cityList}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  onChange={handleCityChange}
                  placeholder="Select City"
                  isDisabled={!stateId}
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="glassdoor">Glassdoor</label>
                <select
                  id="glassdoor"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleGlassdoorChange}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              {formData.glassdoor && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="glassdoortext">Glassdoor Answer</label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="glassdoortext"
                    placeholder="Enter Glassdoor Answer"
                    onChange={handleChange}
                    value={formData.glassdoortext}
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">Salary</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="salary"
                  type="text"
                  placeholder="Enter the Salary"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">Experience Required</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="experience"
                  type="text"
                  placeholder="Enter the Experience"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">Job Type</label>
                <select
                  id="type"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleChange}
                  value={formData.type}
                >
                  <option value="remote">Remote</option>
                  <option value="on-site">On-Site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loading ? <Oval height={20} width={20} color="white" ariaLabel="loading" /> : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </MaxWidthWrapper>
  );
};

export default JobPost;
