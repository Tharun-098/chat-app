import { Lock, Mail, User, EyeOff, Eye, MessageCircleCodeIcon } from "lucide-react";
import { useEffect,useContext, useState } from "react";
import DataContext from "../context/DataContext";
import { useNavigate } from "react-router-dom";
const LoginRegister = () => {
  const {setUserr,userr,setLogin,axios,fetchUser,connectSocket}=useContext(DataContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwords, setPasswords] = useState(true);
  const [state, setState] = useState('login');
  
  const navigate=useNavigate()
  
   useEffect(() => {
     if (userr) {
       navigate("/", { replace: true });
     }
   }, [userr]);

  const handleLogin=async(e)=>{
    try{
      e.preventDefault()
      const {data}=await axios.post(`/user/${state}`,{username:name,email,password})
      if(data.success){
      setUserr(data.user)
      connectSocket(data.user)
      setLogin(true);
      console.log(data.message)  
      setName("")
      setEmail("")
      setPassword("")
      setConfPassword("")
      console.log(userr)
      await fetchUser();
      }
      else{
        console.log(data.message)
      }
    }catch(error){
      console.log(error.message)
    }
}
  return (
    <div className="bg-indigo-100  min-h-screen flex items-center justify-center p-3 sm:p-0">
      <div className="bg-white max-w-md  h-auto w-full p-6 rounded-lg my-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl scale-140"><MessageCircleCodeIcon /></span>
            </div>
        <div className="text-center">
          <h1 className="font-bold text-2xl text-black">
            {state=='register' ? "Create Account" :  "Welcome Back"}
          </h1>
          <p className="py-2 ">
            {state==='register'? "Join our community today":"Sign into your account"}
          </p>
        </div>
        <div>
          <form onSubmit={handleLogin}>
            {state==='register'&& (
              <div className="relative">
                <User className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Username"
                  required
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900"
                />
              </div>
            )}

            <div className="relative my-3">
              <Mail className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900"
              />
            </div>

            <div className="relative my-3">
              <Lock className="w-5 h-6 absolute left-3 top-3 text-gray-400" />
              <input
                type={passwords ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900"
              />
              <button
                type="button"
                onClick={() => setPasswords(!passwords)}
                className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                {passwords ? <EyeOff /> : <Eye />}
              </button>
            </div>
        
            <button
                type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {state!='register' ? "Sign in" : "Sign up"}
            </button>
          </form>
    
          <p className="py-3 text-center">
            {state==='register'?'Already have an account?':'create an account?'}
            <span
              onClick={() =>{state=='register'?setState('login'):setState('register')}}
              className="px-2 cursor-pointer text-indigo-900 font-semibold"
            >
              {state!='register'?'Sign up':'Sign in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
