import  { useContext } from 'react'
import { ArrowLeft, LogOut, Moon, Sun } from "lucide-react"
import DataContext from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// --- Reusable Components ---
const SelectOption = ({ value, onChange, options, label, description }) => (
  <div className="py-3">
    <div className="mb-2">
      <p className="font-medium text-gray-900">{label}</p>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 dark:text-white"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const ToggleSwitch = ({ enabled, onChange, label, description }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex-1">
      <p className="font-medium text-gray-900 dark:text-white">{label}</p>
      {description && (
        <p className="text-sm text-gray-500 ">{description}</p>
      )}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-500' : 'bg-gray-200  dark:bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);



const SettingPage = () => {
  const {setUserr,axios,setLogin,toggleTheme,dark,socket}=useContext(DataContext);
  const navigate=useNavigate()
  const logout=async()=>{
  try{
    const {data}=await axios.get('/user/logout')
    if(data.success){
      setUserr(undefined)
      setLogin(false)
      toast.success(data.message)
      navigate('/')
      socket.disconnect();
    }
    else{
      toast.error(data.message)
    }
  }
  catch(error){
      toast.error(error.message)
  }
}


  

  return (
    <div className='bg-indigo-100 dark:bg-gray-950 min-h-screen pb-2'>
      <div className='bg-white dark:bg-gray-900'>
        <div className='flex gap-4 font-semibold text-xl items-center justify-start max-w-2xl mx-auto p-5'>
          <ArrowLeft onClick={()=>navigate('/')} className='dark:text-gray-400'/>
          <h1 className='dark:text-white'>Settings</h1>
        </div>
      </div>

      <div className='max-w-2xl mx-auto px-3'>
        <div className='bg-white dark:bg-gray-900 my-8 rounded-xl border border-gray-300 dark:border-gray-600'> 

          <div className='flex gap-1 items-center border-b dark:border-gray-600 border-gray-300 p-6'>
            <div className='p-2 bg-purple-100 dark:bg-purple-950 rounded-lg mr-3'>
              {dark ? (
                <Moon className="h-5 w-5 text-purple-600" />
              ) : (
                <Sun className="h-5 w-5 text-purple-600" />
              )}
            </div>
            <h1 className='font-semibold text-lg dark:text-white'>Appearance</h1>
          </div>
          <div className='p-6'>
            
            <div className="flex items-center justify-between py-3">
    <div className="flex-1">
      <p className="font-medium text-gray-900 dark:text-white">Dark mode</p>
        <p className="text-sm text-gray-500 ">Switch between light and dark theme</p>
    </div>
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        dark ? 'bg-blue-500' : 'bg-gray-200  dark:bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          dark ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
          </div>
        </div>


          <div className='bg-white dark:bg-gray-900 my-8 rounded-xl border border-gray-300 dark:border-gray-600'>
          <div className='flex gap-1 items-center border-b border-gray-300 p-6 dark:border-gray-600'>
            <div className='p-2 bg-rose-200 dark:bg-rose-950 rounded-lg mr-3'>
              <LogOut className="h-5 w-5 dark:text-orange-600 text-orange-500" />
            </div>
            <h1 className='font-semibold text-lg dark:text-white'>Account</h1>
          </div>
          <div className='p-6'>
            <button onClick={logout} className='hover:bg-red-600 flex gap-1 justify-center w-full p-4 bg-red-400 text-white font-semibold rounded-lg'>
              <LogOut />
              Sign out
            </button>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default SettingPage;
