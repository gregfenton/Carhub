import { Container } from "@mui/material";
import LoginPage from "./login";


export default function Start() {
    return (
        <Container style={{justifyContent: 'center', alignItems: "center"}}>
            <LoginPage />
        </Container>
    );
}