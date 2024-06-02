import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Day from "./Day";

export default function Month({ month }) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

// Define prop types for validation
Month.propTypes = {
  month: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.object.isRequired // Ensure each day is an object
    ).isRequired
  ).isRequired,
};
