import { Navigate, useRoutes } from 'react-router-dom'
import { MainLayout } from '@layouts'
import { Loadable } from '@components/common/loader'
import { lazy } from 'react'

const Home = Loadable(lazy(() => import('@pages/Home')))
const Cuidador = Loadable(lazy(() => import('@pages/Cuidador')))
const Alimentacao = Loadable(lazy(() => import('@pages/Alimentacao')))
const Tecnico = Loadable(lazy(() => import('@pages/Tecnico')))
const Faxineira = Loadable(lazy(() => import('@pages/Faxineira')))
const Lavanderia = Loadable(lazy(() => import('@pages/Lavanderia')))

const Approved = Loadable(lazy(() => import('@pages/Approved')))
const Checkout = Loadable(lazy(() => import('@pages/Checkout')))

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/cuidador', element: <Cuidador /> },
        { path: '/alimentacao', element: <Alimentacao /> },
        { path: '/tecnico', element: <Tecnico /> },
        { path: '/faxineira', element: <Faxineira /> },
        { path: '/lavanderia', element: <Lavanderia /> },
      ],
    },
    {
      path: '/approved',
      element: <Approved />,
    },
    {
      path: '/checkout',
      element: <Checkout />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ])
}
