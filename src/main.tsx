// src/main.tsx
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.tsx'
import { store } from './store/index.ts'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')!).render(
	<ClerkProvider 
    publishableKey={PUBLISHABLE_KEY} 
    afterSignOutUrl="/" 
    touchSession={false}
  >

  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </Provider>
  </ClerkProvider>
)