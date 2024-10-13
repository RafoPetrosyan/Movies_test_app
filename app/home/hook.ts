import { useEffect, useRef, useState } from 'react';
import { IMovie } from '@/types/movies';

function useContainer({ movies }: { movies: IMovie[] }) {
   const [featuredMovie, setFeaturedMovie] = useState<IMovie | null>(null);
   const [trendingMovies, setTrendingMovies] = useState<IMovie[]>(movies);
   const [videoIsPlayed, setVideoIsPlayed] = useState<boolean>(false);
   const videoRef = useRef(null) as any;
   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

   const playVideo = () => {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setVideoIsPlayed(true);
   };

   const pauseVideo = () => {
      videoRef.current.pause();
      setVideoIsPlayed(false);
   };

   const selectMovie = (id: string) => {
      pauseVideo();

      if (timeoutRef.current) {
         clearTimeout(timeoutRef.current);
      }

      const movie = movies.find((item) => item.Id === id);
      setFeaturedMovie(movie || null);

      if (movie) {
         sessionStorage.setItem('featureMovieId', movie.Id);
         timeoutRef.current = setTimeout(() => {
            playVideo();
         }, 2000);
      }
   };

   const sortByIdFirst = (array: IMovie[], firstId: string) => {
      return array.sort((a, b) => {
         if (a.Id === firstId) return -1;
         if (b.Id === firstId) return 1;
         return 0;
      });
   };

   useEffect(() => {
      const featureMovieId = sessionStorage.getItem('featureMovieId');

      if (featureMovieId) {
         const sortedData = sortByIdFirst(movies, featureMovieId);
         setTrendingMovies(sortedData);
         setFeaturedMovie(sortedData[0]);
         return;
      }

      setFeaturedMovie(movies[0]);
      setTrendingMovies(movies);
   }, []);

   return {
      selectMovie,
      featuredMovie,
      trendingMovies,
      videoIsPlayed,
      videoRef,
      pauseVideo,
      playVideo,
   };
}

export default useContainer;
