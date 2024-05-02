import axios from "axios";
import { useEffect, useState } from "react";
import { dOptions } from "../constants";
import formatDate from "../utils/formatDate";
import { setPath } from "../redux/slices/flightSlice";
import { useDispatch } from "react-redux";
import apiC from "../utils/apiDataCheck";

const Modal = ({ detailId, close }) => {
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    setDetail(null);

    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        dOptions
      )
      .then((res) => {
        setDetail(res.data);

        dispatch(setPath(res.data.trail));
      });
  }, [detailId]);

  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <div className="close-wrapper">
          <button onClick={close}>x</button>
        </div>

        {!detail ? (
          <div className="loader">
            <span></span>
          </div>
        ) : (
          <>
            <h2>{apiC(detail.aircraft.model.text)}</h2>
            <h2>{apiC(detail.aircraft.model.code)}</h2>

            <p>
              <span>Tail Number: </span>
              <span>{apiC(detail.aircraft?.registration)}</span>
            </p>

            {detail.aircraft.images ? (
              <img
                src={
                  detail.aircraft.images?.large
                    ? detail.aircraft.images.large[0].src
                    : detail.aircraft.images.thumbnails[0].src
                }
                alt=""
              />
            ) : (
              <p>No Image Data</p>
            )}

            <p>
              <span>Company: </span>
              <span>{apiC(detail.airline?.short)}</span>
            </p>
            <p>
              <span>Departure: </span>
              <a target="_blank" href={detail.airport?.origin?.name.website}>
                {apiC(detail.airport?.origin?.name)}
              </a>
            </p>
            <p>
              <span>Destination: </span>
              <a target="_blank" href={detail.airport?.destination?.website}>
                {apiC(detail.airport?.destination?.name)}
              </a>
            </p>

            <p>
              <span>Departure time: </span>
              <span>
                {detail.time.scheduled.departure > 0
                  ? formatDate(detail.time.scheduled.departure)
                  : "No Data"}
              </span>
            </p>
            <p>
              <span>Arrival time: </span>
              <span>
                {detail.time.scheduled.arrival > 0
                  ? formatDate(detail.time.scheduled.arrival)
                  : "No Data"}
              </span>
            </p>

            <p className={detail.status?.icon}>
              <span>{apiC(detail.status.text)}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
