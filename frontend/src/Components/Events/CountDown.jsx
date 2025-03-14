import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../../server.jsx";

const CountDown = ({ data }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        if (
            typeof timeLeft.days === "undefined" &&
            typeof timeLeft.hours === "undefined" &&
            typeof timeLeft.minutes === "undefined" &&
            typeof timeLeft.seconds === "undefined"
        ) {
            axios.delete(`${server}/event/delete-shop-event/${data._id}`);
        }
        return () => clearTimeout(timer);
    });

    function calculateTimeLeft() {
        const difference = +new Date(data.endDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    }

    return (
        <div className="flex gap-2 lg:gap-3">
            {Object.keys(timeLeft).map((interval) => (
                <div
                    key={interval}
                    className="flex flex-col items-center bg-gradient-to-b from-gray-50 to-white p-3 rounded-xl w-20 shadow-md border border-gray-100"
                >
          <span className="text-2xl lg:text-3xl font-bold mb-1 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {timeLeft[interval]?.toString().padStart(2, "0") || "00"}
          </span>
                    <span className="text-xs uppercase tracking-wider font-semibold text-gray-500">
            {interval}
          </span>
                </div>
            ))}
        </div>
    );
};

export default CountDown;