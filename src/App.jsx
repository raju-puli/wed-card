import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { Routes, Route } from 'react-router-dom'  // Only Routes and Route
import PageNotFound from './lib/PageNotFound';
import Home from './pages/Home';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App