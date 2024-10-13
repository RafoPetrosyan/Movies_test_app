'use client';
import React from 'react';
import Menu from '@/app/components/Menu';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import useContainer from './hook';
import 'swiper/css';
import { IMovie } from '@/types/movies';

interface IProps {
   movies: IMovie[];
}

const Home: React.FC<IProps> = ({ movies }) => {
   const {
      selectMovie,
      featuredMovie,
      trendingMovies,
      videoIsPlayed,
      videoRef,
      pauseVideo,
      playVideo,
   } = useContainer({ movies });

   return (
      <div className="flex min-h-screen bg-black text-white">
         <Menu />
         <div className="flex-grow">
            {/* Feature movies */}
            {featuredMovie && (
               <div className="relative w-full h-[100vh] lg:h-[100vh]">
                  <video
                     ref={videoRef}
                     className="w-full h-full object-cover"
                     src={featuredMovie.VideoUrl}
                     onClick={pauseVideo}
                  />
                  {!videoIsPlayed && (
                     <>
                        <Image
                           layout="fill"
                           objectFit="cover"
                           src={featuredMovie.CoverImage}
                           alt={featuredMovie.Title}
                           className="shadow-md"
                        />
                        <div className="absolute top-32 left-32">
                           <h2 className="text-2xl lg:text-4xl font-bold">{featuredMovie.Title}</h2>
                           <div className="flex">
                              <p className="text-sm lg:text-base mr-[8px]">
                                 {featuredMovie.ReleaseYear}
                              </p>
                              <p className="text-sm lg:text-base mr-[8px]">
                                 {featuredMovie.MpaRating}
                              </p>
                              <p className="text-sm lg:text-base mr-[8px]">
                                 {featuredMovie.Duration}
                              </p>
                           </div>
                           <p className="text-sm lg:text-base">{featuredMovie.Description}</p>
                           <div className="mt-2 flex space-x-4">
                              <button
                                 className="bg-white text-black px-4 py-2 rounded-[40px] w-[240px]"
                                 onClick={playVideo}
                              >
                                 Play
                              </button>
                              <button className="px-4 py-2 rounded-[40px] w-[240px] bg-[#2727f5]">
                                 More Info
                              </button>
                           </div>
                        </div>
                     </>
                  )}
               </div>
            )}

            {/* Trending movies */}
            {trendingMovies.length > 0 && (
               <div className="absolute bottom-0 left-32 right-0 pb-6">
                  <h2 className="text-xl font-bold mb-4">Trending Now</h2>
                  <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
                     <Swiper slidesPerView={'auto'} spaceBetween={15} className="w-full">
                        {trendingMovies.map((movie) => (
                           <SwiperSlide key={movie.Id} onClick={() => selectMovie(movie.Id)}>
                              <div className="w-32 cursor-pointer">
                                 <Image
                                    width={100}
                                    height={100}
                                    src={movie.CoverImage}
                                    alt={movie.Title}
                                    className="w-full h-48 object-cover rounded-lg shadow-md"
                                 />
                              </div>
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default Home;
