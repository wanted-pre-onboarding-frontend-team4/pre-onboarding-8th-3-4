import React from 'react';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { Sick } from '../../types';
import dataState from '../../recoil/sliceData';

type Props = {
  searchTerm: string | undefined;
};
const AutoCompleteItem = (props: Props) => {
  const { searchTerm } = props;

  const [suggested] = useRecoilState<Sick[]>(dataState);
  return (
    <Wrapper onClick={() => {}} onMouseDown={e => e.preventDefault()}>
      <ContentWrapper>
        <Title>추천 검색어</Title>
        <ul>
          {!searchTerm ? (
            <div>검색어를 입력해주세요</div>
          ) : suggested.length === 0 ? (
            <div>검색어없음</div>
          ) : (
            suggested?.map((item, idx) => (
              <Item key={item.sickCd}>
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
  height: 400px;
  border-radius: 20px;
  font-size: 20px;
`;
const ContentWrapper = styled.div`
  padding: 25px;
`;
const Title = styled.p`
  border-bottom: 1px solid #333;
`;

const Item = styled.li`
  padding: 5px;
  width: 400px;
  &:hover {
    background-color: #edf5f5d4;
    cursor: pointer;
  }
  position: relative;
`;
