import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Toaster } from "react-hot-toast";
import { Container } from "react-bootstrap";

export function Root() {
    return (
        <>
            <Header />
            <Container><main>
                <Outlet />
            </main></Container>
            <Toaster />
        </>
    )
}