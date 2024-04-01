import { Checkbox, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import './FilterbarLayout2.css';
import CloseIcon from '@mui/icons-material/Close';

export default function ReviewFilter({
  onChange,
  clearReview,
  reviewOption,
  storeReivew,
}) {
  const [checkedReview, setCheckedReview] = useState([]);

  useEffect(() => {
    if (!reviewOption.length) return;
    const filterToBePushed = [];
    for (let i = storeReivew?.value.min; i <= storeReivew?.value.max; i++) {
      const index = reviewOption.findIndex(item => item.value === i);

      if (index !== -1) {
        filterToBePushed.push(reviewOption[index].value);
      }
    }

    if (filterToBePushed.length > 0) {
      debugger;
      const duplicatePriceArray = [...checkedReview, ...filterToBePushed];
      const dd = new Set(duplicatePriceArray);
      const dd1 = Array.from(dd);
      setCheckedReview([...dd1]);
    }
  }, [reviewOption]);

  return (
    <>
      {!!checkedReview.length && (
        <span
          style={{ position: 'absolute', top: 0, right: 25 }}
          className='filter-clear-btn'
          onClick={() => {
            clearReview();
            setCheckedReview([]);
          }}>
          <CloseIcon fontSize='14px' />
          Clear
        </span>
      )}

      {reviewOption?.map((reveiw, index) => {
        return (
          <Stack key={reveiw.id} direction={'row'} spacing={1} mt={0.5}>
            <label
              className='checkbox-container'
              htmlFor={reveiw.value.toString()}>
              <Checkbox
                checked={checkedReview.includes(reveiw.id)}
                id={`reveiw${reveiw.id}`}
                namne={`reveiw-name${reveiw.id}`}
                style={{
                  color: ' #f2a742',
                  padding: '0 !important',
                }}
                icon={<span style={unchecked} />}
                checkedIcon={<span style={checked} />}
                onChange={event => {
                  const co = [...checkedReview];
                  if (event.target.checked) {
                    co.push(reveiw.id);
                  }
                  if (!event.target.checked) {
                    const findIndex = checkedReview.findIndex(
                      item => item === reveiw.id,
                    );
                    co.splice(findIndex, 1);
                  }
                  setCheckedReview(co);

                  onChange(event, 'reveiw', reveiw);
                }}
                sx={{
                  '& .css-zun73v': {
                    padding: '0px !important',
                  },
                }}
              />
              {/* <input
                id={reveiw.value.toString()}
                type='checkbox'
                style={{
                  color: '#f2a742', // Default color
                  padding: '0 !important',
                  backgroundColor: ' #f2a742', // Background color when checked
                }}
                name={'s'}
                onChange={event => onChange(event, 'reveiw', reveiw)}
              /> */}
              {/* <span className='radiomark '></span> */}
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
