import React, { useEffect } from 'react';
import Table from 'components/Table';
import PropTypes from 'prop-types';
import useAction from 'hooks/useAction';
import { GET_DICTIONARY } from 'models/dictionary/action';
import { setLoading } from 'models/dictionary/reducer';
import useSelector from 'hooks/useSelector';
import {
  getFilteredWords,
  getLoadingSelector,
  getWordsSelector,
} from 'models/dictionary/selectors';
import Loader from 'components/Loader';
import ButtonRipple from 'components/ButtonRipple';
import useToggle from 'hooks/useToggle';
import AddWordModal from 'components/AddWordModal';
import S from './Dictionary.styled';

const Dictionary = ({ user }) => {
  const getDictionary = useAction(GET_DICTIONARY);
  const setLoad = useAction(setLoading);
  const isLoading = useSelector(getLoadingSelector);
  const words = useSelector(getWordsSelector);
  const filteredIds = useSelector(getFilteredWords)('');
  const [showModal, setShowModal] = useToggle(false);
  // const ids = useSelector(getIdsSelector);
  useEffect(() => {
    setLoad(true);
    getDictionary(user.login);
  }, []);

  return (
    <S.Content>
      {isLoading ? <Loader /> : <Table words={words} ids={filteredIds} />}
      <S.BtnPos>
        <ButtonRipple onClick={setShowModal} className="circle">
          ✚
        </ButtonRipple>
      </S.BtnPos>
      {showModal && (
        <AddWordModal
          id={user.id}
          login={user.login}
          toggle={setShowModal}
          nameClass={showModal && 'show'}
        />
      )}
    </S.Content>
  );
};

export default Dictionary;
Dictionary.propTypes = {
  user: PropTypes.object.isRequired,
};
