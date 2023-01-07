import logo from './logo.svg';
import './Categories.styles.scss';
import CategoryItem from './components/category-item/category-item.component';
import Directory from './components/directory/directory.component';
import Home from './routes/home/home.component';
import { Route, Routes } from 'react-router-dom';
import Shop from './routes/shop/shop.component';
import Navigation from './routes/Navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  )
}

export default App;
