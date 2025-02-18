const Loading = () => {
  return (
    <p
      className="text-gray-500 text-center grid place-items-center h-screen animate-pulse"
      aria-live="polite"
    >
      ⏳ Just a moment… Good things take time.
    </p>
  );
};

export default Loading;
