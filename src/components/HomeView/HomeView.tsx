import {GridView} from "../GridView/GridView.tsx";
import "./HomeView.css"
import {ChangeEvent, useEffect, useState} from "react";
import {apiKey, baseUrl} from "../../utils/constants.ts";
import {MovieResponse} from "../../models/Response.ts";
import axios from "axios";
import ReactPaginate from "react-paginate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import logo from '../../assets/theater.png';

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

    let isLoading = false;
    useEffect(() => {
        isLoading = true;
        if (searchInput == '') {
            axios.get(movieUrl).then((response) => {
                setMovies(response.data);
                isLoading = false;
            });
        } else {
            axios.get(searchMoviesUrl).then((response) => {
                setMovies(response.data);
            });
        }
    }, [movieUrl, pageNumber, searchInput]);
    const handlePageChange = () => {
        if (movies != null && movies.total_pages != null) {
            if (movies!.total_pages! > pageNumber) {
                setPageNumber(pageNumber + 1);
            } else {
                alert("You have reached the maximum page number.");
            }
        }
        console.log(pageNumber);
    }

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
                <header className='nav'>
                    <h2>Discover Movies</h2>
                    <input className='searchBoxStyle'
                           placeholder="Search Movies" type='search'
                           value={searchInput}
                           onChange={handleSearchInput}/>
                </header>
            </>
        );
    } else {
        /*    position: relative;*/
        /*    z-index: 750;*/
        /*    background-color: #242424;*/
        /*    color: white;*/
        /*    padding-left: 16px;*/
        /*    display: flex;*/
        /*    margin-bottom: 16px;*/
        /*    -ms-flex-align: center;*/
        /*    align-items: center;*/
        /*    -ms-flex-pack: justify;*/
        /*    justify-content: space-between;*/
        /*    --hide-animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);*/
        /*    --show-animation-timing-function: cubic-bezier(0.22, 1, 0.27, 1);*/
        /*    transition: all .5s var(--hide-animation-timing-function);*/
        return (
            <div className='bg-backgroundColor'>
                <header
                    className='flex align-middles bg-headerColor relative flex-row z-750 mb-4 align-middle justify-between p-2'>
                    <div className='flex p-2 items-center'>
                        <img className='w-11 h-11 mr-4' src={logo} alt='Movie Logo'/>
                        <h2 className='text-center text-2xl text-white'>Discover Movies</h2>
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
                                   className='flex flex-row'
                                   breakLinkClassName='pageLinkStyle'
                                   previousLabel={<FontAwesomeIcon icon='angle-left'/>}
                                   nextLabel={<FontAwesomeIcon icon='angle-right'/>}
                                   pageRangeDisplayed={8}
                                   initialPage={pageNumber - 1}
                                   previousLinkClassName='pageLinkStyle'
                                   nextLinkClassName='pageLinkStyle'
                                   pageLinkClassName='pageLinkStyle'
                                   activeLinkClassName='activePageLinkStyle'
                    />
                    <GridView results={movies?.results}/>
                    <div>
                        <button onClick={handlePageChange} className="buttonStyle">Next</button>
                    </div>
                </div>
            </div>
        );
    }
}
