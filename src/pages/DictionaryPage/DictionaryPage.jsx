import React, { useEffect, useState } from 'react';
import Table from 'components/Table';
import PropTypes from 'prop-types';
import orderBy from 'lodash.orderby';
import useAction from 'hooks/useAction';
import { GET_DICTIONARY } from 'models/dictionary/action';
import { setDictionary, setLoading } from 'models/dictionary/reducer';
import useSelector from 'hooks/useSelector';
import {
  getFilteredWords,
  getIdsSelector,
  getLoadingSelector,
  getWordsSelector,
} from 'models/dictionary/selectors';
import Loader from 'components/Loader';
import ButtonRipple from 'components/ButtonRipple';
import useToggle from 'hooks/useToggle';
import AddWordModal from 'components/AddWordModal';
import { normalized } from 'utils/normalized';
import { useInput } from 'hooks/useInput';
import TableSearch from 'components/TableSearch';
import { chunks } from 'utils/chunks';
import Paginate from 'components/Paginate';
import SelectOption from 'components/SelectOption';
import S from './DictionaryPage.styled';

const DictionaryPage = ({ user }) => {
  const getDictionary = useAction(GET_DICTIONARY);
  const setLoad = useAction(setLoading);
  const isLoading = useSelector(getLoadingSelector);
  const words = useSelector(getWordsSelector);
  const setDict = useAction(setDictionary);
  const [currentPage, setCurrentPage] = useState(0);
  const ids = useSelector(getIdsSelector);
  const [elemCountsOnPage, setElemCountsOnPage] = useState(10);
  const [sort, setSort] = useState('asc');
  const [value, setValue] = useInput('');
  const filteredIds = useSelector(getFilteredWords)(value);
  const [showModal, setShowModal] = useToggle(false);
  const [chunksArray, setChunksArray] = useState([]);
  const chunkArrayLength = chunksArray.length;

  const onSort = (sortCol, initSort) => {
    const sortType = sort === 'asc' ? 'desc' : 'asc';
    const displayData = orderBy(words, sortCol, initSort || sortType);
    const dataNormalized = normalized(displayData);
    setDict({
      entities: dataNormalized.entities.dictionary,
      ids: dataNormalized.result,
    });
    setSort(initSort || sortType);
  };

  useEffect(() => {
    onSort('word', 'asc');
  }, [ids.length]);

  useEffect(() => {
    if (filteredIds.length === 0) {
      setLoad(true);
      getDictionary(user.login);
    }
  }, []);

  useEffect(() => {
    setChunksArray(chunks(filteredIds, elemCountsOnPage));
    setCurrentPage(0);
  }, [elemCountsOnPage, filteredIds]);

  const choosePageSizeHandler = e => {
    setElemCountsOnPage(Number(e.currentTarget.innerText));
  };

  return (
    <S.Content>
      <TableSearch
        type="text"
        value={value}
        onChange={setValue}
        label="Поиск"
      />
      <SelectOption
        choosePageSizeHandler={choosePageSizeHandler}
        elemCountsOnPage={elemCountsOnPage}
        arrayOptions={[10, 50, 100]}
        text="Элементов на странице"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <Table
          userId={user.id}
          login={user.login}
          sortType={sort}
          sort={onSort}
          words={words}
          ids={chunksArray[currentPage] || []}
        />
      )}
      {chunkArrayLength > 1 ? (
        <Paginate
          currentPage={currentPage + 1}
          chunkArrayLength={chunkArrayLength}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
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

export default DictionaryPage;
DictionaryPage.propTypes = {
  user: PropTypes.object.isRequired,
};
