import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server.jsx";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post(
                `${server}/user/login-user`,
                { email, password },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success("Login successful!", {
                    position: "top-right",
                    autoClose: 3000,
                });

                // Set authentication state here if using a global state (like Redux or Context API)
                navigate("/profile", { replace: true });
                window.location.reload(true);
            })
            .catch((err) => {
                toast.error(err.response.data.message, {
                    position: "top-right",
                    delay: 3000,
                });
            });
    };

    window.scrollTo(0, 0);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-violet-600 to-fuchsia-400 dark:from-violet-700 dark:to-fuchsia-500 px-4">
            <h1 className="text-5xl font-bold text-white mb-8 text-center">
                Artisan Marketplace
            </h1>
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800 p-8">
                <h2 className="text-xl font-semibold text-center text-gray-700 dark:text-gray-300 mb-6">
                    Login to your account
                </h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            autoComplete={"email"}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={visible ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
                                required
                            />
                            <span
                                onClick={() => setVisible(!visible)}
                                className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                            >
                                {visible ? (
                                    <AiOutlineEye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                ) : (
                                    <AiOutlineEyeInvisible className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded focus:ring-violet-500 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-500 dark:text-gray-300">
                                Remember me
                            </label>
                        </div>
                        <Link to="/forgot-password" className="text-sm text-violet-600 hover:underline dark:text-violet-400">
                            Forgot password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-violet-600 hover:bg-violet-700 rounded-lg font-medium focus:ring-4 focus:outline-none focus:ring-violet-300 dark:bg-violet-500 dark:hover:bg-violet-600 dark:focus:ring-violet-800"
                    >
                        Sign in
                    </button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        Don’t have an account yet?{' '}
                        <Link to="/sign-up" className="text-violet-600 hover:underline dark:text-violet-400">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Login;