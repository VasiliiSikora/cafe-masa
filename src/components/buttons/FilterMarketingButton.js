import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import './Buttons.css'

export default class FilterMarketingButton extends Component {
    render() {
        return (
            <Button>Filter by allow marketing</Button>
        )
    }
}