import {apiKey, baseUrl, imageUrl} from "../../utils/constants.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {DetailResponse} from "../../models/DetailResponse.ts";
import {useParams} from "react-router-dom";
import "./DetailView.css"
import posterPlaceholder from "../../assets/movie-file-svgrepo-com.svg"
import {DotSpinner} from "@uiball/loaders";
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
                <div className='fixed z-auto mx-auto left-1/2 top-1/2'>
                    <DotSpinner
                        color='#ffffff'
                        size={50}
                        speed={0.9}
                    />
                </div>
            </>
        )
    } else {
        const backdropStyle = {
            height: '100vh',
            width: '100%',
            backgroundRepeat: 'no-repeat',
            background: `linear-gradient(rgba(33,53,71,.8), rgba(33,53,71,.8)), url(${imageUrl}${movieDetail.backdrop_path})`,
        };
        /*.posterStyle {*/
        /*    width: 200px;*/
        /*    height: 300px;*/
        /*    margin-top: 16px;*/
        /*    margin-left: 16px;*/
        /*    margin-bottom: 16px;*/
        /*    border-radius: 20px;*/
        /*}*/
        return (
            <div className='flex !bg-cover' style={backdropStyle}>
                <div className='max-w-screen-xl m-auto'>
                    <div className='flex justify-center flex-row text-justify'>
                        <img
                            className="h-72 rounded-lg mt-4 ml-4 mb-4"
                            src={movieDetail.poster_path == null ? posterPlaceholder : `${imageUrl}${movieDetail.poster_path}`}
                            placeholder={posterPlaceholder}
                            alt={movieDetail.title}/>

                        <div className='flex-col w-7/12'>

                            <p className='text-white m-4 w-10/12 text-2xl'><strong>{movieDetail.title}</strong></p>

                            {/*<p className='movieFactsTextStyle'>Release*/}
                            {/*    Date: {movieDetail.release_date != null ? movieDetail.release_date!.toString() : 'Unknown'}</p>*/}

                            <p className='m-4 text-white text-xl w-10/12'>{movieDetail.overview}</p>

                            <ul className='m-4 list-disc flex pl-0 text-xl' title='Genres'>
                                {movieDetail.genres?.map((genre) => {
                                    return (
                                        <li key={genre.id}
                                            className='bg-backgroundColor text-white inline p-2 rounded-xl me-3 text-xl'>{genre.name}</li>
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
