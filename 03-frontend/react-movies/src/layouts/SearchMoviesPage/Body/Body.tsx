import { useEffect, useState } from "react";
import MovieModel from "../../../models/MovieModel";
import { SearchMovie } from "./components/SearchMovie";
import { Pagination } from "../../Utils/Pagination";

export const Body = () => {
    const [movies, setMovies] = useState<MovieModel[]>([]);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(48);
    const [totalAmountOfMovies, setTotalAmountOfMovies] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [sort, setSort] = useState('desc');

    const categories = [
        'All', 'Action', 'Adventure', 'Animation', 'Biography', 
        'Comedy', 'Documentary', 'Drama', 'Family', 'Fantasy', 
        'History', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 
        'Thriller', 'War', 'Western'
    ];

    const release_years = ['All', '2024', '2023', '2022', '2021', '2020', '2019', '2018', 'Until 2017'];

    useEffect( () => {
        const fetchMovies = async () => {
            const baseUrl: string = `${process.env.REACT_APP_API}/movies`;
            let url: string = '';

            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${moviesPerPage}`;
            } else {
                let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`);
                url = baseUrl + searchWithPage;
            }

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Something went wrong!');
                
                const responseJson = await response.json();
                const responseData = responseJson._embedded.movies;
                setTotalAmountOfMovies(responseJson.page.totalElements);
                setTotalPages(responseJson.page.totalPages);

                const loadedMovies: MovieModel[] = responseData.map( (movie: any) => ({
                    id: movie.id,
                    title: movie.title,
                    thumbnail: movie.thumbnail,
                    description: movie.description,
                    release_date: movie.release_date,
                    genre: movie.genre,
                    rating: movie.rating,
                    iframe_resource: movie.iframe_resource,
                }));

                setMovies(loadedMovies);
            } catch(error: any) {
                setHttpError(error.message)
            } 
        };

        fetchMovies();
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);

    if (httpError) {
        return(
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    const indexOfLastMovie: number = currentPage * moviesPerPage;
    const indexOfFirstMovie: number = indexOfLastMovie - moviesPerPage;
    let lastItem = moviesPerPage * currentPage <= totalAmountOfMovies ? moviesPerPage * currentPage : totalAmountOfMovies;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${moviesPerPage}`);
        }
    }

    const genreField = (value: string) => {
        setCurrentPage(1);
        if (
            value.toLowerCase() === 'action' ||
            value.toLowerCase() === 'adventure' ||
            value.toLowerCase() === 'animation' ||
            value.toLowerCase() === 'biography' ||
            value.toLowerCase() === 'comedy' ||
            value.toLowerCase() === 'documentary' ||
            value.toLowerCase() === 'drama' ||
            value.toLowerCase() === 'family' ||
            value.toLowerCase() === 'fantasy' ||
            value.toLowerCase() === 'history' ||
            value.toLowerCase() === 'horror' ||
            value.toLowerCase() === 'mystery' ||
            value.toLowerCase() === 'romance' ||
            value.toLowerCase() === 'sci-fi' ||
            value.toLowerCase() === 'thriller' ||
            value.toLowerCase() === 'war' ||
            value.toLowerCase() === 'western'
        ) {
            setGenre(value);
        } else {
            setGenre('');
        }
        setSearchUrl(`/search/findByFilters?genre=${value}&year=&rate=${sortBy}&sort=${sort}&page=<pageNumber>&size=${moviesPerPage}`);
    }

    const yearField = (value: string) => {
        setCurrentPage(1);
        if (
            value === '2024' ||
            value === '2023' ||
            value === '2022' ||
            value === '2021' ||
            value === '2020' ||
            value === '2019' ||
            value === '2018' 
        ) {
            setYear(value);
            setSearchUrl(`/search/findByFilters?genre=${genre}&year=${value}&rate=${sortBy}&sort=${sort}&page=<pageNumber>&size=${moviesPerPage}`);
        } else if (value != 'All') {
            setYear('');
            setSearchUrl(`/search/findByFilters?genre=${genre}&year=&yearThreshold=&rate=${sortBy}&sort=${sort}&page=<pageNumber>&size=${moviesPerPage}`);
        } else {
            setYear('');
            setSearchUrl(`/search/findByFilters?genre=${genre}&year=&yearThreshold=2017&rate=${sortBy}&sort=${sort}&page=<pageNumber>&size=${moviesPerPage}`);
        }
    }

    const sortByField = (value: string) => {
        setCurrentPage(1);
        let mappedValue = '';
        if (value === 'Latest') {
            mappedValue = 'id';
        } else if (value === 'IMDB rating') {
            mappedValue = 'rating';
        }
        setSortBy(mappedValue);
        setSearchUrl(`/search/findByFilters?genre=${genre}&year=${year}&rate=${mappedValue}&sort=${sort}&page=<pageNumber>&size=${moviesPerPage}`);
    }

    const sortField = (value: string) => {
        setCurrentPage(1);
        let mappedValue = '';
        if (value === 'Ascending') {
            mappedValue = 'asc';
        } else if (value === 'Descending') {
            mappedValue = 'desc';
        }
        setSort(mappedValue);
        setSearchUrl(`/search/findByFilters?genre=${genre}&year=${year}&rate=${sortBy}&sort=${mappedValue}&page=<pageNumber>&size=${moviesPerPage}`);
    }

    return (
            <div className="body-container">
                <div className="body-wrapper">
                    <div className="row border border-secondary rounded col-10 p-3 bg-dark z-3">
                        {/* Search Bar */}
                        <div className="d-flex justify-content-center align-items-center flex-wrap">
                            <input className="form-control me-2" type="search" 
                                    aria-labelledby="Search" style={{ width: "auto" }}
                                    onChange={e => setSearch(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key == 'Enter') {
                                            searchHandleChange();
                                        }
                                    }}/>
                            <button className="btn btn-outline-danger" type="submit" onClick={() => searchHandleChange()}>Search</button>
                        </div>
                        {/* Filters */}
                        <div className="form-row mt-2 p-2 d-flex justify-content-center align-items-center flex-wrap" >
                            <div className="form-group col-md-2 col-4 me-2">
                                <h6 className="col-md-12 text-white text-center">Genre</h6>
                                <select className="form-control form-control-sm form1 bg-dark text-white border-secondary" name="genre" style={{appearance: "auto"}} onChange={(e) => genreField(e.target.value)}>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group col-md-2 col-4 me-2">
                                <h6 className="col-md-12 text-white text-center">Year</h6>
                                <select className="form-control form-control-sm form1 bg-dark text-white border-secondary" name="year" style={{appearance: "auto"}} onChange={(e) => yearField(e.target.value)}>
                                    {release_years.map((release_year) => (
                                        <option key={release_year} value={release_year}>
                                            {release_year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group col-md-2 col-4 me-2">
                                <h6 className="col-md-12 text-white text-center">Sort By</h6>
                                <select className="form-control form-control-sm form1 bg-dark text-white border-secondary" name="sortby" style={{appearance: "auto"}} onChange={(e) => sortByField(e.target.value)}>
                                    <option value='Latest'>Latest</option>
                                    <option value='IMDB rating'>IMDB rating</option>
                                </select>
                            </div>
                            <div className="form-group col-md-2 col-4 me-2">
                            <h6 className="col-md-12 text-white text-center">Sort</h6>
                                <select className="form-control form-control-sm form1 bg-dark text-white border-secondary" name="sort" style={{appearance: "auto"}} onChange={(e) => sortField(e.target.value)}>
                                    <option value='Ascending'>Ascending</option>
                                    <option value='Descending'>Descending</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfMovies > 0 ?
                    <>
                        <div className="row d-lg-none mt-3 border border-secondary rounded col-10 bg-success text-white z-3">
                            <h6 className="fs-4 fw-normal">Number of results: ({totalAmountOfMovies})</h6>
                            <p className="fs-5 fw-light">{indexOfFirstMovie + 1} to {lastItem} of {totalAmountOfMovies} items:</p>
                        </div>
                        <div className="row d-none d-lg-block mt-3 border border-secondary rounded col-10 bg-success text-white z-3">
                            <h5 className="fs-5 fw-medium">Number of results: ({totalAmountOfMovies})</h5>
                            <p className="fs-6 fw-normal">{indexOfFirstMovie + 1} to {lastItem} of {totalAmountOfMovies} items:</p>
                        </div>
                        <div className="row mt-3 col-10 z-3">
                            {movies.map(movie => (
                                <div className="item" key={movie.id}>
                                    <SearchMovie movie={movie} width={125} height={200} />
                                </div>
                            ))}
                        </div>
                        {totalPages > 1 &&
                            <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                        }
                    </>
                    :
                    <>
                        <div className="row d-none d-md-flex justify-content-center align-items-center mt-3 border border-secondary col-10 bg-dark text-white shadow rounded z-3">
                            <h6 className="fs-5 fw-medium">Can't find what you are looking for?</h6>
                            <a type="button" className="btn btn-success btn-md px-3 my-3 fw-semibold text-white rounded-pill" href="#" style={{width: "20%"}}>Coreflix Services</a>
                        </div>
                        <div className="row d-sm-flex d-md-none justify-content-center align-items-center mt-3 border border-secondary col-10 bg-dark text-white shadow rounded z-3">
                            <h6 className="fs-6 fw-medium">Can't find what you are looking for?</h6>
                            <a type="button" className="btn btn-success btn-sm px-3 my-3 fw-semibold text-white rounded-pill" href="#" style={{width: "50%", overflow: "hidden"}}>Services</a>
                        </div>
                    </>                    
                    }
                    
                    
                </div>
            </div>
    );
}