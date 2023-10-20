import {imageUrl} from "../../utils/constants";
import placeholder from "../../assets/react.svg";
import "./ListItem.css";
import {Rating} from "react-simple-star-rating";

interface ListItemProps {
    movieId: number;
    title: string;
    poster_path: string;
    vote_average: number;
}

export default function ListItem({title, poster_path, vote_average, movieId,}: ListItemProps) {
    return (
        <div
            onClick={() => {
                console.log(`${movieId} clicked`);
            }}
            className="cardStyle">
            <img
                className="movieCardImageStyle"
                src={poster_path == null ? placeholder : `${imageUrl}${poster_path}`}
                placeholder={placeholder}
                alt={title}
            />
            <p className="movieTitleStyle">{title} ({})</p>
            <Rating
                className="ratingBarStyle"
                initialValue={vote_average / 2}
                allowFraction={true}
                size={20}
                fillColor="#2f6bbd"
                readonly={true}
            />
        </div>
    );
}
