import React, { useState, useEffect, ChangeEvent } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import { RootState } from '../redux/store';
import { GetCountries, GetState, GetCity } from 'react-country-state-city';
import { useNavigate } from 'react-router-dom';

interface FormData {
  fullname: string;
  address: string;
  skills: string;
  resume: string;
  portfolio: string;
  position: string;
  profile_image: string;
  bio: string;
  description: string;
}

interface User {
  fullname: string;
  description: string;
  bio: string;
  address: string;
  portfolio: string;
  skills: string;
  resume: string;
  profile_image: string;
  position: string;
  username: string;
}

const EditJob: React.FC = () => {
  const [countryId, setCountryId] = useState<string | null>(null);
  const [stateId, setStateId] = useState<string | null>(null);
  const [cityId, setCityId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    address: '',
    skills: '',
    resume: '',
    portfolio: '',
    position: '',
    profile_image: '',
    bio: '',
    description: '',
  });
  const navigate = useNavigate();
  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [stateList, setStateList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as User | null;

  useEffect(() => {
    // Fetch countries list on component mount
    GetCountries().then((result) => setCountriesList(result));
  }, []);

  const handleCountryChange = (selectedOption: any) => {
    // Handle country change and fetch states
    setCountryId(selectedOption.id);
    setStateId(null);
    setCityId(null);
    setFormData({ ...formData, address: selectedOption.name });

    GetState(selectedOption.id).then((result) => setStateList(result));
  };

  const handleStateChange = (selectedOption: any) => {
    // Handle state change and fetch cities
    setStateId(selectedOption.id);
    setCityId(null);
    setFormData({ ...formData, address: `${formData.address}, ${selectedOption.name}` });

    GetCity(countryId!, selectedOption.id).then((result) => setCityList(result));
  };

  const handleCityChange = (selectedOption: any) => {
    // Handle city change
    setCityId(selectedOption.id);
    setFormData({ ...formData, address: `${formData.address}, ${selectedOption.name}` });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Handle form input changes
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateStart());
      setLoading(true);

      const res = await fetch(`http://localhost:8000/api/edit-profile/${currentUser?.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update profile.');
      }

      dispatch(updateSuccess(data));
      toast.success('Profile updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again later.');
      dispatch(updateFailure(error.message || 'Failed to update profile.'));
    } finally {
      setLoading(false);
      navigate(`/profile/${currentUser?.username}`);
    }
  };

  return (
    <MaxWidthWrapper>
      <Toaster />
      <div className="flex flex-col lg:grid grid-cols-1">
        <MaxWidthWrapper className="flex mx-auto">
          <div className="w-full max-w-md mx-auto mt-10 mb-10">
            <h1 className="text-center font-bold text-xl">Edit Profile</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Your Full Name</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fullname"
                  defaultValue={currentUser?.fullname || ''}
                  type="text"
                  placeholder="Enter Your Full Name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Your Position</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="position"
                  type="text"
                  placeholder="Enter Your Position"
                  onChange={handleChange}
                  defaultValue={currentUser?.position || ''}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Your Profile Image URL</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="profile_image"
                  type="text"
                  placeholder="Enter Your Profile Image URL"
                  onChange={handleChange}
                  defaultValue={currentUser?.profile_image || ''}
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
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Your Portfolio Link</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="portfolio"
                  type="text"
                  placeholder="Enter Your Portfolio Link"
                  onChange={handleChange}
                  defaultValue={currentUser?.portfolio || ''}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Your Skills</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="skills"
                  type="text"
                  placeholder="Enter Your Skills"
                  onChange={handleChange}
                  defaultValue={currentUser?.skills || ''}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Your Resume Link</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="resume"
                  type="text"
                  placeholder="Enter Your Resume Link"
                  onChange={handleChange}
                  defaultValue={currentUser?.resume || ''}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Your Bio Here</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="bio"
                  type="text"
                  placeholder="Enter Your Bio Here"
                  onChange={handleChange}
                  defaultValue={currentUser?.bio || ''}
                />
              </div>
              <div className="mb-6 text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {loading ? (
                    <Oval className="h-5 w-5 inline-block text-white" />
                  ) : (
                    'Update Profile'
                  )}
                </button>
              </div>
            </form>
          </div>
        </MaxWidthWrapper>
      </div>
    </MaxWidthWrapper>
  );
};

export default EditJob;