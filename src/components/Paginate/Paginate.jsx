import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { paginate } from 'utils/paginationPages';
import S from './Paginate.styled';

const Paginate = ({ currentPage, chunkArrayLength, setCurrentPage }) => {
  const [pagesArray, setPagesArray] = useState([]);
  useEffect(() => {
    setPagesArray(paginate(chunkArrayLength, currentPage));
  }, [currentPage, chunkArrayLength]);

  const firstPage = () => {
    setCurrentPage(0);
  };

  const lastPage = () => {
    setCurrentPage(chunkArrayLength - 1);
  };

  const prevPageHandler = () => {
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 2);
    }
  };

  const nextPageHandler = () => {
    if (currentPage <= chunkArrayLength - 1) {
      setCurrentPage(currentPage);
    }
  };

  const pageChangeHandler = e => {
    setCurrentPage(Number(e.currentTarget.innerText - 1));
  };
  // eslint-disable-next-line array-callback-return,consistent-return
  const pages = pagesArray.map(page => {
    return (
      <S.PaginateLi
        onClick={pageChangeHandler}
        /* eslint-disable-next-line react/no-array-index-key */
        key={page}
        className={currentPage === page && 'active'}
      >
        {page}
      </S.PaginateLi>
    );
  });
  return (
    <S.PaginateDiv>
      <S.PaginateUl>
        <S.PaginateLi onClick={firstPage}>First</S.PaginateLi>
        <S.PaginateLi onClick={prevPageHandler}>{'<'}</S.PaginateLi>
        {pages}
        <S.PaginateLi onClick={nextPageHandler}>{'>'}</S.PaginateLi>
        <S.PaginateLi onClick={lastPage}>Last</S.PaginateLi>
      </S.PaginateUl>
    </S.PaginateDiv>
  );
};

export default Paginate;
Paginate.propTypes = {
  currentPage: PropTypes.number.isRequired,
  chunkArrayLength: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
