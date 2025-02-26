import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { server } from "../../server.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);


    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
        }
    };


    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar);

      try {
          const response = await axios.post(`${server}/user/create-user`, formData, {
              headers: {"Content-Type": "multipart/form-data"},
          });

          console.log("User Created:", response.data);

          // Show success notification
          toast.success(response.data.message, {
              position: "top-right",
              autoClose: 3000,
          });

          // Reset form fields
          setName("");
          setEmail("");
          setPassword("");
          setAvatar(null);
      } catch (error) {
          console.error("Signup Error:", error.response.data || error.message);

        // Show error notification
        toast.error(error.response.data.message || "Signup failed. Please try again." , {
            position: "top-right",
            autoClose: 3000,
        });
      }
    };


    return (
      <section className="min-h-screen py-10 flex flex-col items-center justify-center bg-gradient-to-bl from-violet-600 to-fuchsia-400 dark:from-violet-700 dark:to-fuchsia-500 px-4">
        <h1 className="text-5xl font-bold text-white mb-8 text-center">
          Artisan Marketplace
        </h1>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800 p-8">
          <h2 className="text-xl font-semibold text-center text-gray-700 dark:text-gray-300 mb-6">
            Create your account
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Full Name
                </label>
                <input
                    type="text"
                    name={"name"}
                    value={name}
                    placeholder={"John Doe"}
                    autoComplete={"name"}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label
                    htmlFor={"email"}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email Address
                </label>
                <input
                    type="email"
                    name={"email"}
                    value={email}
                    placeholder={"abc@company.com"}
                    autoComplete={"email"}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label
                    htmlFor={"password"}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                      type={visible ? "text" : "password"}
                      name={"password"}
                      value={password}
                      placeholder={"Enter your password"}
                      autoComplete={"password"}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
                  />
                  <span
                      onClick={() => setVisible(!visible)}
                      className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                  >
                {visible ? (
                    <AiOutlineEye className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                ) : (
                    <AiOutlineEyeInvisible className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                )}
              </span>
                </div>
              </div>
              <div className="flex items-center">
                <span
                    className="h-12 w-12 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                  {avatar ? (
                      <img src={URL.createObjectURL(avatar)} alt="avatar" className="h-full w-full object-cover" />
                  ) : (
                      <RxAvatar className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                  )}

                </span>
                <label
                    htmlFor={"file-input"}
                    className="ml-4 cursor-pointer bg-gray-300 px-4 py-2 rounded-md text-gray-700 dark:text-white hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500">
                  Upload Avatar
                  <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileInputChange}
                      className="sr-only"
                  />
                </label>
              </div>
              <button
                  type="submit"
                  className="w-full py-2 text-white bg-violet-600 hover:bg-violet-700 rounded-lg font-medium focus:ring-4 focus:outline-none focus:ring-violet-300 dark:bg-violet-500 dark:hover:bg-violet-600 dark:focus:ring-violet-800"
              >
              Create an account
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-violet-600 hover:underline dark:text-violet-400">
                  Login here
                </Link>
              </p>
            </form>
        </div>
      </section>
);
};

export default Signup;
