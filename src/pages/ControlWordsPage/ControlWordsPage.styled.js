import styled from 'styled-components/macro';

export default {
  Content: styled.div`
    width: 100%;
    height: calc(100% - 80px);
    display: flex;
    font-size: 24px;
    justify-content: center;
    align-items: center;
  `,
  Form: styled.div`
    max-width: 400px;
    width: 100%;
    height: auto;
    border-radius: 5px;
    box-shadow: 0 0 15px 1px rgba(117, 117, 117, 1);
  `,
  FormHeader: styled.div`
    height: 80px;
    background-color: #2196f3;
    color: #fff;
    position: relative;
  `,
  FormHeaderText: styled.span`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `,
  FormHeaderCounter: styled.span`
    position: absolute;
    bottom: 5px;
    font-size: 16px;
    right: 5px;
  `,
  FormBody: styled.div`
    height: auto;
    width: 100%;
  `,
  FormBodyText: styled.div`
    text-align: center;
    width: 100%;
    padding: ${({ padding }) => `${padding}px 0;`};
  `,
  FormInputWrap: styled.div`
    width: 100%;
    padding: 0 30px;
  `,
  FormFooter: styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-around;
    padding: 0 40px;
  `,
  FormText: styled.div`
    text-align: center;
    margin: 10px 0;
    color: red;
  `,
};
