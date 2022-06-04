import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import Button from "./Button";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="error-capture flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl">Something went wrong</h2>
      <pre>{error.message}</pre>
      <Button>Try again</Button>
    </div>
  );
}

function ErrorCapture({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export default ErrorCapture;
