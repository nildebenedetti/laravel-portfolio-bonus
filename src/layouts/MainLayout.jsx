import { Outlet } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function MainLayout() {
    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <main className="flex-grow-1 d-flex flex-column mx-2 align-items-center w-100">
                    <Outlet />
                </main>
            <Footer />
            </div>
        </>
    );
}

export default MainLayout;