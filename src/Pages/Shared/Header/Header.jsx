import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
const Header = () => {
  const {user,logOut}=useContext(AuthContext);
  const handleLogOut=()=>{
    logOut()
    .then(()=>{
      alert('user signout ')
    })
    .catch(error=>console.error(error))
  }
    const menuItems= <>
    <li className='font-semibold'><Link to='/'>Home</Link></li>
    {
      user?.email ?<>
         <li className='font-semibold'><Link to='/orders'>orders</Link></li>
         <li className='font-semibold'>
          <button className="btn-ghost" onClick={handleLogOut}>sign Out</button>
         </li>
      </>
      :
      <li className='font-semibold'><Link to='/login'>Login</Link></li>
    }
   
</>
    return (
        <div className="navbar h-12 mb-12 pt-12 bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
           <img src={logo} alt="logo" />
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
             {menuItems}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">daisyUI</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
           {menuItems}
          </ul>
        </div>
        <div className="navbar-end">
        <button className="btn btn-outline btn-warning">Appointment</button>
        </div>
      </div>
    );
};

export default Header;