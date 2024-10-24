import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import Header from './components/Header/index.tsx'



createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <div className='flex'>
      <Header />
      <RouterProvider router={router} />
    </div>

  </Provider>

)
