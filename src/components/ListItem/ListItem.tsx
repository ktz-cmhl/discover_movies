import {imageUrl} from "../../utils/constants";
import placeholder from "../../assets/movie-file-svgrepo-com.svg";
import "./ListItem.css";
import {Rating} from "react-simple-star-rating";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

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
            className="w-56 mt-4 bg-cardColor rounded-lg flex flex-col">
            <LazyLoadImage className="w-full h-10/12 rounded-t-lg cursor-pointer"
                           src={`${imageUrl}${poster_path}`}
                           placeholderSrc={placeholder}
                           effect='black-and-white'
            />
            <p className="break-words text-lg text-gray-300 truncate p-2">{title}</p>
            <Rating
                className='mb-4 ml-2'
                initialValue={vote_average / 2}
                allowFraction={true}
                size={20}
                SVGstyle={{'display': 'inline'}}
                fillColor="#2f6bbd"
                readonly={true}
            />
        </div>
    );
}
