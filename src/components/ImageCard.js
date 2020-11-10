import {
  Grid,
  makeStyles,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  IconButton,
} from '@material-ui/core';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { colors } from '../constants/colors';
import { useFirestore } from '../hooks/useFirestore';
import { useAuth } from '../hooks/useAuth';
import { useStorage } from '../hooks/useStorage';

const useStyles = makeStyles({
  image: {
    padding: '5px 6px',
  },
  card: {
    background: colors.gray,
  },
  cardMedia: {
    paddingTop: '56.25%',
    position: 'relative',
  },
  cardContent: {
    padding: '2px 5px',
    margin: 0,
    color: colors.dark,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2px 5px',
    margin: 0,
    color: colors.dark,
  },
  likeIcon: {
    color: colors.pink,
  },
  author: { fontWeight: 300 },
  likes: {
    fontWeight: 300,
    marginRight: '4px',
  },
  delete: {
    color: colors.gray,
    border: 'none',
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer',
  },
});

const ImageCard = ({ image }) => {
  const { user } = useAuth();
  const { updateImage } = useFirestore();
  const { deletePhoto } = useStorage();
  const classes = useStyles();
  const { likes } = image;

  const handleLikes = () => {
    if (likes.includes(user.uid)) {
      let removeLike = likes.filter((like) => like === user.id);
      updateImage(image.id, { likes: removeLike });
    } else {
      updateImage(image.id, { likes: [...image.likes, user.uid] });
    }
  };

  let authorized = user.uid === image.user;

  const handleDelete = () => {
    deletePhoto(image.id, image.path);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} className={classes.image}>
      <Card className={classes.card} raised>
        <CardMedia
          className={classes.cardMedia}
          image={image.url}
          title="Image title">
          {authorized && (
            <ClearAllIcon onClick={handleDelete} className={classes.delete} />
          )}
        </CardMedia>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" component="h2" align="left">
            {image.title}
          </Typography>
          <Typography variant="body1" component="p" align="left">
            {image.desc}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Typography
            variant="caption"
            component="p"
            align="left"
            className={classes.author}>
            By: {image.author}
          </Typography>
          <IconButton className={classes.likeIcon} onClick={handleLikes}>
            <Typography
              variant="caption"
              component="p"
              align="left"
              className={classes.likes}>
              Likes {likes.length}
            </Typography>
            {likes.includes(user.uid) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ImageCard;
