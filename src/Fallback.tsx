type FallbackProps = { error: Error; resetErrorBoundary: () => void }

export const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
    console.error("error", error)

    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }}>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}
