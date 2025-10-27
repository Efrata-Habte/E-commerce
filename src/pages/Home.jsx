import {useState,useEffect} from 'react';
import ProductCard from '../Components/productCard';
export default function Home(){
    const [products, setProducts]= useState([]);

    useEffect(() => {
    fetch("/backend/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
    return(
        <>
            <div className='mt-20 '>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 px-6 bg-white">
                    {products.map((product)=>(
                    <ProductCard key={product.id} p={product} />
                    ))}
                </div>
            </div>
           
        </>
    );
}