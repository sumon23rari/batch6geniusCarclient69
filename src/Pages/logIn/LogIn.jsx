import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const LogIn = () => {
    const {signInUser}=useContext(AuthContext);
    const location=useLocation();
    const navigate=useNavigate();
    let from=location.state?.from?.pathname || '/';
    const handleLogin=(e)=>{
        e.preventDefault();
        const form=e.target;
        const email=form.email.value;
        const password=form.password.value;   
        signInUser(email,password)
        .then(result=>{
            const user=result.user;
            const currentUser1={
                email:user.email
            }
            console.log(currentUser1)
    //    GET JWT TOKEN
    fetch('http://localhost:7000/jwt',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(currentUser1)
    })
    .then(res=>res.json())
    .then(data=>{
        // local storage is the easiest but not the strorage
        localStorage.setItem('genius-token',data.token)
    })
            navigate(from, { replace: true });
            form.reset()
        }) 
        .catch(error=>{
            console.error(error)
        })
        }
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
            <div className="w-1/2 mr-12">
                <img src={img} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <h1 className="text-3xl text-center font-bold">Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <p className='my-4 text-center'>New to Car Doctors <Link className='text-orange-600 font-bold' to="/register">Sign Up</Link> </p>
                </div>
            </div>
        </div>
    </div>
    );
};

export default LogIn;