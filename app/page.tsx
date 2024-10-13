import React from 'react';
import Home from '@/app/home';

const getMovies = async () => {
   const data = await fetch('https://movies-test-app-2oo1.vercel.app/data.json', {
      cache: 'no-store',
   });
   return data.json();
};

const HomePage: React.FC = async () => {
   const data = await getMovies();

   return <Home movies={data.TendingNow} />;
};

export default HomePage;
