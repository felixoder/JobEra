import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from './redux/store'; // Adjust the import based on your store setup

interface User {
  is_premium: boolean;
}

export default function OnlyPremiumPrivateRoute() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as User | null;

  return (
    currentUser && currentUser.is_premium ? <Outlet /> : <Navigate to='/log-in' />
  );
}