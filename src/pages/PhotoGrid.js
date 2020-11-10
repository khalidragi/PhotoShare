import { Grid, makeStyles } from '@material-ui/core';

import { useFirestore } from '../hooks/useFirestore';
import { colors } from '../constants/colors';
import ImageCard from '../components/ImageCard';

const useStyles = makeStyles({
  gridContainer: {
    background: colors.gray,
  },
});

const PhotoGrid = () => {
  const { images } = useFirestore();
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer} alignItems="flex-start">
      {images &&
        images.map((image) => <ImageCard image={image} key={image.id} />)}
    </Grid>
  );
};

export default PhotoGrid;
