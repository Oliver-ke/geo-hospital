import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Slider } from 'antd';

import './radiusSlider.styles.scss';

interface Islider {
  updateSlider: Function
}
const RadiusSlider: FC<Islider> = ({ updateSlider }): ReactElement => {
  const [sliderValue, setSliderValue] = useState(37);
  const onSliderChange = (e: any) => {
    const radiusInMeters = e * 1000;
    setSliderValue(e);
    updateSlider(radiusInMeters);
  }
  // on mount update innitial slider value
  useEffect(() => {
    updateSlider(sliderValue * 1000)
  });
  const marks: any = {
    5: '5km',
    50: {
      style: {
        color: 'rgba(0,0,0,0.7)',
      },
      label: <strong>50Km</strong>,
    },
  };
  return (
    <div className="slider-wrapper">
      <h4> Pick a geo-fencing radius</h4>
      <Slider min={5} max={50} onChange={onSliderChange} marks={marks} value={sliderValue} />
    </div>
  )
}

export default RadiusSlider;