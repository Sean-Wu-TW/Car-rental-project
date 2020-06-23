import React from 'react';
import styled from 'styled-components';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';

const StylesJumbo = styled.div`
        .jumbo {
            background-color: white;
            background-size: cover;
            color:black;
            height: 50px;
        }

`;

export default () => {
    return (

        <StylesJumbo>

            <Jumbo fluid className="jumbo">
                <div className="overlay"></div>
                <Container>
                    <h1>Welcome to Codeman car rental services!</h1>
                </Container>
            </Jumbo>
        </StylesJumbo>

    );
}