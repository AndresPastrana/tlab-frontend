const ErrorMessage = ({
  errors,
}: {
  errors: string[] | string | undefined;
}) => {
  return (
    <div
      id="customer-error"
      aria-live="polite"
      className=" text-sm text-red-500"
    >
      {errors &&
        Array.isArray(errors) &&
        errors.map((error) => <p key={error}>{error}</p>)}
      {errors && <p key={Date.now()}>{errors}</p>}
    </div>
  );
};

export default ErrorMessage;
