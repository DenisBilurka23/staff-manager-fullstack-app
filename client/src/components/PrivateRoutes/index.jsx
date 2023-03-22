import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = ({ auth }) => (auth ? <Outlet /> : <Navigate to="/sign-in" />)

export default PrivateRoutes
