import logo from './logo.svg';
import './Categories.styles.scss';
import CategoryItem from './components/category-item/category-item.component';
import Directory from './components/directory/directory.component';
import Home from './routes/home/home.component';
import { Route, Routes } from 'react-router-dom';
import Navigation from './routes/Navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';

const Shop = () => {
  return <div>M shop</div>
}
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route path='/' element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App;
