import {
  Upload,
  Camera,
  ArrowLeft,
  AtSign,
  Edit3,
  Save,
  FileText,
  Mail,
  User,
} from "lucide-react";
import userIcon from '../assets/user-profile-icon-free-vector.jpg'
import { useContext, useRef, useState } from "react";
import DataContext from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UserInfo = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [edit, setEdit] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(profileImage);
  const fileInputRef = useRef(null);
  const {axios,userr,setUserr}=useContext(DataContext)


  const handleImageUpload = (file) => {
  if (file && file.type.startsWith("image/")) {
    setProfileImage(file); // store the File object directly
  }
  const reader = new FileReader();
    reader.onloadend = () => {
      // optionally set preview image if needed
      setPreview(reader.result); // <-- Add a new preview state if you want
    };
    reader.readAsDataURL(file);
};

const handleFileInputChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    handleImageUpload(e.target.files[0]);
  }
};

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };
  const navigate=useNavigate()
const updateProfile = async (userId) => {
  try {
    const details = {};

    if (name.trim()) details.fullname = name.trim();
    if (email.trim()) details.email = email.trim();
    if (bio.trim()) details.bio = bio.trim();

    if (username.trim()) {
      details.username = username.trim();
    }

    details.userId = userId;

    const formData = new FormData();
    formData.append("details", JSON.stringify(details));

    // Only append image if profileImage is a File or Blob (not a base64 string or undefined)
    if (profileImage) {
      formData.append("image", profileImage);
    }

    const { data } = await axios.post("/user/updateProfile", formData);

    if (data.success) {
      console.log(data.message);
      setBio("");
      setEmail("");
      setName("");
      setEdit(false);
      setUserName("");
      setUserr(data.user)
      toast.success(data.message)
    } else {
      toast.error(data.message)
      console.log(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  return (
    <div className="bg-indigo-100 dark:bg-gray-950 min-h-screen ">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900">
        <div className="flex font-semibold text-xl items-center justify-between max-w-2xl mx-auto py-4 px-3">
          <div className="flex gap-4 items-center">
            <ArrowLeft onClick={()=>navigate('/')} className="dark:text-gray-400 text-gray-600" />
            <h1 className="dark:text-white">Profile</h1>
          </div>
          {edit ? (
            <div className="flex gap-3 text-base">
              <button
                className="font-medium rounded-lg hover:bg-gray-300 dark:text-white px-2 cursor-pointer"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
              <button
                className="flex gap-2 items-center bg-blue-400 p-2 rounded-lg hover:bg-blue-700 cursor-pointer text-white"
                onClick={()=>updateProfile(userr._id)}
                type="submit"
              >
                <Save className="w-5 h-5" />
                Save
              </button>
            </div>
          ) : (
            <button
              className="flex items-center gap-4 justify-center text-white bg-blue-400 p-2 text-base rounded-lg hover:bg-blue-700 cursor-pointer"
              onClick={() => setEdit(true)}
              type="button"
            >
              <Edit3 className="w-5 h-5" />
              <h1>Edit</h1>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-2">
      <div className="max-w-2xl bg-white dark:bg-gray-900 border  sm:p-0 dark:border-gray-700 border-gray-300 rounded-xl mx-auto my-7">
        {/* Profile image and drag-drop */}
        <div className="flex gap-4 items-center p-6 border-b border-gray-300 dark:border-gray-700">
          <div className="relative">
            <img
              src={userr.profilePicture || preview || userIcon}
              alt="User"
              className="rounded-full w-22 h-22 border-gray-300 border-2 dark:border-gray-500 dark:border-3 object-cover"
            />
            {edit && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0.5 right-1  p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-colors"
              >
                <Camera className="h-4 w-4" />
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>

          {edit && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex-1 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300"
              }`}
            >
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Drag and drop your image here, or{" "}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  browse
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Form fields */}
        <div className="p-6">
          {/* Full Name */}
          <div className="py-2">
            <label htmlFor="name" className="text-md font-semibold dark:text-white">
              Full Name
            </label>
            <div className="relative py-2">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={userr?.fullname || 'Enter your name'}
                className={`focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 pl-8 py-2.5 text-gray-600 bg-gray-50 border dark:border-gray-700 border-gray-200 w-full rounded-lg ${edit?'dark:bg-gray-400':'dark:bg-gray-800'}`}
              />
              <User className="absolute top-4.5 left-1 text-gray-300 dark:text-gray-700  w-6 h-6" />
            </div>
          </div>

          {/* Username */}
          <div className="py-2">
            <label htmlFor="username" className="text-md font-semibold dark:text-white">
              Username
            </label>
            <div className="relative py-2">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={userr?.username || 'Enter your Username'}
                className={`focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 pl-8 py-2.5 text-gray-600 bg-gray-50 border border-gray-200 w-full rounded-lg dark:border-gray-700 ${edit?'dark:bg-gray-400':'dark:bg-gray-800'}`}
              />
              <AtSign className="absolute top-4.5 left-1 text-gray-300 w-6 h-6 dark:text-gray-700" />
            </div>
          </div>

          {/* Email */}
          <div className="py-2">
            <label htmlFor="email" className="text-md font-semibold dark:text-white">
              Email Address
            </label>
            <div className="relative py-2">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={userr?.email || "Enter your email"}
                className={`pl-8 py-2.5 text-gray-600 bg-gray-50 border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200  dark:border-gray-700 border-gray-200 w-full rounded-lg ${edit?'dark:bg-gray-400':'dark:bg-gray-800'}`}
              />
              <Mail className="absolute top-4.5 left-1 text-gray-300 w-6 h-6 dark:text-gray-700" />
            </div>
          </div>

          {/* Bio */}
          <div className="py-2">
            <label htmlFor="bio" className="dark:text-white text-md font-semibold">
              Bio
            </label>
            <div className="relative py-2">
              <textarea
                name="bio"
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder={userr?.bio || "Tell us about yourself"}
                className={`pl-8 py-2.5 text-gray-600 bg-gray-50 border border-gray-200 w-full   dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${edit?'dark:bg-gray-400':'dark:bg-gray-800'}`}
                rows={4}
              ></textarea>
              <FileText className="absolute top-4.5 left-1 text-gray-300 w-6 h-6 dark:text-gray-700" />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default UserInfo;
