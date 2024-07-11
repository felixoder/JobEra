import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { LoaderPinwheel } from "lucide-react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Job {
  id: number;
  post: string;
  title: string;
  logo: string;
  address: string;
  glassdoor: boolean;
  company: string;
  author: string;
  type: string;
  glassdoortext: string;
  description: string;
  skills: string;
  created_at: string;
  slug: string;
  salary: string;
  experience: string;
}

interface User {
  username: string;
  email: string;
  is_recruiter: boolean;
  resume: string;
  fullname: string;
}

interface FormData {
  fullname: string | undefined;
  resume: string | undefined;
  why: string;
  additional: string;
  glassdoor_answer: string;
  username: string | undefined;
  glassdoor: boolean;
  author: string | undefined;
  application: string | undefined;
  status: string;
}

const Jobs = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState<Job | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(false);
  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser
  ) as User | null;

  const [formData, setFormData] = useState<FormData>({
    fullname: currentUser?.fullname,
    resume: currentUser?.resume || "None",
    why: "",
    additional: "",
    glassdoor_answer: "",
    username: currentUser?.username,
    glassdoor: false,
    author: undefined,
    application: undefined,
    status: "Pending",
  });

  console.log(formData);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `https://jobera.onrender.com/api/get-jobs?slug=${slug}`
        );

        if (res.status === 200) {
          const fetchedJob = res.data[0]; // Assuming you're fetching a single job, access the first element of the array
          setJob(fetchedJob);
          setFormData((prevData) => ({
            ...prevData,
            glassdoor: fetchedJob.glassdoor,
            author: fetchedJob.author,
            application: fetchedJob.slug,
          }));
        } else {
          throw new Error("Failed to fetch job");
        }
      } catch (err) {
        toast.error("Job not found");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [slug]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://jobera.onrender.com/api/get-user?username=${job?.author}`
        );
        if (res.status === 200) {
          setUser(res.data);
        } else {
          throw new Error("Failed to fetch user");
        }
      } catch (err) {
        toast.error("User not found");
      }
    };

    // Fetch user info only if job data and job.author are available
    if (job?.author) {
      fetchUser();
    }
  }, [job?.author]); // Only refetch user when job.author changes

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Simulate submission or handle actual submission logic
      // Replace with actual API call using Axios or fetch
      const res = await axios.post(
        "https://jobera.onrender.com/api/apply-jobs",
        formData
      );
      if (res.status === 200) {
        toast.success("Application submitted successfully!");
        navigate('/pending-application')
    
      } else {
        throw new Error("Failed to submit application");
      }
    } catch (err) {
      toast.error("Failed to submit application");
    } finally {
      setLoading(false);
      setFormData({
        fullname: currentUser?.fullname,
        resume: currentUser?.resume || "None",
        why: "",
        additional: "",
        glassdoor_answer: "",
        username: currentUser?.username,
        glassdoor: job?.glassdoor || false,
        author: job?.author,
        application: job?.slug,
        status: "Pending",
      });
      
     
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-auto px-10 mt-20">
        <Oval color="#000" height={50} width={50} />
      </div>
    );
  }

  if (!job) {
    return <div>No job found</div>;
  }

  // Splitting skills into an array and joining with the delimiter
  const skillsArray = job.skills.split(",").map((skill) => skill.trim());
  const skillsWithDelimiter = skillsArray.join(" \u00B7 "); // Unicode character for middle dot (·)

  return (
    <>
      <MaxWidthWrapper>
        <div className="flex flex-col md:grid grid-cols-2 gap-8">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl mt-5">{job.title}</h1>
            <div className="flex gap-3">
              <p className="text-gray-600 font-semibold">
                {" \u00B7 "}
                {job.type}
              </p>
              <p className="text-gray-600 font-semibold">
                {" \u00B7 "}
                {job.address}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={job.logo}
              alt={job.title}
              className="rounded-full object-cover "
            />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="font-semibold text-2xl text-green-800">
            *Skills Required
          </h2>
          <p className="text-gray-600 text-md font-semibold">
            {skillsWithDelimiter}
          </p>
        </div>
        <div className="mt-8">
          <h2 className="font-semibold text-2xl text-green-800">*Experience</h2>
          <p className="text-gray-600 text-md font-semibold">
            {job.experience}
          </p>
        </div>
        <h1 className="font-bold underline text-2xl mt-5">Job Description</h1>
        <p>{job.description}</p>
        <h1 className="font-bold underline text-2xl mt-5">Salary</h1>
        <p className="text-green-800 font-bold mt-3 ml-2 text-2xl">
          {job.salary}K USD /year*
        </p>

        {user && (
          <h1 className="text-gray-600 mt-5">
            Contact Person: {user.email}
            {"   "}({user.username})
          </h1>
        )}

        {!currentUser?.is_recruiter && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                {job.glassdoor && (
                  <>
                    <h1 className="text-green-700 font-bold text-xl mt-10 underline">
                      *GlassDoor Question
                    </h1>
                    <label className="block text-gray-700 text-xl mt-5 font-bold mb-2">
                      {job.glassdoortext}
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="glassdoor_answer"
                      value={formData.glassdoor_answer}
                      onChange={handleChange}
                      required
                      placeholder="Enter Your Solution"
                    />
                  </>
                )}
              </div>
              <div className="flex flex-col md:grid grid-cols-2 gap-2">
                <div className="mb-4">
                  <label className="block text-gray-700 text-xl mt-5 font-bold mb-2">
                    Tell us why you want this job
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="why"
                    value={formData.why}
                    onChange={handleChange}
                    placeholder="Enter Your Answer"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-xl mt-5 font-bold mb-2">
                    Additional
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="additional"
                    value={formData.additional}
                    onChange={handleChange}
                    placeholder="Add Your additional message to the recruiter"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-xl mt-5 font-bold mb-2">
                  Attach Your Resume *Default resume is here
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="resume"
                  value={formData.resume}
                  onChange={handleChange}
                  required
                  placeholder="Enter Your Answer"
                />
              </div>

              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto ${
                  !formData.glassdoor_answer && job.glassdoor ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={!formData.glassdoor_answer && job.glassdoor}
              >
                {loading ? (
                  <Oval color="#fff" height={24} width={24} />
                ) : (
                  <div className="flex gap-2">
                    <LoaderPinwheel /> <p>JobEra Ez Apply</p>
                  </div>
                )}
              </button>
            </form>
          </>
        )}
      </MaxWidthWrapper>
    </>
  );
};

export default Jobs;
