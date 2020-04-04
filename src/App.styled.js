import styled from 'styled-components/macro';
import { device } from 'constants/device';

export default {
  Content: styled.div`
    width: 100%;
    position: relative;
    min-height: 100vh;

    @media ${device.tabletM} {
      margin-top: 80px;
    }
  `,
};
