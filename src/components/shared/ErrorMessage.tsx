const ErrorMessage = ({ errors = [] }: { errors: string[] | undefined }) => {
  return (
    <div
      id="customer-error"
      aria-live="polite"
      className="sm:ml-[110px]  max-w-lg mt-2 text-sm text-red-500"
    >
      {errors && errors.map((error) => <p key={error}>{error}</p>)}
    </div>
  );
};

export default ErrorMessage;
