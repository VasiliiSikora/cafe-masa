import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

/**
 * A simple header displayed at the top of the site.
 * As we only have a single page with one table, this just displays one option as 'Home'.
 */
export default class Header extends Component {
    render() {
        return (
            <Nav defaultActiveKey="/home" as="ul">
                <Nav.Item as="li">
                    <Nav.Link href="#home">Home</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
}