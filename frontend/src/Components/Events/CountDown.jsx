import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../../server.jsx";

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // if (
    //   typeof timeLeft.days === 'undefined' &&
    //   typeof timeLeft.hours === 'undefined' &&
    //   typeof timeLeft.minutes === 'undefined' &&
    //   typeof timeLeft.seconds === 'undefined'
    // ) {
    //   axios.delete(`${server}/event/delete-shop-event/${data._id}`);
    // }
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(`2025-03-26`) - +new Date();
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

  // const timerComponents = Object.keys(timeLeft).map((interval) => {
  //   if (!timeLeft[interval]) {
  //     return null;
  //   }
  //
  //   return (
  //       // eslint-disable-next-line react/jsx-key
  //     <span className="text-[25px] text-[#475ad2]">
  //       {timeLeft[interval]} {interval}{" "}
  //     </span>
  //   );
  // });

  return (
      <div className="flex gap-2 lg:gap-3">
        {Object.keys(timeLeft).map((interval) => (
            <div
                key={interval}
                className="flex flex-col items-center text-gray-800 border-2 border-pink-500 p-3 rounded-lg w-80 max-w-[80px]"
            >
        <span className="text-2xl lg:text-3xl font-bold mb-1">
          {timeLeft[interval] || 0}
        </span>
              <span className="text-xs uppercase tracking-wider font-bold text-gray-700">
          {interval}
        </span>
            </div>
        ))}
      </div>
  );
};

export default CountDown;
