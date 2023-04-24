import { Component } from 'react';
import css from 'App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { fetchImages } from 'api/App';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    isLoading: false,
    isModalVisible: false,
    isButtonVisible: false,
    images: {
      total_items: 0,
      items: [],
    },
    query: '',
    currentPage: 1,
    currentImage: { src: '', alt: '' },
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, images, currentPage } = this.state;

    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      try {
        this.setState({ isLoading: true });
        const { total_items, items } = await fetchImages(query, currentPage);
        this.setState({
          isButtonVisible: this.isButtonVisible(total_items, currentPage),

          images: {
            total_items: total_items,
            items: [...images.items, ...items],
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (prevState.images.items !== images.items && currentPage !== 1) {
      console.log('let scroll');
      window.scrollBy({
        top: 260 * 2 - 40,
        behavior: 'smooth',
      });
    }
  }

  isButtonVisible = (total_items, currentPage) => {
    return total_items / currentPage >= 12;
  };

  onSubmit = e => {
    e.preventDefault();
    const inputValue = e.target.elements.query.value;
    if (inputValue === this.state.query) return;
    this.setState({
      query: inputValue,
      currentPage: 1,
      images: {
        total_items: 0,
        items: [],
      },
    });
  };

  onImageClick = e => {
    const element = e.target;
    this.setState({
      currentImage: { src: element.dataset.source, alt: element.alt },
      isModalVisible: true,
    });
  };

  onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.setState({ isModalVisible: false });
    }
  };

  onButtonClick = e => {
    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 };
    });
  };

  onEscPress = e => {
    if (e.key === 'Escape') {
      this.setState({
        currentImage: { src: '', alt: '' },
        isModalVisible: false,
      });
    }
  };

  render() {
    const { isLoading, images, isModalVisible, isButtonVisible, currentImage } =
      this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <Loader isLoading={isLoading} />
        <ImageGallery images={images.items} onImageClick={this.onImageClick} />
        {isButtonVisible && (
          <Button onButtonClick={this.onButtonClick}>Load more</Button>
        )}
        {isModalVisible && (
          <Modal
            src={currentImage.src}
            alt={currentImage.alt}
            onBackdropClick={this.onBackdropClick}
            onEscPress={this.onEscPress}
          />
        )}
      </div>
    );
  }
}
