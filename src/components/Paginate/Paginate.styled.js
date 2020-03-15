import styled from 'styled-components/macro';
/* stylelint-disable */

export default {
  PaginateDiv: styled.div`
    width: 100%;
    padding: 0 0 20px 0;
  `,
  PaginateUl: styled.ul`
    display: flex;
    justify-content: center;
  `,
  PaginateLi: styled.li`
    padding: 6px 20px;
    font-size: 24px;
    margin-left: -1px;
    cursor: pointer;
    line-height: 1.42857143;
    color: #337ab7;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
    transition: background-color 0.1s linear, border-color 0.1s linear,
      color 0.1s linear;

    &.active {
      color: #fff;
      background-color: #337ab7;
      border-color: #337ab7;
    }

    &:hover {
      color: #fff;
      background-color: #9d83b7;
      border-color: #337ab7;
    }
  `,
};
/* stylelint-enable */
