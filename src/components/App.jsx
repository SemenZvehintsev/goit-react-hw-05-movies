import { Cast } from "pages/Cast/Cast";
import { Home } from "pages/Home/Home";
import { MovieDetails } from "pages/MovieDetails/MovieDetails";
import { Movies } from "pages/Movies/Movies";
import { NotFound } from "pages/NotFound/NotFound";
import { Reviews } from "pages/Reviews/Reviews";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";

export const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='movies' element={<Movies/>}>
        <Route path='cast' element={<Cast/>}/>
          <Route path='reviews' element={<Reviews/>}/>
        </Route>
        
        <Route path='movies/:movieId' element={<MovieDetails/>}>
          <Route path='cast' element={<Cast/>}/>
          <Route path='reviews' element={<Reviews/>}/>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
