import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";
import { updateFailure, updateStart, updateSuccess } from "../redux/user/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";


interface FormData {
  is_premium: boolean;
}

interface User {
  username: string;
  is_premium: boolean;
}

const Congratulation = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as User | null;
  const [formData] = useState<FormData>({
    is_premium: true, // Set the initial value to true
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateStart());
      setLoading(true);

      const res = await fetch(`https://jobera.onrender.com/api/edit-profile/${currentUser?.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update profile.');
      }

      dispatch(updateSuccess(data));
      toast.success('You are now Premium User.');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again later.');
      dispatch(updateFailure('Failed to update profile.'));
    } finally {
      setLoading(false);
      navigate(`/profile/${currentUser?.username}`)
    }
  };

  return (
    <>
    <h1 className="text-center font-bold text-2xl mt-5">Congratulations! You got the lifetime Premium membership! <span className="text-green-600 hover:underline cursor-pointer">Confirm</span> to get it</h1>
    
      {loading ? (
        <div className="flex justify-center items-center mx-auto px-10 mt-20">
          <Oval color="#fff" height={24} width={24} />
        </div>
      ) : (
        <>


        <form onSubmit={handleSubmit} className="flex justify-center mt-10 ">
            <div className="flex justify-center items-center">


            <button type="submit"  className="bg-blue-500 hover:bg-blue-600 text-white  rounded h-10 w-32">
            Confirm
          </button>
          <img src="/arrow.png" alt="" className="w-44 h-32"/>


            </div>
            
          
        </form>
            
            </>
      )}
      
    </>
  );
};

export default Congratulation;
