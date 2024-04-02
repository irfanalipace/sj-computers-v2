import { Checkbox, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import './FilterbarLayout2.css';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FILTERS_ARRAY } from '../../../../core/store/products/productsSlice';

export default function ReviewFilter({ reviewOption, isNewApi, upateFilters }) {
  const [checkedReview, setCheckedReview] = useState([]);

  const dispatch = useDispatch();
  const storeFilters = useSelector(state => state.products.filtersArray);

  const getIndexOfFilter = category => {
    const indexOfFilter = storeFilters.findIndex(
      filter => filter.key.toLowerCase() === category.toLowerCase(),
    );
    return indexOfFilter;
  };

  const handleValueFilters = (event, categ, currentItem) => {
    const indexOfFilter = getIndexOfFilter(categ);
    const storeFiltersDuplicate = JSON.parse(JSON.stringify(storeFilters));

    const values = storeFiltersDuplicate[indexOfFilter].value;
    if (event.target.checked) values.push(currentItem);

    if (!event.target.checked) {
      const indexOfItemToBeRemoved = values.findIndex(
        val => val === currentItem,
      );

      values.splice(indexOfItemToBeRemoved, 1);
    }

    if (typeof myProp === 'function' || isNewApi) {
      upateFilters(storeFiltersDuplicate);
      return;
    }

    dispatch(SET_FILTERS_ARRAY(storeFiltersDuplicate));
  };

  const clearReview = category => {
    const storeFilterIndex = getIndexOfFilter(category);
    const storeFiltersCopy = JSON.parse(JSON.stringify(storeFilters));

    storeFiltersCopy[storeFilterIndex].value = [];

    if (typeof myProp === 'function' || isNewApi) {
      upateFilters(storeFiltersCopy);
      return;
    }
    dispatch(SET_FILTERS_ARRAY(storeFiltersCopy));
  };

  return (
    <>
      {!!storeFilters[getIndexOfFilter('review')].value.length && (
        <span
          style={{ position: 'absolute', top: 0, right: 25 }}
          className='filter-clear-btn'
          onClick={() => clearReview('review')}>
          <CloseIcon fontSize='14px' />
          Clear
        </span>
      )}

      {reviewOption?.map(reveiw => {
        return (
          <Stack key={reveiw.id} direction={'row'} spacing={1} mt={0.5}>
            <label
              className='checkbox-container'
              htmlFor={reveiw.value.toString()}>
              <Checkbox
                checked={storeFilters[
                  getIndexOfFilter('review')
                ].value.includes(reveiw.value)}
                id={`reveiw${reveiw.id}`}
                namne={`reveiw-name${reveiw.id}`}
                style={{
                  color: ' #f2a742',
                  padding: '0 !important',
                }}
                icon={<span style={unchecked} />}
                checkedIcon={<span style={checked} />}
                onChange={event =>
                  handleValueFilters(event, 'review', reveiw.value)
                }
                sx={{
                  '& .css-zun73v': {
                    padding: '0px !important',
                  },
                }}
              />
            </label>
            <StarRatings
              starDimension='18px'
              starSpacing='0'
              rating={parseFloat(reveiw.value || 0)}
              starRatedColor='orange'
            />
          </Stack>
        );
      })}
      {!reviewOption?.length && (
        <Typography sx={{ mt: 1 }}> No review</Typography>
      )}
    </>
  );
}
const checked = {
  backgroundColor: '#f2a742',
  border: '1px solid #000',
  borderRadius: '3px',
  display: 'inline-block',
  width: '13px',
  height: '13px',
};
const unchecked = {
  backgroundColor: '#fff',
  border: '1px solid #000',
  borderRadius: '3px',
  display: 'inline-block',
  width: '13px',
  height: '13px',
};
