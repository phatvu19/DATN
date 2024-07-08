import { persistor, store } from "@/redux/store/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Provider as ReduxProvider } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { PersistGate } from "redux-persist/integration/react"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0,
        },
    },
})

type AppProviderProps = {
    children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReduxProvider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    {children}
                    <ToastContainer />
                </PersistGate>
            </ReduxProvider>
        </QueryClientProvider>
    )
}
