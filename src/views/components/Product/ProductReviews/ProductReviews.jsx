import React, { useEffect, useRef, useState } from 'react';
import RatingDetails from '@components/Product/ProductReviews/RatingDetails';
import './ProductReviews.css';
import { Link } from 'react-router-dom';
import ReviewImages from './ReviewImagesSlider';
import ReviewCard from './ReviewCard';
import { useParams } from 'react-router-dom';
import { productReviewsApi } from '../../../../core/api/product-review';
import {
  Box,
  CircularProgress,
  LinearProgress,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_REVIEW } from '../../../../core/store/review/reviewSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { allReviewImagesApi } from '../../../../core/api/product-review';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

const PRODUCT_FILTER_KEY_ENUM = {
  TOP: 'top-reviews',
  RECENT: 'recent-reviews',
};

const PRODUCT_FILTER_LABEL_ENUM = {
  'top-reviews': 'Top reviews',
  'recent-reviews': 'Recent reviews',
};

const reviewPerPage = 5;

function ProductReviews({ productId, productAsin, onFilterChange }) {
  const theme = useTheme();

  const isUpSmall = useMediaQuery(theme.breakpoints.up('md'));
  const dispatch = useDispatch();
  const reviewState = useSelector(slice => slice.review);
  const [ReviewsData, setReviewsData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async productId => {
    // if (reviewState?.reviews?.product_review?.data?.length === 0) {
    //     setReviewLoading([]);
    //     return;
    // }
    try {
      const response = await allReviewImagesApi(productId);
      console.log(response, 'responseAllImage');
      setReviewsData(response);
    } catch (error) {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchData(productId);
  }, [
    productId,
    productAsin,
    reviewState?.reviews?.product_review?.data?.length,
  ]);

  const [filterBy, setFilterBy] = useState(PRODUCT_FILTER_KEY_ENUM.TOP);
  const [reviews, setReviews] = useState(reviewState.reviews);
  const [reviewLoading, setReviewLoading] = useState(false);
  const reviewRef = useRef(null);
  const isMounted = useRef(false);

  const handlePageChange = (event, value) => {
    reviewRef.current.focus();
    getProductReviews(productId, value, reviewPerPage);
  };

  const handleUpdateReview = id => {
    //TODO:: key name should be changed according to backend
    const key = 'helpful';
    const res = reviews?.product_review?.data?.findIndex(
      item => item.id === id,
    );

    if (res === -1) return;
    let tempRev = [...reviews.product_review.data];
    let dd = { ...tempRev[res] };
    dd[key] = true;
    tempRev[res] = dd;
    setReviews(prevState => ({
      ...prevState,
      product_review: {
        ...prevState.product_review,
        data: [...tempRev],
      },
    }));
  };

  const getProductReviews = async (id, page = 1, reviewPerPage) => {
    try {
      setReviewLoading(true);
      const res = await productReviewsApi(id, page, reviewPerPage);
      setReviews(res.data);
      dispatch(ADD_REVIEW(res.data));
    } catch (error) {
      console.error(error);
    } finally {
      setReviewLoading(false);
    }
  };
  useEffect(() => {
    if (isMounted.current) {
      if (typeof filterBy === 'function') onFilterChange(filterBy);
    }
    isMounted.current = true;
  }, [filterBy]);

  useEffect(() => {
    getProductReviews(productId, 1, reviewPerPage);
  }, [productId, productAsin]);

  return (
    <div className='product-reviews-section product-section'>
      <div className='product-reviews-container'>
        <div className='row reviews-row'>
          <div className='col-12 col-sm-6 col-md-4'>
            <div style={{ maxWidth: '350px' }}>
              <RatingDetails
                productDetails={
                  reviews?.product_stats
                    ? JSON.parse(reviews?.product_stats?.statistics)
                    : []
                }
              />
              {isUpSmall && (
                <div className='py-4 my-4 border-top border-bottom'>
                  <p className='fs-6 fw-semibold mb-3'>Review this product</p>
                  <p className='fs-6 mb-3'>
                    Share your thoughts with other customers
                  </p>
                  <Link to={`/add-review/${productAsin}`}>
                    <button
                      className='bg-white border my-1 w-100 rounded-3 shadow'
                      style={{
                        fontSize: '14px',
                        padding: '12px 0',
                      }}
                    >
                      Write a customer review
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className='col-12 col-sm-6 col-md-8 review-slider-and-slider'>
            {/* <div className="d-flex justify-content-between mb-3">
                            <h3 className="product-section-heading">
                                Reviews with images
                            </h3>
                            <button className="view-all-images-btn">
                                View all images
                            </button>
                        </div> */}
            {isUpSmall && (
              <ReviewImages
                reviews={reviews}
                productId={productId}
                ReviewsData={ReviewsData}
              />
            )}
            {reviews?.product_review?.data.length === 0 && !reviewLoading && (
              <Typography fontWeight={600}>No customer reviews</Typography>
            )}

            {!!reviews?.product_review?.data.length && (
              <>
                <div
                  id='reviewSection'
                  tabIndex='0'
                  ref={reviewRef}
                  className='filter-wrapper mt-3 mb-0 '
                >
                  {/* <select
                                        className="form-select"
                                        onChange={(e) =>
                                            setFilterBy(e.target.value)
                                        }
                                    >
                                        <option
                                            value={PRODUCT_FILTER_KEY_ENUM.TOP}
                                        >
                                            Top Reviews
                                        </option>
                                        <option
                                            value={
                                                PRODUCT_FILTER_KEY_ENUM.RECENT
                                            }
                                        >
                                            Recent Reviews
                                        </option>
                                    </select> */}
                </div>

                {isUpSmall && (
                  <h3 className='product-section-heading my-4 py-1'>
                    {PRODUCT_FILTER_LABEL_ENUM[filterBy]}
                  </h3>
                )}
              </>
            )}

            {reviewLoading ? (
              <Box sx={{ height: '100px' }}>
                {isUpSmall && <CircularProgress sx={{ ml: 5 }} disableShrink />}
              </Box>
            ) : (
              reviews?.product_review?.data?.map((review, index) => (
                <div key={'review-' + review.id} className='my-4'>
                  {isUpSmall && (
                    <ReviewCard
                      reviewData={review}
                      index={index}
                      productId={productId}
                      data={ReviewsData}
                      updateReveiw={handleUpdateReview}
                    />
                  )}
                </div>
              ))
            )}

            {isUpSmall && !!reviews?.product_review?.data?.length && (
              <Pagination
                onChange={handlePageChange}
                count={Math.ceil(
                  reviews?.product_review?.total / reviewPerPage,
                )}
              />
            )}
          </div>
          {!isUpSmall && (
            <ReviewImages
              reviews={reviews}
              productId={productId}
              ReviewsData={ReviewsData}
              isMobile={true}
            />
          )}

          {!isUpSmall && (
            <>
              <h1
                className='pt-3 mt-3'
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  borderTop: '1px solid lightgray',
                }}
              >
                Read reviews that mention
              </h1>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {[
                  'picture quality',
                  'monitor works',
                  'monitor and bought',
                  'card',
                  'display',
                  'monitors',
                  'office',
                  'video',
                  'install',
                ].map(row => {
                  return (
                    <div
                      style={{
                        backgroundColor: '#E4F2FF',
                        padding: '10px',
                        borderBottom: '2px solid #969696',
                        margin: '10px 5px',
                      }}
                    >
                      <>{row}</>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {!isUpSmall && (
            <h3 className='product-section-heading mt-3 mb-3 py-1'>
              {PRODUCT_FILTER_LABEL_ENUM[filterBy]}
            </h3>
          )}
          {!isUpSmall && (
            <>
              {reviewLoading ? (
                <Box sx={{ height: '100px' }}>
                  <CircularProgress sx={{ ml: 5 }} disableShrink />
                </Box>
              ) : (
                reviews?.product_review?.data?.map((review, index) => (
                  <div key={'review-' + review.id} className='my-1'>
                    {
                      <ReviewCard
                        reviewData={review}
                        index={index}
                        productId={productId}
                        data={ReviewsData}
                        updateReveiw={handleUpdateReview}
                      />
                    }
                  </div>
                ))
              )}
              {!isUpSmall && !!reviews?.product_review?.data?.length && (
                <Pagination
                  onChange={handlePageChange}
                  count={Math.ceil(
                    reviews?.product_review?.total / reviewPerPage,
                  )}
                />
              )}
              {!isUpSmall && (
                <div className='mt-1'>
                  <hr />
                  <p className='mob-rev-see'>
                    See More reviews{' '}
                    <ArrowForwardIosIcon sx={{ fontSize: '11px' }} />
                  </p>
                  <hr />
                  <p
                    className='mob-rev-see'
                    onClick={() => navigate(`/add-review/${productAsin}`)}
                  >
                    Write a review{' '}
                    <ArrowForwardIosIcon sx={{ fontSize: '11px' }} />
                  </p>
                  <hr />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductReviews;
