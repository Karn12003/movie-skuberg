'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchBar } from '../components/searchBar';
import { MovieGrid } from '../components/movieGrid';
import { Carousel } from '../components/carousel';
import { CartButton } from '@/components/cartButton';
import { Footer } from '@/components/footer';
import { Movie } from '@/types/movie';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  price?: number;
}

export default function MovieShop() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]); // 🍿 หนังนำ
  const [cart, setCart] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=a773dfbf28186bb9dc9e1e217d188e0c`
      );
      setFeaturedMovies(res.data.results);
    };
    fetchFeaturedMovies();
  }, []);

  const fetchMovies = async () => {
    if (!query.trim()) return;
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=a773dfbf28186bb9dc9e1e217d188e0c&query=${encodeURIComponent(
          query
        )}`
      );
      console.log('Search result:', res.data.results);
      setMovies(res.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleAddToCart = (movie: Movie) => {
    if (!cart.find((m) => m.id === movie.id)) {
      setCart([...cart, { ...movie, price: 100 }]);
    }
  };

  const updatePrice = (id: number, price: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price } : item))
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item, _, arr) => {
    let discount = 1;
    if (arr.length > 5) discount = 0.8;
    else if (arr.length > 3) discount = 0.9;
    return sum + item.price! * discount;
  }, 0);

  const handleOrder = () => {
    setIsModalOpen(true);
    setCountdown(60);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsModalOpen(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isModalOpen]);

  useEffect(() => {
    const stored = localStorage.getItem('kino-cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('kino-cart', JSON.stringify(cart));
  }, [cart]);

  // Use effect เพื่อ fetch ข้อมูลทุกครั้งที่มีการเปลี่ยนแปลงใน query
  useEffect(() => {
    if (query.trim()) {
      fetchMovies();
    }
  }, [query]);

  const isSearching = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="flex items-center p-6 justify-between ">
        <SearchBar query={query} setQuery={setQuery} onSearch={() => {}} />
        <CartButton
          cart={cart}
          total={total}
          onOrder={handleOrder}
          clearCart={clearCart}
        />
      </div>

      {!isSearching && featuredMovies.length > 0 && (
        <Carousel
          movies={featuredMovies.slice(0, 10)}
          onAddToCart={handleAddToCart}
        />
      )}
      {!isSearching && featuredMovies.length > 0 && (
        <h2 className="text-2xl font-bold py-4 px-6">Popular Movies</h2>
      )}

      <MovieGrid
        movies={isSearching ? movies : featuredMovies}
        onAddToCart={handleAddToCart}
        cart={[]}
      />
      <Footer />
    </div>
  );
}
