import {useState, useEffect} from 'react';

export default function Orders(){
    const [products, setProducts]=useState([]);
    const [orders, setOrders] =useState([]);

    useEffect(() => {
    fetch("/backend/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

    useEffect(() => {
    fetch("/backend/orders.json")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

    return (
        <>
            {products.map((product)=>(
                <OrdersCard p={product} key={}/>
            ))}
        </>
    );
}