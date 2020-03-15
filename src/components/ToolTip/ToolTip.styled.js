import styled from 'styled-components/macro';

export default {
  // eslint-disable-next-line no-unused-vars
  ToolTip: styled.div.attrs(({ x, y, visible }) => ({
    style: {
      left: `${x}px`,
      top: `${y}px`,
      display: `${visible ? 'block' : 'none'}`,
    },
  }))`
    position: absolute;
    z-index: 1000;

    &::after {
      display: flex;
      justify-content: center;
      background: #444;
      border-radius: 8px;
      color: #fff;
      margin: -96px auto 0;
      content: attr(title);
      font-size: 16px;
      padding: 13px;
      width: 220px;
    }

    &::before {
      border: solid;
      border-color: #444 transparent;
      border-width: 12px 6px 0 6px;
      content: '';
      left: 45%;
      bottom: 30px;
      position: absolute;
    }
  `,
};
