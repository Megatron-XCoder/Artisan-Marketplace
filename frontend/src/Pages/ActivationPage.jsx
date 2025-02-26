import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../server.jsx";
import { toast } from "react-toastify";

const ActivationPage = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(20);
    const activationSent = useRef(false);
    const timerRef = useRef(null); // Ref to store timer interval

    useEffect(() => {
        if (activation_token && !activationSent.current) {
            activationSent.current = true;
            const sendRequest = async () => {
                try {
                    const res = await axios.get(`${server}/user/activation/${activation_token}`);
                    toast.success("Account Activated Successfully! 🎉", {
                        position: "top-right",
                        autoClose: 3000,
                    });

                    // Start countdown timer
                    timerRef.current = setInterval(() => {
                        setCountdown((prev) => {
                            if (prev <= 1) {
                                clearInterval(timerRef.current);
                                navigate("/login");
                                return 0;
                            }
                            return prev - 1;
                        });
                    }, 1000);

                } catch (err) {
                    setError(true);
                    toast.error("Token Expired! ❌", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                }
            };
            sendRequest();
        }

        // Cleanup interval on component unmount
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [activation_token, navigate]);

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-center p-4">
            <img
                src="/Business Salesman.gif"
                alt="Success Animation"
                className="w-48 h-48 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto mb-4"
            />
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 sm:p-6 w-full max-w-md md:max-w-lg lg:max-w-xl">
                {error ? (
                    <div className="font-semibold text-red-600 dark:text-red-400">
                        <p className="text-lg">Your token has expired! ❌</p>
                    </div>
                ) : (
                    <div className="font-semibold text-green-600 dark:text-green-400">
                        <p className="text-lg">Your account has been created successfully! 🎉</p>
                    </div>
                )}
                {!error && (
                    <>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                            Redirecting to login in{" "}
                            <span className="text-blue-500 font-bold">{countdown}</span> seconds...
                        </p>
                        <button
                            onClick={() => {
                                navigate("/");
                                if (timerRef.current) clearInterval(timerRef.current);
                            }}
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
                        >
                            Go to Home Now
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ActivationPage;