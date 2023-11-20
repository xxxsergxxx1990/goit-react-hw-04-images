import { useState,useEffect } from 'react';
import { Notify } from 'notiflix';

import s from './App.module.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchHitsByQuery } from '../services/api';

export const App = () =>{
const [images,setImages] = useState([]);
const [query,setQuery] = useState('');
const [page,setPage] = useState(1);
const [isLoading,setIsLoading] = useState(false);
const [showBtn,setShowBtn] = useState(false);
const [showModal,setShowModal] = useState(false);
const [largeImageURL,setLargeImageURL] = useState('');
const [error,setError] = useState(null);


useEffect(() => {
  
  if (page !== 1 || query !== '') {
    fetchGallery(query, page);
  }
}, [query, page]);

const fetchGallery = async (query, page) => {
  try {
    setIsLoading(true);
    const { hits, totalHits } = await fetchHitsByQuery(query, page);

    if (hits.length === 0) {
      Notify.failure('No matches found!');
    }

    setImages(prevImages => [...prevImages, ...hits]);
    setShowBtn(page < Math.ceil(totalHits / 12));
  } catch (error) {
    setError(error);
  } finally {
    setIsLoading(false);
  }
};

const onSubmit = e => {
  e.preventDefault();
  const value = e.target.search.value.trim();
  if (!value) {
    Notify.failure('Can not be empty');
    return;
  }
  setQuery(value);
  setIsLoading(true);
  setImages([]);
  setPage(1);
};

const onNextPage = () => {
  setPage(prevPage => prevPage + 1);
};

const onClickImage = url => {
  setShowModal(true);
  setLargeImageURL(url);
};

const onModalClose = () => {
  setShowModal(false);
  setLargeImageURL('');
};

return (
  <div className={s.App}>
    <Searchbar onSubmit={onSubmit} />
    {images.length !== 0 && (
      <ImageGallery images={images} onClickImage={onClickImage} />
    )}
    {isLoading && <Loader />}
    {error && <p>Something went wrong...</p>}
    {showBtn && !isLoading && images.length !== 0 && (
      <Button onNextPage={onNextPage} />
    )}
    {showModal && (
      <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
    )}
  </div>
);



}
