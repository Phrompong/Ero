
import styled from "styled-components";

export const Spinner = () => (
    <Container>
        <b className="text-animation">Loading</b>
    </Container>
);

const Container = styled.div`
    width: 100%;

    .text-animation {
        animation: text-animation 1s linear infinite;
    }
      
    @keyframes text-animation {
        50% {
            opacity: 0;
        }
    }
`;
