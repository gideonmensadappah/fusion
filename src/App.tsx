import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import DynamicForm from "./DynamicForm";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <DynamicForm />
      </div>
    </QueryClientProvider>
  );
}

export default App;
