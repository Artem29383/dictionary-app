import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import S from './DropDown.styled';

const DropDown = ({ options, value, setValue, className, label }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [temp, setTemp] = useState(value);
  const [animated, setAnimated] = useState(false);
  const [animatedRipple, setAnimatedRipple] = useState(false);
  const SPEED_ANIMATION = '0.2s';
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const setCoords = e => {
    const x = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const y = e.clientY - e.currentTarget.getBoundingClientRect().top;
    setCoordinates({ x, y });
  };

  const dropClickHandler = e => {
    setCoords(e);
    if (!showDropDown) {
      setShowDropDown(true);
      setAnimatedRipple(true);
    } else {
      setAnimated(false);
      setTimeout(() => {
        setShowDropDown(false);
      }, 500);
    }
  };

  const setValueDropDown = e => {
    setCoords(e);
    const valueOptions = e.target.textContent;
    setTemp(valueOptions);
  };

  useEffect(() => {
    setAnimatedRipple(false);
    setTimeout(() => {
      setAnimated(false);
      setTimeout(() => {
        setShowDropDown(false);
        setValue(temp);
      }, 100);
    }, 100);
  }, [temp]);

  useEffect(() => {
    if (showDropDown) {
      setAnimated(true);
    }
  }, [showDropDown]);

  const liList = options.map(
    // eslint-disable-next-line array-callback-return,consistent-return
    li => {
      if (String(li) !== value) {
        return (
          <S.Li
            key={li}
            onClick={setValueDropDown}
            isAnim={li === temp && animatedRipple}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...coordinates}
          >
            {li}
          </S.Li>
        );
      }
    }
  );

  return (
    <S.DropDownDiv className={className}>
      <S.DefaultValueDiv>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <S.DefaultValue onClick={dropClickHandler} {...coordinates}>
          {label} {value}{' '}
          <S.Triangle isAnim={animated} speedAnim={SPEED_ANIMATION} />
        </S.DefaultValue>
      </S.DefaultValueDiv>
      {showDropDown && (
        <S.DropList isAnim={animated} speedAnim={SPEED_ANIMATION}>
          <S.Ul>{liList}</S.Ul>
        </S.DropList>
      )}
    </S.DropDownDiv>
  );
};

export default DropDown;
DropDown.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  setValue: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
};
