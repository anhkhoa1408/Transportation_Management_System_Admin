import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./config/configureStore";
import ErrorBoundary from "./components/ErrorHandle/ErrorHandle";
import { toast, ToastContainer } from "react-toastify";
import Layout from "./components/Layout";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ErrorBoundary>
          <Layout />
        </ErrorBoundary>
        <ToastContainer
          enableMultiContainer
          containerId="A"
          position={toast.POSITION.TOP_RIGHT}
        />
      </PersistGate>
    </Provider>
  );
}

export default App;
