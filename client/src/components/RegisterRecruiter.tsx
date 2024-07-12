import React, { useState, useEffect, ChangeEvent } from 'react';
import { GetCountries, GetState, GetCity } from 'react-country-state-city';
import Select from 'react-select';
import MaxWidthWrapper from './MaxWidthWrapper';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'; // Loader component from react-loader-spinner

interface FormData {
  fullname: string;
  email: string;
  password: string;
  address: string;
}

const RegisterRecruiter: React.FC = () => {
  const [countryId, setCountryId] = useState<string | null>(null);
  const [stateId, setStateId] = useState<string | null>(null);
  const [, setCityId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({ fullname: '', password: '', email: '', address: '' });
  const navigate = useNavigate();
  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [stateList, setStateList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // Loading state

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.fullname || !formData.address || !formData.password) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      setLoading(true); // Set loading state to true
      const res = await fetch('https://jobera.onrender.com/api/register-recruiter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('Response data:', data);  // Debugging line to see the response

      if (!res.ok || !data.user_id) {
        toast.error('Something went wrong. Try again!');
        return;
      }

      toast.success('You are registered successfully!');
      navigate('/log-in');
    } catch (error) {
      console.error('Error:', error);  // Debugging line to see the error
      toast.error('Sorry, try again later!');
    } finally {
      setLoading(false); // Set loading state to false
    }
  };
  return (
    <MaxWidthWrapper>
      <Toaster />
      <div className="flex flex-col lg:grid grid-cols-2">
        <MaxWidthWrapper className="flex justify-center items-center">
          <div className="">
            <h1 className="text-center font-semibold text-2xl">
              If You want to register as a <span className="text-green-600 font-semibold underline">Recruiter</span> You have the all functionality to recruit geeks according to your choices. You can <span className="text-green-600 font-semibold">Take interview via inbuilt glassdoor and you can hire students.</span>
            </h1>
            <img src="/chess.png" className="hidden md:block" alt="" />
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="flex mx-auto">
          <div className="w-full max-w-md mx-auto mt-10 mb-10">
            <h1 className="text-center font-bold text-xl">Register as a <span className="text-green-600 font-bold underline">Recruiter</span></h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Your Full Name</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fullname"
                  type="text"
                  placeholder="Enter Your Full-Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Your Email</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter Your Email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                  onChange={handleChange}
                  required
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
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
                  type="submit"
                >
                  {loading ? <Oval color="#fff" height={24} width={24} /> : 'Sign Up'}
                </button>
              </div>
            </form>
          </div>
        </MaxWidthWrapper>
      </div>
    </MaxWidthWrapper>
  );
};

export default RegisterRecruiter;
