import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import S from './Paginate.styled';

const Paginate = ({
  pageChangeHandler,
  currentPage,
  chunkArrayLength,
  prevPageHandler,
  nextPageHandler,
}) => {
  const [pagesArray, setPagesArray] = useState(
    chunkArrayLength > 2 ? [1, 2, 3, chunkArrayLength] : [1, chunkArrayLength]
  );
  useEffect(() => {
    if (currentPage >= 2 && currentPage + 2 < chunkArrayLength) {
      setPagesArray([
        1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        chunkArrayLength,
      ]);
    }
  }, [currentPage]);
  // eslint-disable-next-line array-callback-return,consistent-return
  const pages = pagesArray.map(page => {
    return (
      <S.PaginateLi
        onClick={pageChangeHandler}
        /* eslint-disable-next-line react/no-array-index-key */
        key={page}
        className={currentPage + 1 === page && 'active'}
      >
        {page}
      </S.PaginateLi>
    );
  });
  return (
    <S.PaginateDiv>
      <S.PaginateUl>
        <S.PaginateLi onClick={prevPageHandler}>{'<'}</S.PaginateLi>
        {pages}
        <S.PaginateLi onClick={nextPageHandler}>{'>'}</S.PaginateLi>
      </S.PaginateUl>
    </S.PaginateDiv>
  );
};

export default Paginate;
Paginate.propTypes = {
  pageChangeHandler: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  chunkArrayLength: PropTypes.number.isRequired,
  prevPageHandler: PropTypes.func.isRequired,
  nextPageHandler: PropTypes.func.isRequired,
};
