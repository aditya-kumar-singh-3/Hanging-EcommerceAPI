'use client';

import { useState, useEffect } from 'react';
import { addtocart } from '../Redux/CreateSlice';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdStarHalf } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import Skeleton from 'react-loading-skeleton'; 
import 'react-loading-skeleton/dist/skeleton.css';  

interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductListing() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [originalProducts, setOriginalProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [category, setCategory] = useState<string>('');
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const dispatch = useDispatch();
  const Router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((json) => {
        setCategories(['all', ...json]);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => {
        setProducts((prevProducts) => [...prevProducts, ...json]);
        setOriginalProducts((prevProducts) => [...prevProducts, ...json]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  function detail(id: number) {
    
    Router.push(`/ProductDetail/${id}`);
  }

  function updateCart(id: number) {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(addtocart(json));
      });

    setCartItems((prevItems) => [...prevItems, id]);
  }

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setLoading(true);
    if (selectedValue === 'all') {
      fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((json) => {
          setProducts(json);
          setOriginalProducts(json);
          setCategory('Our Products');
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    } else {
      fetch(`https://fakestoreapi.com/products/category/${selectedValue}`)
        .then((res) => res.json())
        .then((json) => {
          setProducts(json);
          setCategory(selectedValue);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    }
  };

  const sortProducts = async () => {
    if (!isSorted) {
      const sortedData = [...products].sort((a, b) => b.price - a.price);
      setProducts(sortedData);
    } else {
      setProducts(originalProducts);
    }
    setIsSorted(!isSorted);
  };

  if (loading && products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-2xl p-4">
              <Skeleton height={200} />
              <Skeleton height={30} className="my-4" />
              <Skeleton count={3} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>

      <div className='fixed top-0 min-w-full bg-blue-500 h-14 flex justify-start items-center text-white z-10 '>
      <div >
        <Link href="/Cart">
          <p className="ml-10 text-2xl   font-bold"><GiShoppingBag /></p>
        </Link>
      </div>

      </div>

      <div>
        <select onChange={handleSelect} className="border-2 border-black ml-20 translate-y-12 w-60 p-1 rounded-full mt-10 ">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center mt-5">
        <button
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-colors md:mt-0 mt-20"
          onClick={sortProducts}
        >
          {isSorted ? 'Price- Low to High' : 'Price- High to Low'}
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center">{category || 'Our Products'}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-2xl flex flex-col justify-between">
              <div className="p-4">
                <div className="relative aspect-square mb-4 flex justify-center items-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-52 h-52 object-contain"
                    onClick={() => detail(product.id)}
                  />
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <h2 onClick={() => detail(product.id)} className="font-semibold text-lg line-clamp-2 cursor-pointer" title={product.title}>
                  {product.title}
                </h2>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => {
                      const wholeStars = Math.floor(product.rating.rate);
                      const isHalfStar = product.rating.rate - wholeStars >= 0.5;
                      const showFullStar = index < wholeStars;
                      const showHalfStar = isHalfStar && index === wholeStars;
                      return (
                        <span key={index} className="text-lg">
                          {showFullStar ? (
                            <span className="text-yellow-400">★</span>
                          ) : showHalfStar ? (
                            <span className="text-yellow-400"><MdStarHalf/></span>
                          ) : (
                            <span className="text-gray-300">★</span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({product.rating.count})</span>
                </div>
                <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-gray-50">
                <button
                  onClick={() => updateCart(product.id)}
                  className={`w-full py-2 px-4 rounded-md transition-colors ${
                    cartItems.includes(product.id) ? 'bg-red-500 text-white' : 'bg-yel text-black font-bold hover:opacity-75'
                  }`}
                  disabled={cartItems.includes(product.id)}
                >
                  {cartItems.includes(product.id) ? 'Already in Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
        {loading && <p className='bg-black text-white flex justify-center items-center h-10 mt-10 w-full'>Loading more products...</p>}
      </div>
    </>
  );
}

//   Hanging-Panda Private Limited
