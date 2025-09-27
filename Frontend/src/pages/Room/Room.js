import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "../../axios";

import "./Room.css";

import PropTypes from "prop-types";

function Room(props) {
  const [details, setDetails] = useState();

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("/api/rooms/" + props.match.params.id)
        .then((data) => {
          setDetails(data.data.room);
        })
        .catch((err) => {
          alert("Something went wrong please refresh the page");
        });
    }

    fetchData();
  }, [props.match.params.id]);

  return (
    <div>
      {details === undefined ? null : (
        <div className="roomDetails">
          <div className="container mt-3">
            <div className="row">
              {details.imageurls.map((image) => (
                <div className="col-md-4 mt-3" key={image}>
                  <img
                    src={image}
                    alt="Room Detail Image"
                    className="img-fluid"
                  />
                </div>
              ))}
            </div>

            <h1 className="text-center mt-5 roomDetails__title">
              {details.name}
            </h1>
            <p className="mt-3 roomDetails__parag text-center">
              {details.description}
            </p>

            <div className="row justify-content-center">
              <Link to="/" className="button mt-3">
                Back
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;
Room.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
