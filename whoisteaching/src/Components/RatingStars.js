import { Rating } from '@mui/material';
import React from 'react'

const RatingStars = (props) => {
  const { value } = props;  
  return (
    <div><Rating name="read-only" precision={0.1}  value={value} readOnly /></div>
  )
}

export function ratingStars(params) {
    return <RatingStars value={Number(params.value)} />;
  }