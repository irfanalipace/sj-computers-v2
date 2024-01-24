import React from 'react'
import { Link } from 'react-router-dom';
import "./ProductPageHeader.css"

const ProductPageHeader = () => {

  const categories = [
    {
        id: 1,
        name: "Business Computers",
        slug: "business_computers",
    },
    {
        id: 2,
        name: "Chromebook",
        slug: "chromebook",
    },
    {
        id: 3,
        name: "Gaming Desktops",
        slug: "gaming_desktops",
    },
    {
        id: 4,
        name: "Monitors",
        slug: "monitor",
    },
    {
        id: 5,
        name: "Window 11",
        slug: "window_11",
    },
    {
        id: 6,
        name: "SFF",
        slug: "sff",
    },
    {
        id: 7,
        name: "Mini",
        slug: "mini",
    },
];

  return (
    <div 
      className='header-wrappar' >

        {categories.map((category) => (

          <Link key={category.id} to={`/category/${category.slug}`} style={{textDecoration: "none"}}>
            <div className='item' > {category.name} </div>
          </Link>

        ))
        }
        
    </div>
  )
}

export default ProductPageHeader