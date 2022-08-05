import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import AdminHome from './pages/AdminHome';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EditUser from './pages/EditUser';



function App() {
  
  return (
    <>
    <Router>
      <Header/>
    <div className='container' >
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />

        <Route path='/admin' element={<AdminHome/>} />

        <Route path='/editUser/:id' element={<EditUser/>} />


      </Routes>
      
    </div>
    </Router>
    <ToastContainer/>
    

    </>
  );
}

export default App;
