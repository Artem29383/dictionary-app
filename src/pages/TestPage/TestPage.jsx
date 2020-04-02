import React, { useEffect } from 'react';
import useAction from 'hooks/useAction';
import { GET_ALL_TESTS } from 'models/tests/actions';
import useSelector from 'hooks/useSelector';
import {
  getIsLoadSelector,
  getTestsIdsSelector,
  getTestsSelector,
} from 'models/tests/selectors';
import Loader from 'components/Loader';
import { setLoad } from 'models/tests/reducer';
import Table from 'pages/TestPage/Table';
import ButtonRipple from 'components/ButtonRipple';
import Cross from 'components/Cross';
import Portal from 'components/Portal';
import ModalOverlay from 'components/ModalOverlay';
import routes from 'constants/routes';
import useToggle from 'hooks/useToggle';
import S from './TestPage.styled';

const TestPage = () => {
  const getAllTests = useAction(GET_ALL_TESTS);
  const isLoading = useSelector(getIsLoadSelector);
  const setLoading = useAction(setLoad);
  const ids = useSelector(getTestsIdsSelector);
  const entities = useSelector(getTestsSelector);
  const [showModal, setShowModal] = useToggle(false);

  useEffect(() => {
    setLoading(true);
    getAllTests();
  }, []);

  return (
    <S.Content>
      {isLoading ? <Loader /> : <Table tests={entities} ids={ids} />}
      <S.BtnPos>
        <ButtonRipple clickHandler={setShowModal} className="circle">
          <Cross top="50%" left="50%" position="absolute" />
        </ButtonRipple>
      </S.BtnPos>
      <Portal
        id="modal"
        // eslint-disable-next-line react/no-children-prop
        children={
          showModal && (
            <ModalOverlay
              toggle={setShowModal}
              isOpen={showModal}
              isFooter
              negativeBtn="Отмена"
              link="Перейти"
              linkPath={routes.createTest}
              headerText="Перейти на страницу создания теста?"
            />
          )
        }
      />
    </S.Content>
  );
};

export default TestPage;
