import React, { useContext, useEffect, useState } from 'react';
import OrderRow from './OrderRow';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';


const Orders = () => {
    const {user,logOut}=useContext(AuthContext)
    const [orders,setOrders]=useState([])
    const url=`https://batch6genius-car-server-69.vercel.app/orders?email=${user?.email}`;
    useEffect(()=>{
        fetch(url,{
            headers:{
                authorization:`Bearer ${localStorage.getItem('genius-token')}`
            }
        })
        .then(res=>{
            if (res.status===401 || res.status===403) {
               return logOut()
            }
            return res.json()
        })
           
          
        .then(data=>{
            console.log('received',data)
          //  setOrders(data)
        })
    },[user?.email,logOut])
    const handleDelete=(id)=>{
        const proceed = window.confirm('Are you sure, you want to cancel this order');
        if (proceed) {
            fetch(`https://batch6genius-car-server-69.vercel.app/orders/${id}`,{
                method:'DELETE',
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.deletedCount>0) {
                    const remaining=orders.filter(ord=>ord._id !==id)
                    alert('deleted successfully')
                    setOrders(remaining)
                }
            })
        }
    }
    const handleStatusUpdate=id=>{
        const url=`https://batch6genius-car-server-69.vercel.app/orders/${id}`;
        fetch(url,{
         method:'PATCH',
         headers:{
            'Content-Type':'application/json',
         },
         body:JSON.stringify({status:'Ápproved'})   
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.modifiedCount) {
                const remaining=orders.filter(odr=>odr._id !==id)
            const approving=orders.find(odr=>odr.id !==id)
            approving.status='Approved'
            const newOrders=[...remaining,approving]
            setOrders(newOrders)
            }
            
        })
    }
    return (
        <div>
        <h2 className="text-5xl">You have {orders?.length} Orders</h2>
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>
                            action
                        </th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order => <OrderRow
                            key={order._id}
                            order={order}
                            handleDelete={handleDelete}
                            handleStatusUpdate={handleStatusUpdate}
                        ></OrderRow>)
                    }
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default Orders;