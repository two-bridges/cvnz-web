
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Theme } from '@mui/material';
import axios from '../../utils/axios';
import Page from '../../components/Page';
import PostCard from '../../components/PostCard';
import AddPost from '../../components/AddPost';
import Header from './Header';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  addPost: {
    marginTop: theme.spacing(3)
  },
  posts: {
    marginTop: theme.spacing(3)
  },
  post: {
    marginBottom: theme.spacing(3)
  }
}));

function SocialFeed() {
  const classes = useStyles({});
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    let mounted = true;

    const fetchPosts = () => {
      axios.get('/api/social-feed').then((response) => {
        if (mounted) {
          setPosts(response.data.posts);
        }
      });
    };

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page
      className={classes.root}
      title="Social Feed"
    >
      <Container maxWidth="lg">
        <Header className="" />
        <AddPost className={classes.addPost} />
        <div className={classes.posts}>
          {posts.map((post) => (
            <PostCard
              className={classes.post}
              key={post.id}
              post={post}
            />
          ))}
        </div>
      </Container>
    </Page>
  );
}

export default SocialFeed;
