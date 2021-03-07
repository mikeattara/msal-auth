import { useContext, useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import AuthNavItem from '../auth-nav-item';
import '@fortawesome/fontawesome-free/css/all.css';
import { AuthContext } from '../../../contexts/auth-context';

interface NavBarState {
  isOpen: boolean;
}

export default function NavBar() {
  const [state, setState] = useState<NavBarState>({isOpen: false});
  const {isAuthenticated} = useContext(AuthContext);

  const toggle = () => {
    setState({
      isOpen: !state.isOpen
    });
  }

  // Only show calendar nav item if logged in
  let calendarLink = null;
  if (isAuthenticated) {
    calendarLink = (
      <NavItem>
        <RouterNavLink to="/calendar" className="nav-link" exact>Calendar</RouterNavLink>
      </NavItem>
    );
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="top">
        <Container>
          <NavbarBrand href="/">React Graph Tutorial</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <RouterNavLink to="/" className="nav-link" exact>Home</RouterNavLink>
              </NavItem>
              {calendarLink}
            </Nav>
            <Nav className="justify-content-end" navbar>
              <NavItem>
                <NavLink href="https://developer.microsoft.com/graph/docs/concepts/overview" target="_blank">
                  <i className="fas fa-external-link-alt mr-1"></i>
                  Docs
                </NavLink>
              </NavItem>
              <AuthNavItem />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}