import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      //console.log(response.data.data);
    } else {
      toast.error("error");
    }
  };
  const statusHandler=async(event,orderId)=>{
    //console.log(event,orderId);
    const response=await axios.post(url+"/api/order/status",{
      orderId,status:event.target.value
    })
    if(response.data.success){
      await fetchAllOrders()
    }
     
  }
  useEffect(() => {
    fetchAllOrders();
  }, []);


  return (
    <div className="order add">
    <h2>Order Page</h2>
    <div className="container">
      {orders.map((order, index) => {
        return (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <p className="order-item-food">
              {
                order.items.map((item,index)=>{
                if(index===order.items.length-1){
                  return item.name+"x"+item.quantity

                }else{
                  return item.name+"x"+item.quantity+","
                }
                })
              }
            </p>
            <p className="order-item-name">{order.address.firstName + " " +order.address.lastName}.00</p>
            <div className="order-item-address">
              <p>{order.address.street}</p>
              <p>{order.address.city+","+order.address.country+", "+order.address.zipcode}</p>
            </div>
            <p className="order-item-phone">{order.address.phone}</p>
            <p>Items:{order.items.length}</p>
            <p>{order.amount}</p>
            <select onChange={(event)=>{statusHandler(event,order._id)}} value={order.status} >
              <option value="Food processing">Food pocessing</option>
              <option value="Out for delevery">Out for delevery</option>
              <option value="Delevered">Deleverd</option>
            </select>
          </div>
        
        );
      })}
    </div>
  </div>
  );
};

export default Orders;
