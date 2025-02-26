
// import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Footer from "../Components/Layout/Footer.jsx";
import styles from "../Styles/Styles.jsx";
// import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  // const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      <div>
        <Header activeHeading={4} />
          <div className={`${styles.section} my-8`}>
              <div className={"w-full grid"}>
                  <EventCard active={true}/>
                  <EventCard active={true}/>
                  <EventCard active={true}/>
                  <EventCard active={true}/>
              </div>
          </div>
        <Footer />
      </div>
    </>
  );
};

export default EventsPage;
