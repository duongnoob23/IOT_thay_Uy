import logo from './logo.svg';
import './App.css';
import Layout from './Components/Layout/Layout';
import { Routes,Route, Router} from 'react-router-dom';
import Home from './Pages/Home/Home';
import DataLogs from './Pages/DataLogs/DataLogs';
import Profile from './Pages/Profile/Profile';
import Action from './Pages/Action/Action';
import Home2 from './Pages/Home2/Home2';

function App() {
  return (
    <>
    
      <Routes>
          <Route path="/" element = {<Layout/>}>
            <Route path='home' element={<Home/>}/>
            <Route path='home2' element={<Home2/>}/>
            <Route path='datalogs' element={<DataLogs/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='action' element={<Action/>}/>
          </Route>
      </Routes>
    </>
  );
}

export default App;

{/* <Routes>
        <Route path='/' element={<Layout_D/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='cart' element={<Cart/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='shoes' element={<Shoes/>}/>
          <Route path='clothes' element={<Clothes/>}/>
          <Route path='brands' element={<Brands/>}/>
          <Route path='timefashion' element={<TimeFashion/>}/>
          <Route path='cart2' element={<Cart2/>}/>
          <Route path='search' element={<Search/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='logout' element={<Logout/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='personalpage' element={<PersonalPage/>}/>
          <Route path='payment' element={<Payment/>}/>
          <Route path='test/:id' element={<Test/>}/>

          <Route path='detail/:id' element={<Details/>}/>
      
        </Route>
      </Routes> */}