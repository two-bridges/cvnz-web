
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import {
  Typography,
  Button,
  IconButton,
  Tooltip,
  colors
  , Theme
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  likeButton: {},
  likedButton: {
    color: colors.red[600]
  },
  shareButton: {
    marginLeft: 'auto'
  },
  shareIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Reactions({ post, className = "", ...rest }) {
  const classes = useStyles({});
  const [liked, setLiked] = useState<any>(post.liked);
  const [likes, setLikes] = useState<any>(post.likes);

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {liked ? (
        <Tooltip title="Unlike">
          <IconButton
            className={classes.likedButton}
            onClick={handleUnlike}
            size="small"
          >
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Like">
          <IconButton
            className={classes.likeButton}
            onClick={handleLike}
            size="small"
          >
            <FavoriteBorderIcon />
          </IconButton>
        </Tooltip>
      )}
      <Typography
        color="textSecondary"
      // variant="h6"
      >
        {likes}
      </Typography>
      <Button
        className={classes.shareButton}
        size="small"
        variant="contained"
      >
        <ShareIcon className={classes.shareIcon} />
        Share
      </Button>
    </div>
  );
}

Reactions.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object.isRequired
};

export default Reactions;
