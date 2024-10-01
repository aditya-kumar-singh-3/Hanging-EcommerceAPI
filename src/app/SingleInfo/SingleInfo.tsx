"use client"

import { ShoppingCart, Star, Truck, Shield, ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


interface ProductType {
  id: number
  title: string
  description: string
  price: number
  image: string
  category: string
  rating: {
    rate: number
    count: number
  }
}

const SingleInfo = () => {
  const { id } = useParams()
  const router = useRouter()
  const [singleProduct, setSingleProduct] = useState<ProductType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('Black')
  const [mainImage, setMainImage] = useState('')
  const [additionalImages,setAdditionalImages] = useState(["https://www.google.com/imgres?q=wait&imgurl=https%3A%2F%2Fdeadlydog.gallerycdn.vsassets.io%2Fextensions%2Fdeadlydog%2Fwaitbuildandreleasetask%2F1.2.31%2F1574358766086%2FMicrosoft.VisualStudio.Services.Icons.Default&imgrefurl=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Ddeadlydog.WaitBuildAndReleaseTask&docid=Tsz_rRtWgBorLM&tbnid=5ZagdjmV7OaRkM&vet=12ahUKEwirvd-dku2IAxWOSmwGHaq8Ji8QM3oECBsQAA..i&w=256&h=256&hcb=2&ved=2ahUKEwirvd-dku2IAxWOSmwGHaq8Ji8QM3oECBsQAA","https://www.google.com/imgres?q=wait&imgurl=https%3A%2F%2Fdeadlydog.gallerycdn.vsassets.io%2Fextensions%2Fdeadlydog%2Fwaitbuildandreleasetask%2F1.2.31%2F1574358766086%2FMicrosoft.VisualStudio.Services.Icons.Default&imgrefurl=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Ddeadlydog.WaitBuildAndReleaseTask&docid=Tsz_rRtWgBorLM&tbnid=5ZagdjmV7OaRkM&vet=12ahUKEwirvd-dku2IAxWOSmwGHaq8Ji8QM3oECBsQAA..i&w=256&h=256&hcb=2&ved=2ahUKEwirvd-dku2IAxWOSmwGHaq8Ji8QM3oECBsQAA","https://www.google.com/imgres?q=wait&imgurl=https%3A%2F%2Fdeadlydog.gallerycdn.vsassets.io%2Fextensions%2Fdeadlydog%2Fwaitbuildandreleasetask%2F1.2.31%2F1574358766086%2FMicrosoft.VisualStudio.Services.Icons.Default&imgrefurl=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Ddeadlydog.WaitBuildAndReleaseTask&docid=Tsz_rRtWgBorLM&tbnid=5ZagdjmV7OaRkM&vet=12ahUKEwirvd-dku2IAxWOSmwGHaq8Ji8QM3oECBsQAA..i&w=256&h=256&hcb=2&ved=2ahUKEwirvd-dku2IAxWOSmwGHaq8Ji8QM3oECBsQAA","https://www.google.com/imgres?q=wait&imgurl=https%3A%2F%2Fdeadlydog.gallerycdn.vsassets.io%2Fextensions%2Fdeadlydog%2Fwaitbuildandreleasetask%2F1.2.31%2F1574358766086%2FMicrosoft.VisualStudio.Services.Icons.Default&imgrefurl=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Ddeadlydog.WaitBuildAndReleaseTask&docid=Tsz_rRtWgBorLM&tbnid=5ZagdjmV7OaRkM&vet=12ahUKEwirvd-dku2IAxWOSmwGHaq8Ji8QM3oECBsQAA..i&w=256&h=256&hcb=2&ved=2ahUKEwirvd-dku2IAxWOSmwGHaq8Ji8QM3oECBsQAA"])

  const sizes = ['XS', 'S', 'M', 'L', 'XL']
  const colors = ['Black', 'White', 'Red', 'Blue']

  useEffect(() => {
    setLoading(true)
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setSingleProduct(json)
        setMainImage(json.image)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching product:', error)
        setError('Failed to load product. Please try again.')
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Go back to home
        </button>
      </div>
    )
  }

  if (!singleProduct) {
    return <div className="text-center py-10 text-xl">Product not found</div>
  }

 
  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to products
      </button>
      <div className="flex flex-col lg:flex-row gap-8 ">
        <div className="lg:w-1/2">
          <div className="bg-white p-4 rounded-lg shadow-2xl  mb-4 flex justify-center items-center ">
         <img
              src={mainImage}
              alt={singleProduct.title}
             
              className="w-96 h-96 object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 ">
            {additionalImages.map((img, index) => (
              <div
              
                className="bg-white p-2 rounded-lg cursor-pointer shadow-2xl hover:scale-110"
               
              >
             <img
                  
                  width={100}
                  height={100}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))} 
          </div>
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{singleProduct.title}</h1>
          <p className="text-gray-600 mb-6">{singleProduct.description}</p>
          <div className="flex items-center mb-6">
            <span className="text-3xl font-bold mr-2">${singleProduct.price.toFixed(2)}</span>
            <span className="text-sm text-white bg-green-500 px-2 py-1 rounded">
              {singleProduct.category}
            </span>
          </div>
          <div className="flex items-center mb-6">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(singleProduct.rating.rate)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {singleProduct.rating.rate} ({singleProduct.rating.count} reviews)
            </span>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Size:</h3>
            <div className="flex space-x-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`px-3 py-1 border rounded ${
                    selectedSize === size
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Color:</h3>
            <div className="flex space-x-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? 'border-gray-900' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                >
                  <span className="sr-only">{color}</span>
                </button>
              ))}
            </div>
          </div>
          <button className="w-full bg-orange-500 text-white px-6 py-3 rounded-md flex items-center justify-center  transition-colors mb-6">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center mb-4">
              <Truck className="w-5 h-5 mr-2 text-green-500" />
              <span className="text-sm text-green-500">Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-500" />
              <span className="text-sm text-green-500">30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleInfo