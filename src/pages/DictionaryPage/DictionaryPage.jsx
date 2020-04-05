import React, { useEffect, useState } from 'react';
import Table from 'components/Table';
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
import { normalized } from 'utils/normalized';
import { useInput } from 'hooks/useInput';
import TableSearch from 'components/TableSearch';
import { chunks } from 'utils/chunks';
import Paginate from 'components/Paginate';
import AddWordModal from 'pages/DictionaryPage/AddWordModal';
import { getUserSelector } from 'models/user/selectors';
import Portal from 'components/Portal';
import DropDown from 'components/DropDown';
import S from './DictionaryPage.styled';

const DictionaryPage = () => {
  const [user] = useSelector(getUserSelector);
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
    const dataNormalized = normalized(displayData, 'dictionary');
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
  }, [elemCountsOnPage, filteredIds, ids.length]);

  return (
    <S.Content>
      <TableSearch
        type="text"
        value={value}
        onChange={setValue}
        label="Поиск"
      />
      <DropDown
        className="dictionary"
        label="Элементов на странице:"
        value={String(elemCountsOnPage)}
        setValue={setElemCountsOnPage}
        options={[10, 50, 100]}
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
        <ButtonRipple clickHandler={setShowModal} className="circle">
          ✚
        </ButtonRipple>
      </S.BtnPos>
      <Portal
        id="Modal"
        /* eslint-disable-next-line react/no-children-prop */
        children={
          showModal && (
            <AddWordModal
              id={user.id}
              login={user.login}
              toggle={setShowModal}
              isOpen={showModal}
            />
          )
        }
      />
    </S.Content>
  );
};

export default DictionaryPage;
