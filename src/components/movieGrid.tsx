import { useState } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  price?: number;
}

interface Props {
  movies: Movie[];
  cart: Movie[]; // ให้มั่นใจว่า cart เป็น array
  onAddToCart: (movie: Movie) => void;
}

export const MovieGrid: React.FC<Props> = ({
  movies,
  cart = [],
  onAddToCart,
}) => {
  const [confirmMovie, setConfirmMovie] = useState<Movie | null>(null);

  // ฟังก์ชันเพื่อเช็คว่าในตะกร้ามีหนังนี้อยู่แล้วหรือไม่
  const isInCart = (movieId: number) => {
    console.log('Checking if movie is in cart:', movieId, cart);
    return cart.some((item) => item.id === movieId);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-6 gap-6">
        {movies.length === 0 ? (
          <p className="text-center text-gray-400 col-span-full">
            No movies found.
          </p>
        ) : (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 bg-zinc-900"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-44 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-2 left-2 right-2 z-10 text-white bg-black/60 px-2 py-1 rounded">
                <h3 className="text-sm font-semibold line-clamp-2 drop-shadow-md">
                  {movie.title}
                </h3>
                {movie.price && (
                  <p className="text-xs text-purple-400 mt-1">
                    Price: ${movie.price}
                  </p>
                )}
                <button
                  onClick={() => {
                    console.log('Clicked Add to Cart for movie:', movie);
                    setConfirmMovie(movie);
                  }}
                  disabled={isInCart(movie.id)} // ปิดปุ่มหากหนังมีอยู่ในตะกร้าแล้ว
                  className={`mt-2 w-full text-xs py-1 rounded ${
                    isInCart(movie.id)
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {isInCart(movie.id) ? 'Already in Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {confirmMovie && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg max-w-sm w-full shadow-lg text-white">
            <h2 className="text-lg font-semibold mb-4">
              Add "{confirmMovie.title}" to your cart?
            </h2>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmMovie(null)}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onAddToCart(confirmMovie);
                  setConfirmMovie(null);
                }}
                className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
