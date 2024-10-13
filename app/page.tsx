import React from 'react';
import Home from '@/app/home';

const getMovies = async () => {
   const data = await fetch('http://localhost:3000/data.json');
   return data.json();
};

const HomePage: React.FC = async () => {
   const data = await getMovies();

   return <Home movies={data.TendingNow} />;
};

export default HomePage;
