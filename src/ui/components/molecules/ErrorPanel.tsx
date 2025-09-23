import { ExclamationCircleIcon } from '../atoms/Icons';

/**
 * Properties for the ErrorPanel atomic component.
 */
type Props = { 
  /** Error message to display to the user */
  message: string; 
  /** Callback function to execute when retry button is clicked */
  onRetry: () => void 
};

/**
 * Error display component that shows error messages with a retry option.
 * Provides a centered, styled error panel with an icon, error message, and retry button.
 * Used for handling and displaying error states throughout the application.
 * 
 * @param props - The component properties containing error message and retry handler
 * @returns JSX element representing a full-screen error panel with retry functionality
 */
export const ErrorPanel = ({ message, onRetry }: Props) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <ExclamationCircleIcon className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Algo salió mal</h2>
      <p className="text-gray-600 mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
      >
        Intenta de nuevo
      </button>
    </div>
  </div>
);
