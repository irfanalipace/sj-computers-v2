import React from 'react'
import { Link } from 'react-router-dom';
import "./ProductPageHeader.css"

const ProductPageHeader = () => {

  const categories = [
    {
        id: 1,
        name: "Computers",
        slug: "business_computers",
    },
    {
        id: 2,
        name: "Laptops",
        slug: "laptops",
    },
    {
        id: 3,
        name: "Desktop",
        slug: "desktop",
    },
    {
        id: 4,
        name: "Monitors",
        slug: "monitor",
    },
    {
        id: 5,
        name: "Computers Accessories",
        slug: "bto",
    },
    {
        id: 6,
        name: "PC Components",
        slug: "pccomponents",
    },
    {
        id: 7,
        name: "PC Gaming",
        slug: "gaming_desktops",
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