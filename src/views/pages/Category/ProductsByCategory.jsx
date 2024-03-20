import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import FilteredProducts from './FilteredProducts';

const ProductsByCategory = ({ toggleFilter }) => {
  const { categorySlug } = useParams();
  const categories = useSelector(state => state.category.categories);
  const [category, setCategory] = useState(null);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    try {
      const _category = categories.find(c => c.slug === categorySlug);
      if (_category) {
        setCategory(_category);
        setCategoryLoading(false);
      } else {
        setCategory(null);
      }
    } catch (e) {
      setCategoryLoading(false);
      setCategory(null);
    } finally {
      setCategoryLoading(false);
    }
  }, [categories, categorySlug]);

  return (
    <FilteredProducts
      category={category}
      toggleFilter={toggleFilter}
      categorySlug={categorySlug}
      categoryLoading={categoryLoading}
    />
  );
};

export default ProductsByCategory;
