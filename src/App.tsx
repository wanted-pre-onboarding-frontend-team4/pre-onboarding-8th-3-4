import SearchBar from 'components/searchBar/SearchBar';
import styled from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';

function App() {
  return (
    <Wrapper>
      <GlobalStyle />
      <SearchBar />
    </Wrapper>
  );
}

export default App;
const Wrapper = styled.div`
  background-color: #cae9ff;
  height: 100vh;
  display: flex;
  justify-content: center;
`;
