import useUserContext from "../../context/UserContext";

import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function TopNavbar() {
  const user = useUserContext();

  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top">
      <Container className="mx-5" fluid>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-md-0">
            <Nav.Link href="/discussion">Discussion</Nav.Link>
            <NavDropdown title="Game" id="game-nav-dropdown">
              <NavDropdown.Item href="#candy-crush">
                Candy Crush
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto my-2 my-md-0">
            {user ? (
              <>
                <Navbar.Text>{user.username}</Navbar.Text>
                <Nav.Link href="/logout">Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
