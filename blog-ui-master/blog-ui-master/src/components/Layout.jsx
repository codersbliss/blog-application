import { Outlet } from 'react-router-dom'
import PrimaryNavbar from './PrimaryNavbar'
const Layout = () => {
  return (
    <>
        <PrimaryNavbar/>
        <Outlet/>
    </>
  )
}

export default Layout
