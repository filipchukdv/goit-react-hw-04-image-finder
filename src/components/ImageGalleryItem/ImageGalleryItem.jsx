import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ smallImage, largeImage, tags, onImageClick }) => (
  <li className={css.ImageGalleryItem}>
    <img
      src={smallImage}
      alt={tags}
      className={css['ImageGalleryItem-image']}
      onClick={onImageClick}
      data-source={largeImage}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
