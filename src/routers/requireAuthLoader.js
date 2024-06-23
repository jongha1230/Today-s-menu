import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import useUserStore from '../store/useUserStore';

export const requireAuthLoader = () => {
  const { user } = useUserStore.getState();
  if (!user) {
    toast.warn('로그인 후 이용 해주세요.');
    return redirect('/logIn');
  }
  return null;
};
