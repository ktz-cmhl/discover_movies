import {apiKey, baseUrl, imageUrl} from "../../utils/constants.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {DetailResponse} from "../../models/DetailResponse.ts";
import {useParams} from "react-router-dom";
import "./DetailView.css"
import posterPlaceholder from "../../assets/movie-file-svgrepo-com.svg"
// interface DetailProps{
//     movieId:number
// }
export default function DetailView() {
    const {movieId} = useParams();
    const [movieDetail, setMovieDetail] = useState<DetailResponse | null>(null);
    const detailUrl = `${baseUrl}movie/${movieId}?api_key=${apiKey}`
    useEffect(() => {
        axios.get(detailUrl).then((response) => {
            setMovieDetail(response.data);
        });
    }, [detailUrl]);
    if (movieDetail == null) {
        return (
            <>
                <p>Loading...</p>
            </>
        )
    } else {
        const backdropStyle = {
            height: '100vh',
            width: '100%',
            backgroundRepeat: 'no-repeat',
            background: `linear-gradient(rgba(33,53,71,.8), rgba(33,53,71,.8)), url(${imageUrl}${movieDetail.backdrop_path})`,
        };
        return (
            <div className='detailViewBackdropStyle' style={backdropStyle}>
                <div className='detailViewStyle'>
                    <div className='flexBoxContainer'>
                        <img
                            className="posterStyle"
                            src={movieDetail.poster_path == null ? posterPlaceholder : `${imageUrl}${movieDetail.poster_path}`}
                            placeholder={posterPlaceholder}
                            alt={movieDetail.title}/>

                        <div className='movieFactsStyle'>

                            <p className='titleStyle'><strong>{movieDetail.title}</strong></p>

                            {/*<p className='movieFactsTextStyle'>Release*/}
                            {/*    Date: {movieDetail.release_date != null ? movieDetail.release_date!.toString() : 'Unknown'}</p>*/}

                            <p className='movieFactsTextStyle'>{movieDetail.overview}</p>

                            <ul className='genreListStyle' title='Genres'>
                                {movieDetail.genres?.map((genre) => {
                                    return (
                                        <li key={genre.id}>{genre.name}</li>
                                    )
                                })}

                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
