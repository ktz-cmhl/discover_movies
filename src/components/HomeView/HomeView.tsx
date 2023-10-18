import {GridView} from "../GridView/GridView.tsx";
import "./HomeView.css"
import {ChangeEvent, useEffect, useLayoutEffect, useState} from "react";
import {apiKey, baseUrl} from "../../utils/constants.ts";
import {MovieResponse} from "../../models/Response.ts";
import axios from "axios";

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


    useEffect(() => {
        axios.get(movieUrl).then((response) => {
            setMovies(response.data);
        });
    }, [movieUrl, pageNumber]);
    const addPage = () => {
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

    useLayoutEffect(() => {
        axios.get(searchMoviesUrl).then((response) => {
            setMovies(response.data);
        });
    }, [searchInput]);

    return (
        <>
            <header className='nav'>
                <h2>Discover Movies</h2>
                <input className='searchBoxStyle'
                       placeholder="Search Movies" type='search'
                       value={searchInput}
                       onChange={handleSearchInput}/>
            </header>
            <div className='homeViewStyle'>
                <GridView results={movies?.results}/>
                <div>
                    <button onClick={addPage} className="buttonStyle">Next</button>
                </div>
            </div>
        </>
    );
}
