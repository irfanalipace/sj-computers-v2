import { Link } from 'react-router-dom';
import './ProductItem1.css';
const ProductItem1 = ({ image, }) => {
 
  return (
   
    <div className='image-style'>
   
      <img src={image} alt='Image 2' className='laptop-img' />
    
    </div>
  );
};

export default ProductItem1;
