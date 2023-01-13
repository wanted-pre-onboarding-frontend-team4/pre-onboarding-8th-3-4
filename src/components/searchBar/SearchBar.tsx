import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import styled from 'styled-components';
import AutoCompleteItem from './AutoCompleteItem';
import useDebounce from 'hooks/useDebounce';
import { useRecoilState } from 'recoil';
import { Sick } from 'types';
import getData from 'apis';
import dataState from 'recoil/sliceData';
import useKeyDown from 'hooks/useKeyDown';

const SearchBar: React.FC = () => {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchedData, setSearchedData] = useState([]);
  const [suggested, setSuggested] = useRecoilState<Sick[]>(dataState);
  const [activeIdx, handleKeyArrow] = useKeyDown(suggested || []);
  const { debounceValue } = useDebounce(searchTerm);

  const filteredData = () => {
    setSuggested(searchedData);
    if (searchedData.length > 8) {
      setSuggested(searchedData.slice(0, 7));
    }
  };
  useEffect(filteredData, [searchTerm, searchedData, setSuggested]);

  const getSearchTermHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (!debounceValue) {
      setSearchedData([]);
    }
    getData(debounceValue).then((res: React.SetStateAction<never[]>) =>
      setSearchedData(res),
    );
  }, [debounceValue]);

  return (
    <Wrapper>
      <SearchWrapper>
        <InputWrapper>
          {!isSearch && <BsSearch />}
          <Input
            type='text'
            placeholder='질환명을 입력해 주세요'
            onClick={() => {
              setIsSearch(true);
            }}
            onChange={getSearchTermHandler}
            onKeyDown={handleKeyArrow}
            onBlur={() => setIsSearch(false)}
          />
        </InputWrapper>
        <Button type='button'>
          <BsSearch />
        </Button>
      </SearchWrapper>
      {isSearch && (
        <AutoCompleteItem searchTerm={debounceValue} activeIndex={activeIdx} />
      )}
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  margin-top: 10rem;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 480px;
  height: 65px;
  padding-right: 8px;
  border: 2px solid white;
  border-radius: 30px;
  background-color: #fff;
  :focus-within {
    border: px solid #017be8;
  }
`;
const InputWrapper = styled.div`
  padding: 20px 10px 20px 24px;
`;
const Input = styled.input`
  width: 350px;
  height: 30px;
  font-size: 1.2rem;
  color: #333;
  padding-left: 0.8rem;
`;
const Button = styled.button`
  height: 3rem;
  width: 3rem;
  font-size: 1.5rem;
  color: #fff;
  font-weight: 700;
  background-color: #017be8;
  border-radius: 30px;
`;
