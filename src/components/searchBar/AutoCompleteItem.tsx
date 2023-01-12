import React, { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { Sick } from '../../types';
import dataState from '../../recoil/sliceData';
import { AiOutlineSearch } from 'react-icons/ai';

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
        <Title>추천 검색어</Title>
        <ul ref={autoRef}>
          {!searchTerm ? (
            <div>검색어를 입력해주세요</div>
          ) : suggested.length === 0 ? (
            <div>검색어없음</div>
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
        </ul>
      </ContentWrapper>
    </Wrapper>
  );
};

export default AutoCompleteItem;

const Wrapper = styled.div`
  background-color: #fff;
  margin-top: 10px;
  height: 400px;
  border-radius: 20px;
  font-size: 18px;
`;
const ContentWrapper = styled.div`
  padding: 25px;
`;
const Title = styled.p`
  border-bottom: 1px solid #333;
  padding-bottom: 3px;
  font-size: 15px;
  margin-bottom: 10px;
  color: #808080;
`;

const Item = styled.li<{ isActive: boolean }>`
  padding: 7px;
  width: 400px;
  margin-bottom: 4px;
  &:hover {
    background-color: #edf5f5d4;
    cursor: pointer;
  }
  background-color: ${props => (props.isActive ? '#edf5f5d4' : '#fff')};
  position: relative;
`;

const SearchMark = styled.span`
  margin-right: 14px;
`;
