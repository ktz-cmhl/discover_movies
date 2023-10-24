import {GridView} from "../GridView/GridView.tsx";
import "./HomeView.css"
import {ChangeEvent, useEffect, useState} from "react";
import {apiKey, baseUrl} from "../../utils/constants.ts";
import {MovieResponse} from "../../models/Response.ts";
import axios from "axios";
import ReactPaginate from "react-paginate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import logo from '../../assets/theater.png';
import {Link} from "react-router-dom";
import {DotSpinner} from "@uiball/loaders";

export default function HomeView() {
    const useStorageState = (
        key: string,
        initialState: number
    ): [number, (pageNumber: number) => void] => {
        const [pageNumber, setPageNumber] = useState(
            parseInt(localStorage.getItem(key) || '') || initialState
        );

        useEffect(() => {
            localStorage.setItem(key, JSON.stringify(pageNumber));
        }, [pageNumber]);

        return [pageNumber, setPageNumber];
    };

    const [searchInput, setSearchInput] = useState<string>('');

    const [pageNumber, setPageNumber] = useStorageState('pageNumber', 1);
    const movieUrl = `${baseUrl}discover/movie?api_key=${apiKey}&page=${pageNumber}`;
    const searchMoviesUrl = `${baseUrl}search/movie?query=${searchInput}&api_key=${apiKey}&page=${pageNumber}`
    const [movies, setMovies] = useState<MovieResponse>();
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            if (searchInput == '') {
                axios.get(movieUrl).then((response) => {
                    setMovies(response.data);
                    setLoading(false);
                });
            } else {
                axios.get(searchMoviesUrl).then((response) => {
                    setMovies(response.data);
                });
            }
        }, 1500);
    }, [movieUrl, pageNumber, searchInput, searchMoviesUrl]);

    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    let totalPages: number = 0;
    if (movies?.total_pages != null && movies?.total_pages > 500) {
        totalPages = 500;
    } else if (movies?.total_pages != null && movies?.total_pages < 500) {
        totalPages = movies?.total_pages;
    } else {
        totalPages = 0;
    }
    if (isLoading) {
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
        );
    } else {

        return (
            <div className='bg-backgroundColor mb-4'>
                <header
                    className='flex align-middles bg-headerColor relative flex-row z-750 mb-4 align-middle justify-between p-2'>
                    <div className='flex p-2 items-center'>
                        <img className='w-11 h-11 mr-4' src={logo} alt='Movie Logo'/>
                        <Link to={"/"} className='text-center text-2xl text-white'>Discover Movies</Link>
                    </div>
                    <input className='p-3 w-80 rounded-xl'
                           placeholder="Search Movies" type='search'
                           value={searchInput}
                           onChange={handleSearchInput}/>
                </header>
                <div className='max-w-screen-xl mx-auto'>
                    <ReactPaginate pageCount={totalPages}
                                   onPageChange={(selectedItem) => {
                                       console.log(selectedItem.selected)
                                       setPageNumber(selectedItem.selected + 1);
                                   }}
                                   disableInitialCallback={true}
                                   breakLabel='...'
                                   className='flex flex-row rounded-xl p-3 items-center bg-cardColor mr-5 justify-between mt-2 mb-2'
                                   breakLinkClassName='w-10 h-10 grid place-content-center bg-white rounded-xl text-center mx-2 text-base text-black'
                                   previousLabel={<FontAwesomeIcon icon='angle-left'/>}
                                   nextLabel={<FontAwesomeIcon icon='angle-right'/>}
                                   pageRangeDisplayed={8}
                                   initialPage={pageNumber - 1}
                                   previousLinkClassName='w-10 h-10 grid place-content-center bg-white rounded-xl text-center mx-2 text-base text-balck'
                                   nextLinkClassName='w-10 h-10 grid place-content-center bg-white rounded-xl text-center mx-2 text-base text-balck'
                                   pageLinkClassName='w-10 h-10 grid place-content-center bg-white rounded-xl text-center mx-2 text-base text-black'
                                   activeLinkClassName='w-11 h-11 grid place-content-center bg-[#040c14] rounded-xl text-center mx-2 text-base text-white'
                    />
                    <GridView results={movies?.results}/>
                </div>
            </div>
        );
    }
}
