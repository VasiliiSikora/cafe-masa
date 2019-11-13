import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Table} from "react-bootstrap";

import GuestDataJson from '../../content/Guests'

/**
 * Renders the information in the Guests table from the JSON information.
 */
export default class GuestsTable extends Component {

    constructor(props) {
        super(props);
        this.state = { guestData: GuestDataJson }
    }

    _renderTableRows() {
        let guestsRows = [];
    }

    render() {
        return (
            <Table striped responsive bordered>
                <thead>
                    <tr></tr>
                </thead>
            </Table>
        )
    }
}