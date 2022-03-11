
import { List } from "../List";
import * as S from "./styles";

function Home() {
  
  return (
    <S.Main>
      <S.Header>
        <S.Title>Listagem de Posts</S.Title>

        <List></List>
      </S.Header>
    </S.Main>
  );
}

export default Home;
