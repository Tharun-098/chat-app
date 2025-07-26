import { useContext} from 'react';
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';
import DataContext from '../context/DataContext';

const HomePage = () => {
  const { chat,userr } = useContext(DataContext);

  return (
    <>
     {userr && 
     (<div className="h-screen flex">
       <div className={`${chat ? 'hidden lg:block' : 'block'} w-full h-screen overflow-y-auto lg:w-1/3`}>
     <SideBar />
     </div>
<div className={`${chat ? 'block' : 'hidden lg:block'} w-full lg:w-3/4 overflow-y-auto h-screen`}>
     <Outlet />
     </div>
     </div>)}
    </>
  );
};

export default HomePage;

