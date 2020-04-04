import styled from 'styled-components/macro';
import { colors } from 'styles/constants';
import { device } from 'constants/device';

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

    @media ${device.laptop} {
      max-width: 600px;
    }

    @media ${device.w630} {
      max-width: 500px;
    }

    @media ${device.tabletM} {
      max-width: 400px;
    }

    @media ${device.mobileL} {
      max-width: 300px;
    }
  `,
  Table: styled.table`
    border-collapse: collapse;
    width: 100%;
  `,
  TrText: styled.tr`
    color: ${colors.gray};
    background-color: ${colors.alabaster};

    &:nth-child(2n) {
      color: ${colors.scorpion};
      background-color: ${colors.alto};
    }
  `,
  Th: styled.th`
    font-size: 18px;
    color: ${colors.white};
    line-height: 1.4;
    font-family: Light, serif;
    background-color: ${colors.havelockBlue};
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
      color: ${colors.blazeOrange};
    }
  `,
  Thead: styled.thead`
    @media ${device.tabletM} {
      display: none;
    }
  `,
  Tr: styled.tr``,
  Tbody: styled.tbody``,
};
