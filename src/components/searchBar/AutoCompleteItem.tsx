import React, { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { Sick } from '../../types';
import dataState from '../../recoil/sliceData';
import { AiOutlineSearch } from 'react-icons/ai';
import EmptyResult from './EmptyResult';

type Props = {
  searchTerm: string | undefined;
  activeIndex: number;
};

const AutoCompleteItem = (props: Props) => {
  const { searchTerm, activeIndex } = props;
  const autoRef = useRef<HTMLUListElement>(null);
  const [suggested] = useRecoilState<Sick[]>(dataState);

  return (
    <Wrapper onClick={() => {}} onMouseDown={e => e.preventDefault()}>
      <ContentWrapper>
        {searchTerm && (
          <Searched>
            <AiOutlineSearch />
            {searchTerm}
          </Searched>
        )}
        <Title>추천 검색어</Title>
        <ListWrapper ref={autoRef}>
          {!searchTerm ? (
            <EmptyResult text={'검색어를 입력해주세요'} />
          ) : suggested.length === 0 ? (
            <EmptyResult text={'검색 결과가 없습니다.'} />
          ) : (
            suggested?.map((item, idx) => (
              <Item key={item.sickCd} isActive={activeIndex === idx}>
                <SearchMark>
                  <AiOutlineSearch />
                </SearchMark>
                {item.sickNm
                  .replaceAll(searchTerm, `#$%${searchTerm}#$%`)
                  .split('#$%')
                  .map((e: string) => (
                    <span
                      key={uuid()}
                      style={{ fontWeight: e === searchTerm ? '700' : '300' }}
                    >
                      {e}
                    </span>
                  ))}
              </Item>
            ))
          )}
        </ListWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default AutoCompleteItem;

const Wrapper = styled.div`
  background-color: #fff;
  margin-top: 10px;
  height: 450px;
  border-radius: 20px;
  font-size: 18px;
`;
const ContentWrapper = styled.div`
  padding: 25px;
`;
const Title = styled.p`
  border-bottom: 1px solid #333;
  padding-bottom: 3px;
  margin-bottom: 10px;
  font-size: 15px;
  color: #808080;
`;
const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Item = styled.li<{ isActive: boolean }>`
  padding: 7px;
  width: 425px;
  margin-bottom: 4px;
  background-color: ${props => (props.isActive ? '#edf5f5d4' : '#fff')};
  position: relative;
`;

const SearchMark = styled.span`
  margin-right: 5px;
  font-size: 16px;
`;
const Searched = styled.div`
  font-size: 19px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  color: #333;
  font-weight: 700;
`;
