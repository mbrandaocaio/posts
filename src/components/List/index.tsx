import * as S from "./styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "@material-ui/core";

interface Post {
  id: string;
  title: string;
  body: string;
}

interface Comment {
  id: string;
  name: string;
  email: string;
  body: string;
  postId: number;
}

const url = "https://jsonplaceholder.typicode.com/";

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

export function List() {
  const [postsAll, setPostsAll] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const res = await axios.get(url + "posts");
    let arr: Post[] = [];

    if (res && res.data && res.data.length > 0) {
      for (let i = 0; i < 10; i++) {
        arr.push(res.data[i]);
      }

      setPostsAll(arr);
      setPosts(arr);
    }
  };

  const removePost = async (post: Post) => {
    const res = await axios.delete(url + "posts/" + post.id);
    if (res?.status === 200) {
      const p = posts.filter((el) => {
        return el.id !== post.id;
      });
      setPosts(p);
    }
  };

  const seeComent = async (post: Post) => {
    setComments([]);
    const res = await axios.get(url + "posts/" + post.id + "/comments");
    if (res?.data) {
      setComments(res.data);
    }
    handleOpen();
  };

  const classes = S.useStyles();

  const [modalStyle] = useState(getModalStyle);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <S.Container>
      <S.Table>
        <thead>
          <S.TR>
            <S.TD>#</S.TD>
            <S.TD>Título</S.TD>
            <S.TD>Ações</S.TD>
          </S.TR>
        </thead>
        <tbody>
          {posts.map((post) => (
            <S.TR key={post.id}>
              <S.TD>{post.id}</S.TD>
              <S.TD>{post.body}</S.TD>
              <S.TDBTN>
                <S.Button color="green" onClick={() => seeComent(post)}>
                  Comentários
                </S.Button>
                <S.Button color="red" onClick={() => removePost(post)}>
                  Remover
                </S.Button>
              </S.TDBTN>
            </S.TR>
          ))}
        </tbody>
      </S.Table>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Comentários</h2>
          <p id="simple-modal-description">Aqui mostra os comentários</p>

          <S.Table>
            <thead>
              <S.TR>
                <S.TD>#</S.TD>
                <S.TD>Nome</S.TD>
                <S.TD>Comment</S.TD>
                <S.TD>Post-ID</S.TD>
              </S.TR>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <S.TR key={comment.id}>
                  <S.TD>{comment.id}</S.TD>
                  <S.TD>{comment.name}</S.TD>
                  <S.TD>{comment.body}</S.TD>
                  <S.TD>{comment.postId}</S.TD>
                </S.TR>
              ))}
            </tbody>
          </S.Table>
        </div>
      </Modal>
    </S.Container>
  );
}
