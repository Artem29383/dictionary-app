import styled from 'styled-components/macro';

export default {
  DivTable: styled.div`
    width: 100%;
  `,
  TableWrap: styled.div`
    max-width: 800px;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 15px 1px rgba(117, 117, 117, 1);
    transform: translateX(-50%);
    margin: 50px 0 50px 50%;
  `,
  Table: styled.table`
    border-collapse: collapse;
    width: 100%;
  `,
  TrText: styled.tr`
    color: #808080;
    background-color: #fafafa;

    &:nth-child(2n) {
      color: #5e5e5e;
      background-color: #d5d5d5;
    }
  `,
  Th: styled.th`
    font-size: 18px;
    color: #fff;
    line-height: 1.4;
    font-family: Light, serif;
    background-color: #6c7ae0;
    padding-top: 18px;
    padding-bottom: 18px;
    cursor: pointer;
  `,
  ThText: styled.th`
    font-size: 15px;
    color: inherit;
    line-height: 1.4;
    vertical-align: middle;
    font-family: Light, serif;
    padding-top: 16px;
    padding-bottom: 16px;
    cursor: pointer;

    &.red {
      color: red;
    }
  `,
};
