import css from 'App.module.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';
import { fetchImages } from 'api/App';
import Modal from './components/Modal/Modal';
import { useState, useEffect } from 'react';

export const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImage, setCurrentImage] = useState({ src: '', alt: '' });

  useEffect(() => {
    try {
      if (query === '') {
        return;
      }
      setLoading(true);
      setButtonVisible(false);
      async function fetchData() {
        const { totalItems, items } = await fetchImages(query, currentPage);
        setItems(prev => [...prev, ...items]);
        if (totalItems / currentPage >= 15) setButtonVisible(true);
      }
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [query, currentPage]);

  useEffect(() => {
    if (currentPage === 1) {
      return;
    }

    window.scrollBy({
      top: window.innerHeight - 150,
      behavior: 'smooth',
    });
  }, [items, currentPage]);

  useEffect(() => {});

  const onSubmit = e => {
    e.preventDefault();
    const inputValue = e.target.elements.query.value;
    if (inputValue === query) return;
    setQuery(inputValue);
    setCurrentPage(1);
    setItems([]);
  };

  const onImageClick = e => {
    const element = e.target;
    setCurrentImage({ src: element.dataset.source, alt: element.alt });
    setModalVisible(true);
  };

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      setModalVisible(false);
    }
  };

  const onButtonClick = e => {
    setCurrentPage(prev => prev + 1);
  };

  const onEscPress = e => {
    if (e.key === 'Escape') {
      setCurrentImage({ src: '', alt: '' });
      setModalVisible(false);
    }
  };
  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      <Loader isLoading={isLoading} />
      <ImageGallery images={items} onImageClick={onImageClick} />
      {isButtonVisible && (
        <Button onButtonClick={onButtonClick}>Load more</Button>
      )}
      {isModalVisible && (
        <Modal
          src={currentImage.src}
          alt={currentImage.alt}
          onBackdropClick={onBackdropClick}
          onEscPress={onEscPress}
        />
      )}
    </div>
  );
};
