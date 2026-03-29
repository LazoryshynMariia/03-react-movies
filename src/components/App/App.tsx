import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import css from "./App.module.css";
import type { Movie } from "../../types/movie";
import { fetchMovies } from '../../services/movieService';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import toast, { Toaster }  from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    
    const handleSearch = async (query: string) => {
        try {
            setIsLoading(true);
            setIsError(false);
            const movies = await fetchMovies(query);
            if (movies.length === 0) {
                toast.error("No movies found for your request.")
            }
            setMovies(movies);
        } catch  {
            setIsError(true)
        } finally {
            setIsLoading(false);
        }
    }

    const openModal = (movie: Movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    }

    

    return (
        <div className={css.app}>
            <SearchBar onSubmit={handleSearch} />
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies} />}
            {isModalOpen && selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
            <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                background: '#e2fbda',
                color: 'green'
              },
            },
            error: {
              style: {
                background: '#f7cccc',
                color: 'red'
              }
            }
          }}/>
        </div>
    )
}