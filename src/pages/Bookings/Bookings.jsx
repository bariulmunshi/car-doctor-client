import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import BookingRow from './BookingRow';
import Swal from 'sweetalert2';


const Bookings = () => {
    const {user}=useContext(AuthContext);
    const [bookings,setBookings]=useState([])
    const url=`http://localhost:5000/bookings?email=${user?.email}`;
    useEffect(()=>{
        fetch(url,{
          method:'GET',
          headers:{
            authorization:`Bearer ${localStorage.getItem('car-access-token')}`
          }
        })
        .then(res=>res.json())
        .then(data=>setBookings(data))
    },[url])

    const handleDelete=id=>{
      console.log(id)
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Swal.fire("Deleted!", "Your file has been deleted.", "success");
          fetch(`http://localhost:5000/bookings/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.deletedCount > 0) {
                 Swal.fire("Deleted!", "Your coffee has been deleted.", "success");
                 const remaining=bookings.filter(booking=>booking._id !==id)
                 setBookings(remaining);  
              }
            });
        }
      });
    }
      //for update
    const handleBookingConfirm=id=>{
      fetch(`http://localhost:5000/bookings/${id}`,{
        method: 'PATCH',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({status:'confirm'})
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        if(data.modifiedCount>0){
          //update state
          const remaining=bookings.filter(booking=>booking._id!==id);
          const updated=bookings.find(booking=>booking._id==id);
          updated.status='confirm'
          const newBookings=[updated,...remaining];
          setBookings(newBookings);
        }
      })
     }

    return (
        <div>
            <h2 className="text-5xl">Your Bookings{bookings.length}</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Image</th>
        <th>Service</th>
        <th>Date</th>
        <th>Price</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
     {
        bookings.map(booking=>   <BookingRow
        key={booking._id}
        booking={booking}
        handleDelete={handleDelete}
        handleBookingConfirm={handleBookingConfirm}
        ></BookingRow>)
     }      
    </tbody>    
  </table>
</div>
        </div>
    );
};

export default Bookings;