import React from "react";
import { useNavigate } from "react-router-dom";

import { ButtonDark, Container } from "../../components/Utils/Utils";

const DeactivationSuccessPage = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <h3>Your account has been successfully deactivated</h3>
            <ButtonDark onClick={() => navigate("/")}>Go to Home Page</ButtonDark>
        </Container>
    )
}

export default DeactivationSuccessPage;