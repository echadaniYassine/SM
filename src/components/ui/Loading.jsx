// components/ui/Loading.jsx
export default function Loading({ message = "Loading...", size = "default" }) {
  const sizeClasses = {
    small: "h-6 w-6",
    default: "h-12 w-12",
    large: "h-16 w-16"
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className={`animate-spin rounded-full border-b-2 border-gray-900 dark:border-white mx-auto ${sizeClasses[size]}`}></div>
        <p className="mt-4 text-gray-600 dark:text-white">{message}</p>
      </div>
    </div>
  )
}

// Alternative: Inline loading (for smaller sections)
export function InlineLoading({ message = "Loading...", size = "small" }) {
  const sizeClasses = {
    small: "h-4 w-4",
    default: "h-6 w-6",
    large: "h-8 w-8"
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-b-2 border-gray-900 dark:border-white ${sizeClasses[size]}`}></div>
      {message && <span className="ml-2 text-gray-600 dark:text-white">{message}</span>}
    </div>
  )
}

// Error component too
export function ErrorDisplay({ title = "Error", message, onRetry }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center text-red-600 dark:text-red-400 max-w-md">
        <p className="text-xl font-semibold">{title}</p>
        {message && <p className="mt-2">{message}</p>}
        {onRetry && (
          <button 
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}