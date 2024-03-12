import React, { useEffect, useState } from 'react';
import ProductItem4 from '../ProductItem4';
import ProductItem1 from '../ProductItem1';
import { getProductsCategory } from '../../../../../core/api/products';
import { CircularProgress } from '@mui/material';

import './FeaturedProducts.css';

import { Link } from 'react-router-dom';
const FeaturedProducts = ({
  featuredItems,
  networkItems,
  upgradecomputers,
  featured,
  rams,
  TouchScreenLaptop,
}) => {
  const [totalProducts, setTotalProducts] = useState(4);
  const [loading, setLoading] = useState(false);
  const [BudgetFreindlyImages, setBudgetFriendlyImages] = useState([]);
  const getProducts = async total => {
    try {
      setLoading(true);
      const filterObject = {
        page: 1,
        category: 'budget-friendly',
        per_page: total,
      };

      const response = await getProductsCategory(filterObject);
      setBudgetFriendlyImages(response?.data?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts(totalProducts);
  }, []);

  return (
    <div>
      <div className='row featured-products mx-0'>
        {featured.map((category, index) => (
          <div key={index} className='col-12 col-sm-6 col-lg-3'>
            <Link to={category.redirectTo} className='text-decoration-none'>
              <div className='product-type-section'>
                <h2 className='h4-heading category-name'>{category.name}</h2>
                <div
                  style={{
                    height: '15px',
                    color: '#B12704',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}>
                  {category.extra}
                </div>
                <div
                  className='categories-container'
                  style={{ marginBottom: '10px' }}>
                  {index === 0 ? (
                    <ProductItem4
                      items={[
                        featuredItems[0],
                        featuredItems[1],
                        featuredItems[2],
                        featuredItems[3],
                      ]}
                    />
                  ) : index === 1 ? (
                    <ProductItem4
                      items={[
                        networkItems[0],
                        networkItems[1],
                        networkItems[2],
                        networkItems[3],
                      ]}
                    />
                  ) : index === 2 ? (
                    // Customize for the third column
                    <>
                      {BudgetFreindlyImages?.length > 0 ? (
                        <ProductItem4
                          items={[
                            BudgetFreindlyImages[0],
                            BudgetFreindlyImages[1],
                            BudgetFreindlyImages[2],
                            BudgetFreindlyImages[3],
                          ]}
                        />
                      ) : (
                        <div>
                          <CircularProgress style={{ color: 'black' }} />
                        </div>
                      )}
                    </>
                  ) : (
                    // Customize for the fourth column
                    <ProductItem1 image={TouchScreenLaptop} />
                  )}
                </div>
                <div
                  className='see-btn'
                  style={{
                    visibility: category?.seeMore === true ? 'hidden' : '',
                  }}>
                  <Link className='section-link' to={category.redirectTo}>
                    {category.link}
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
