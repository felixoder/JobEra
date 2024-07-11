import { Link } from 'react-router-dom'
import MaxWidthWrapper from './MaxWidthWrapper'

type Props = {}

const Register = (props: Props) => {
  return (
   <MaxWidthWrapper>

<MaxWidthWrapper>
      <div className="flex h-14 items-center justify-between border-b border-zinc-200">
        {/* Correct usage of Link component with to prop instead of href */}
        <Link to="/register/register-recruiter">
        <div className="flex z-40 font-semibold flex-col justify-center items-center md:flex-row hover:underline">
            
            Register as <span className="text-green-600 ml-2">Recruiter</span>
          </div>
        </Link>

        <div className="h-full flex items-center space-x-4 gap-3 ">

            <>
            <Link to="/register/register-normal">
          <div className="flex z-40 font-semibold flex-col justify-center items-center md:flex-row hover:underline" >
            
            Register as <span className="text-green-600 ml-2">Job Seeker</span>
          </div>
        </Link>
         
         
            
            </>
            
 

            <>
            
            
         

        </>
   
          
          
         

          <div className="h-8 w-px bg-zinc-200 hidden md:block" />
       
         
        
      
    
      </div>
      </div>
    </MaxWidthWrapper>
   </MaxWidthWrapper>
  )
}

export default Register