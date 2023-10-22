import {Movie} from "../../models/Response";
import ListItem from "../ListItem/ListItem";
import "./GridView.css";
import {Link} from "react-router-dom";

interface GridProps {
    results: Array<Movie> | undefined
}

export function GridView({results}: GridProps) {

    const movieList = results;
    if (results != null) {
        return (
            <>
                <div className="grid grid-cols-movieGrid">
                    {movieList!.map((movie) => {
                        return (
                            <Link to={`/${movie.id}`} key={movie.id}>
                                <ListItem
                                    key={movie.id}
                                    movieId={movie.id}
                                    poster_path={movie.poster_path || ""}
                                    title={movie.title}
                                    vote_average={movie.vote_average || 0}
                                />
                            </Link>
                        );
                    })}
                </div>
            </>
        );
    } else {
        return <div>Loading...</div>;
    }
}
