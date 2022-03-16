import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./config/configureStore";
import ErrorBoundary from "./components/ErrorHandle/ErrorHandle";
import { toast, ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { RenderRoutes } from "./routes/RenderRoutes";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <RenderRoutes />
            </QueryClientProvider>
          </ErrorBoundary>
          <ToastContainer
            enableMultiContainer
            containerId="A"
            position={toast.POSITION.TOP_RIGHT}
            autoClose={500}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            newestOnTop={false}
          />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
