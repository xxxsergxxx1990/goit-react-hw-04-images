// import { Component } from 'react';
// import { Notify } from 'notiflix';

// import s from './App.module.css';

// import { Searchbar } from './Searchbar/Searchbar';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Button } from './Button/Button';
// import { Loader } from './Loader/Loader';
// import { Modal } from './Modal/Modal';
// import { fetchHitsByQuery } from '../services/api';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showBtn: false,
    showModal: false,
    largeImageURL: '',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const {query, page } = this.state
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.fetchGallery(query, page)
    }
  }
  async fetchGallery(query, page) {
    try {
      this.setState({ isLoading: true });
      const { hits, totalHits } = await fetchHitsByQuery(query, page);

      if (hits.length === 0) {
     return   Notify.failure('No matches found!');
      }
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...hits],
          showBtn: this.state.page < Math.ceil(totalHits / 12),
        };
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const value = e.target.search.value.trim()
    if (!value) {
      return Notify.failure('Can not be empty');
    }
    this.setState({
      query: value,
      isLoading: true,
      images: [],
      page: 1,
    });
  };
  onNextPage = () => {
    this.setState(prevState=>({
      page: prevState.page + 1,
 
    }));
   
  };

 
  onClickImage = url => {
    this.setState({ showModal: true, largeImageURL: url });
  };

  onModalClose = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { images, isLoading, showBtn, showModal, largeImageURL,error} = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onSubmit} />
        
        {images.length !== 0 && 
          (<ImageGallery images={images} onClickImage={this.onClickImage} />)
        }

        {isLoading && <Loader />}
        {error && <p>Something went wrong...</p>}
        {showBtn && !isLoading && images.length !== 0 && (
          <Button onNextPage={this.onNextPage} />
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onModalClose={this.onModalClose}
          />
        )}
      </div>
    )
  
  }
}
