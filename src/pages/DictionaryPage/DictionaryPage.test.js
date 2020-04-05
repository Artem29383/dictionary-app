import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DictionaryPage from 'pages/DictionaryPage/DictionaryPage';
import React from 'react';
import { Provider } from 'react-redux';
import store from 'store/store';
import ButtonRipple from 'components/ButtonRipple';

configure({ adapter: new Adapter() });

describe('Testing Dictionary page', () => {
  let action;
  let wrapper;
  
  beforeEach(() => {
    action = jest.fn();
    wrapper = shallow(
      <Provider store={store}>
        <DictionaryPage />
      </Provider>
    );
  });
  
  test('Render', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('Render button', () => {
    const button = wrapper.find(<ButtonRipple />);
    button.toMatchSnapshot();
  })
});