import { SocketProvider } from '../../../context/socket/socketProvider'
import { Outlet } from "react-router-dom"
function SocketOutlet() {
  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  )
}

export default SocketOutlet