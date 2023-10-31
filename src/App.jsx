import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "../src/assets/style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { AuthProvider } from "./users/UsersContext";
import Welcome from "./pages/Welcome";
import { QuoteProvider } from "./components/contexts/QuoteContext";
import QuotesPage from "./pages/QuotesPage";
import Quote from "./pages/Quote";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <QuoteProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/newQuote" element={<QuotesPage />} />
              <Route path="/createQuote" element={<Quote />} />

              <Route path="login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QuoteProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "$main",
            color: "$light",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
