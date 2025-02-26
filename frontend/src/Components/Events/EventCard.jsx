
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import {AiOutlineShoppingCart} from "react-icons/ai";

const EventCard = ({active}) => {
  return (
      <div className={`w-full bg-white rounded-xl ${active ? "mb-8" : "unset"} shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100`}>
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-[45%] relative h-full">
            <img
                src="https://scontent.fixc1-5.fna.fbcdn.net/o1/v/t0/f2/m340/AQMxAUHpFeMkd6CRNU6-Dqs75tRbOoxdHiTPP4IAIv43ZrHVjkQVRK2Hg0xk-jEhdj1_XmFLWElMMC65Ub79bT5hXWhAzLtlArtqgRc-cNgyWxJX5E7O0O02QU6tQBw83qLux8TIN3bghKPnz6pTMb_NQJwp.jpeg?_nc_ht=scontent.fixc1-5.fna.fbcdn.net&_nc_cat=109&ccb=9-4&oh=00_AYBkt42MSy7BFjv0OcNlD9NdP9-cSG34iOc2QFIeoq3Pkw&oe=67BFF738&_nc_sid=5b3566"
                alt="Event"
                className="w-full h-full hover:shadow-2xl object-cover"
            />
            <div className="absolute top-4 left-4 bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              50% OFF
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-[55%] p-6 lg:p-8 flex flex-col justify-around">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900">
                Rustic Wooden Wall Hanging
              </h2>

              <p className="text-gray-600 mb-4 text-sm lg:text-base line-clamp-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, animi aut culpa cupiditate...
              </p>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-xl line-through text-red-500">$1500</span>
                  <span className="text-3xl font-bold text-teal-600">$1200</span>
                </div>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                30 units already sold
              </span>
              </div>
            </div>

            <div className={"justify-around"}>
              <div className="mb-6">
                <div className="mb-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    ⏳ Hurry up! Sale ends in
                  </h3>
                  <div className="flex justify-center">
                    <CountDown />
                  </div>
                </div>
              </div>

              <div className="flex flex-col  sm:flex-row gap-3">
                <button type={"button"} className="flex-1 bg-gradient-to-tr from-purple-700 via-pink-400 to-pink-600 hover:shadow-xl hover:bg-gradient-to-br text-white py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  <AiOutlineShoppingCart className="text-xl" />
                  Add to Cart
                </button>
                <Link
                    to={`/product/123?isEvent=true`}
                    className="flex-1 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 hover:bg-gradient-to-br hover:shadow-xl text-white py-4 px-6 rounded-xl font-semibold transition-all text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EventCard;