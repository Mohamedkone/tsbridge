import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Auth0ProviderWithNavigate } from './auth0-provider-with-navigate.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import { store } from './store/index.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
		<BrowserRouter>
			<Auth0ProviderWithNavigate>
				<AuthProvider>
						<App />
				</AuthProvider>
			</Auth0ProviderWithNavigate>
		</BrowserRouter>
	</Provider>
)
