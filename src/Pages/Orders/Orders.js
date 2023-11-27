import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import "./orders.css";
export default function Orders() {
  const restaurantToken = localStorage.getItem("restaurantToken");
  const { _id } = jwtDecode(restaurantToken);
  const [orders, setOrders] = useState([]);
  let sno = 1;
  const getOrderList = async () => {
    const restaurantToken = localStorage.getItem("restaurantToken");
    try {
      axios
        .get("http://localhost:8080/ordereditems/getordersbyid", {
          headers: {
            "Content-Type": "application/json",
            Authorization: restaurantToken,
          },
        })
        .then((response) => {
          setOrders(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getOrderList();
  }, []);
  const handleComplete = (item, order) => {
    try {
      axios
        .post("http://localhost:8080/ordereditems/update_order_status", {
          item_id: item.item_id,
          order_id: order._id,
        })
        .then((response) => {
          console.log(response.data);
          window.location.reload()
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="order-main-div">
      {orders.length > 0 && (
        <>
        <h2>Current Orders</h2>
        <table className="order-table">
          <tr>
            <th className="order-th">Serial No.</th>
            <th className="order-th">Item Name</th>
            <th className="order-th">Item Quantity</th>
            <th className="order-th">Status</th>
          </tr>
          {orders.map((order, index) => {
            let arr = [];
            order.items.forEach((item) => {
              if (item.restaurant_id === _id && item.active === true)
                arr.push(item);
            });
            return (
              <tr>
                <td  className="order-td">{sno++}</td>
                <td rowspan={arr.length}  className="order-td">
                  {arr.map((item) => {
                    return (
                      <tr>
                        <td className="order-td">{item.item_name}</td>
                      </tr>
                    );
                  })}
                </td>
                <td rowspan={arr.length} className="order-td">
                  {arr.map((item) => {
                    return (
                      <tr>
                        <td className="order-td">{item.quantity}</td>
                      </tr>
                    );
                  })}
                </td>
                <td rowspan={arr.length} className="order-td">
                  {arr.map((item) => {
                    return (
                      <tr>
                        <td className="order-td">
                          <button
                            className="complete"
                            onClick={() => handleComplete(item, order)}
                          >
                            Mark as completed
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </table>
        </>
      )}
      {orders.length==0 && (<h4>There are no orders to complete.</h4>)}
    </div>
  );
}
