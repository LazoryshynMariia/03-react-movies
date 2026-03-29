import type { Movie } from "../types/movie";
import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common["Authorization"] = `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`;
axios.defaults.headers.common["accept"] = "aplication/json";
axios.defaults.params = {
  language: "en-US",
};

interface MoviesResponse {
    results: Movie[];
}

export const fetchMovies = async (query: string, page = 1): Promise<Movie[]> => {
    const response = await axios.get<MoviesResponse>(
        "search/movie", {
        params: {
            query,
            include_adult: false,
            page
        }
    });

    return response.data.results;
};