import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const StarContainer = {
  display: "flex",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
};

export default function StarRating({
  maxRating = 5,
  size = 42,
  starColor = "gold",
  textColor = "gold",
  margin = "0",
  messages = [],
  defaultRating = 0,
  onSetRating, // for making rating available for outside / external item also which want to use that .
}) {
  const [rating, setRating] = useState(defaultRating);
  const [temStar, setTemStar] = useState(0);

  function handleClick(i) {
    setRating(i);
    onSetRating(i);
  }

  const textStyle = {
    lineHeight: "1",
    margin,
    color: `${textColor}`,
    fontSize: `${size / 1.25}px`,
  };

  return (
    <div style={containerStyle}>
      <div style={StarContainer}>
        {Array.from({ length: maxRating }, (_, i) => (
          //   <span>S{i + 1}</span>
          <Star
            key={i}
            onStarClick={() => handleClick(i + 1)}
            onIn={() => setTemStar(i + 1)}
            onOut={() => setTemStar(0)}
            full={temStar ? temStar >= i + 1 : rating >= i + 1}
            starColor={starColor}
            starSize={size}
          />
        ))}
      </div>
      <p style={textStyle}>{temStar || rating || ""}</p>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[temStar ? temStar - 1 : rating - 1]
          : ""}
      </p>
    </div>
  );
}

function Star({ onStarClick, full, onIn, onOut, starColor, starSize }) {
  const starStyle = {
    height: `${starSize}px`,
    aspectRatio: "1",
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      style={starStyle}
      onClick={onStarClick}
      onMouseEnter={onIn}
      onMouseLeave={onOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          stroke={starColor}
          strokeWidth="1"
          fill={starColor}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={starColor}
          strokeWidth="0.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#000"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg>

*/

// external file can get rating value by this
// const Test = () => {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating
//         maxRating={5}
//         starColor="blue"
//         textColor="grey"
//         onSetRating={setMovieRating}
//       />
//       <p>rated {movieRating} stars</p>
//     </div>
// //   );
// // };

// {
//   /* <StarRating
//       maxRating={6}
//       messages={["😠worst", "☹️bad", "😐okay", "🥹good", "🫡nice", "😇Amazing"]}
//     />
//     <StarRating
//       maxRating={9}
//       size={50}
//       starColor="red"
//       textColor="green"
//       margin="1rem 1rem"
//       defaultRating={5}
//     /> */
// }
// {
//   /* <Test /> */
// }
