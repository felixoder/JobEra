import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from './redux/store';
// Adjust the import based on your store setup

interface User {
  is_recruiter: boolean;
}

export default function OnlyRecruiterPrivateRoute() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as User | null;

  return (
    currentUser && currentUser.is_recruiter ? <Outlet /> : <Navigate to='/log-in' />
  );
}