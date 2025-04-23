interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  countdown: number;
  discount: number;
}

export const CheckoutPopup: React.FC<Props> = ({
  open,
  onOpenChange,
  countdown,
  discount,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-zinc-900 p-6 rounded-xl text-white max-w-sm w-full shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Checkout</h3>
        <p className="mb-4 text-purple-300">
          Please scan the QR code to pay. <br />
          This popup will close in <strong>{countdown}</strong> seconds.
        </p>

        {countdown === 0 ? (
          <div className="text-red-500 text-xl font-semibold mb-4">
            Time's up! Your order has been canceled.
          </div>
        ) : (
          <div className="flex justify-center mb-4">
            <img src="https://hexdocs.pm/qr_code/docs/qrcode.svg" />
          </div>
        )}

        {discount > 0 && (
          <div className="text-sm text-purple-400 mb-4">
            You received a {discount * 100}% discount on your order!
          </div>
        )}

        <button
          onClick={() => onOpenChange(false)}
          className="w-full mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};
