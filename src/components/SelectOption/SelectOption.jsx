import React from 'react';
import PropTypes from 'prop-types';
import useToggle from 'hooks/useToggle';
import S from './SelectOption.styled';

const SelectOption = ({
  elemCountsOnPage,
  choosePageSizeHandler,
  arrayOptions,
  text,
}) => {
  const [showSelect, setShowSelect] = useToggle(false);
  // eslint-disable-next-line array-callback-return,consistent-return
  const options = arrayOptions.map(opt => {
    if (elemCountsOnPage !== opt) {
      return (
        <S.Option key={opt} onClick={choosePageSizeHandler}>
          {opt}
        </S.Option>
      );
    }
  });
  return (
    <S.Div>
      {text}
      <S.Select onClick={setShowSelect} select={showSelect}>
        {elemCountsOnPage} {!showSelect ? '▼' : '▲'}
        {options}
      </S.Select>
    </S.Div>
  );
};

export default SelectOption;
SelectOption.propTypes = {
  text: PropTypes.string,
  elemCountsOnPage: PropTypes.number,
  choosePageSizeHandler: PropTypes.func,
  arrayOptions: PropTypes.array,
};
