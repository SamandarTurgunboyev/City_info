import './App.css';
import { Route, Routes, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom';
import CityId from './components/cityId/CityId';
import Home from './components/home/Home';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/city' element={<CityId />} />
      </Routes>
    </>
  );
}

export default App;
