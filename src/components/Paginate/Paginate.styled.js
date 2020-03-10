import styled from 'styled-components/macro';

export default {
  PaginateDiv: styled.div`
    width: 100%;
  `,
  PaginateUl: styled.ul`
    display: flex;
    justify-content: center;
  `,
  PaginateLi: styled.li`
    color: gray;
    padding: 0 5px;
    cursor: pointer;
    transition: color 0.1s linear;

    &:hover {
      color: #6c7ae0;
    }

    &.active {
      color: #6c7ae0;
    }
  `,
};
