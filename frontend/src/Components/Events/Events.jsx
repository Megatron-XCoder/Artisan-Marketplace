import {useEffect, useState} from 'react'
// import { useSelector } from 'react-redux';
import styles from '../../styles/styles'
import EventCard from "./EventCard";
import {productData} from "../../Static/data.jsx";
import ProductCard from "../Route/ProductCard/ProductCard.jsx";

const Events = () => {
  // const {allEvents,isLoading} = useSelector((state) => state.events);

  const [data, setData] = useState([]);

  useEffect(() => {
    const d = productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstTen = d && d.slice(0, 10);
    setData(firstTen);
  }, []);

  return (
      <div>
        <div className={`${styles.section} `}>
          <div className={`${styles.heading} `}>
            <h1>Popular Events</h1>
          </div>
          <div className={"w-full grid"}>
            <EventCard/>
          </div>
        </div>
      </div>
  );
}

export default Events