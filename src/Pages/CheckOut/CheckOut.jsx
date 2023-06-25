import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const CheckOut = () => {
  const {_id,title,price}=useLoaderData();
  const {user}=useContext(AuthContext)
  const handlePlaceOrder=(e)=>{
        e.preventDefault();
        const form=e.target;
        const name=`${form.firstName.value} ${form.lastName.value}`;
        const phone=form.phone.value;
        const email=form.email.value;
        const message=form.message.value;
        const order={
            service:_id,
            serviceName:title,
            customerName:name,
            phone,
            email,
            message
        }
        fetch(`https://batch6genius-car-server-69.vercel.app/orders`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(order)
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.acknowledged) {
                alert('your orders successfully')
            }
            form.reset()
        })
        .catch(error=>console.error(error))
  }
    console.log(title)
    return (
        <div>
        <form onSubmit={handlePlaceOrder}>
            <h2 className="text-4xl">You are about to order: {title}</h2>
            <h4 className="text-3xl">Price: {price}</h4>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <input name="firstName" type="text" placeholder="First Name" className="input input-ghost w-full  input-bordered" />
                <input name="lastName" type="text" placeholder="Last Name" className="input input-ghost w-full  input-bordered" />
                <input name="phone" type="text" placeholder="Your Phone" className="input input-ghost w-full  input-bordered" required />
                <input name="email" type="text" placeholder="Your email" defaultValue={user?.email}  className="input input-ghost w-full  input-bordered" readOnly />
            </div>
            <textarea name="message" className="textarea textarea-bordered h-24 w-full" placeholder="Your Message" required></textarea>

            <input className='btn' type="submit" value="Place Your Order" />
        </form>
    </div>
    );
};

export default CheckOut;