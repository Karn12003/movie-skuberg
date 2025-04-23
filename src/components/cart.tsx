import { Movie } from '../types/movie';

interface Props {
  cart: Movie[];
  updatePrice: (id: number, price: number) => void;
  clearCart: () => void;
  total: number;
  onOrder: () => void;
}

export const Cart: React.FC<Props> = ({
  cart,
  updatePrice,
  clearCart,
  total,
  onOrder,
}) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl">Cart</h2>
      <div className="mt-4">
        {cart.map((movie) => (
          <div
            key={movie.id}
            className="flex justify-between items-center mb-4"
          >
            <span>{movie.title}</span>
            <input
              type="number"
              value={movie.price}
              onChange={(e) => updatePrice(movie.id, +e.target.value)}
              className="w-16 p-1 bg-zinc-900 text-white"
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span>Total: ${total.toFixed(2)}</span>
        <button
          onClick={onOrder}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
        >
          Checkout
        </button>
      </div>
      <button onClick={clearCart} className="mt-4 text-red-500">
        Clear Cart
      </button>
    </div>
  );
};
