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
  //workstations,
  work,
}) => {
  const workstations = [
    {
      id: 1,
      categoryLink: '/professional-laptop',
    },
    {
      id: 2,
      categoryLink: '/workstation',
    },
  ];
 
  return (
    <div>
      <div className='row mx-0'>
        {gamingArray.map((category, index) => (
          <div key={index} className='col-12 col-sm-6 col-lg-3'>
            <Link to={category.Link} className='text-decoration-none'>
              <div className='product-type-section'>
                <h2 className='h4-heading category-name'>{category.name}</h2>
                <div
                  className='categories-container'
                  style={{ justifyContent: index === 3 ? 'start' : 'center' }}>
                  {index === 0 || index === 3 ? (
                    <ProductItem3 items={index === 0 ? items : gpuItems} />
                  ) : (
                    <>
                      <Link
                        to={
                          index === 1
                            ? workstations[1].categoryLink
                            : index === 2
                              ? workstations[0].categoryLink
                              : ''
                        }>
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
                      </Link>
                    </>
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
