import { useSelector } from "react-redux";

const Header = () => {
  const { isLoading, isError, flights } = useSelector((store) => store.flight);

  return (
    <header>
      <div>
        <img src="/plane-logo.png" alt="" />
        <h3>Flight Radar</h3>
      </div>

      <p>
        {isLoading
          ? "Preparing Flights..."
          : isError
          ? "Sorry, an error occured."
          : flights.length + " Flights found"}
      </p>
    </header>
  );
};

export default Header;
