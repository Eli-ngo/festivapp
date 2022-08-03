import Navbar from "./Navbar"
import toast, { Toaster } from "react-hot-toast"

export default function Layout({ children }) {
    return (
        <>
        <Navbar/>
        <Toaster position="bottom-center" reverseOrder={false}/>
            { children }
        </>
    )
}