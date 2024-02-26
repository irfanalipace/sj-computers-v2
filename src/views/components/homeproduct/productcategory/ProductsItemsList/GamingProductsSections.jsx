import React from 'react';
import ProductItem1 from '../ProductItem1';
import ProductItem3 from '../ProductItem3';
import { Link } from 'react-router-dom';
const GamingProductsSections = ({
  gamingArray,
  items,
  gamingProducts1,
  gamingProducts2,
  gamingProducts3,
  gpuItems,
}) => {
  return (
    <div>
      <div className='row mx-0'>
        {gamingArray.map((category, index) => (
          <div key={index} className='col-12 col-sm-6 col-lg-3'>
            <Link to={category.link} className='text-decoration-none'>
              <div className='product-type-section'>
                <h2 className='h4-heading category-name'>{category.name}</h2>
                <div className='categories-container'>
                  {index === 0 || index === 3 ? (
                    <ProductItem3 items={index === 0 ? items : gpuItems} />
                  ) : (
                    <ProductItem1
                      image={
                        index === 1
                          ? gamingProducts1
                          : index === 2
                            ? gamingProducts2
                            : index === 3
                              ? gamingProducts3
                              : gamingProducts3 // Replace 'defaultImage' with a fallback image or handle the case accordingly
                      }
                    />
                  )}
                </div>
                <Link className='section-link' to='/category'>
                  {category.link}
                </Link>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamingProductsSections;
