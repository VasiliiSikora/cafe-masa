import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Table } from "react-bootstrap";
import { Guest } from "../../objects/Guest";

import GuestDataJson from '../../content/Guests'

/**
 * Renders the information in the Guests table from the JSON information.
 */
export default class GuestsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // The raw JSON data from the JSON Guests file.
            guestRawData: GuestDataJson,
            // An array of Guest objects converted from the JSON data for populating the table.
            guestTableData: []
        }
    }

    /**
     * Populate the guestTableData state object with Guest objects pulled from the JSON.
     * @private
     */
    _populateGuestsArray() {
        const guestData = this.state.guestRawData.data;
        for(let i = 0; i < guestData.length; i++) {
            const guest = guestData[i];
            this.state.guestTableData.push(
                new Guest(guest.id, guest.first_name, guest.last_name, guest.email, guest.city,
                          guest.visit_count, guest.total_spend, guest.allow_marketing.toString(), guest.tags));
        }
    }

    render() {
        // Get the array of Guest objecst from the JSON before rendering.
        this._populateGuestsArray();
        return (
            <Table striped responsive bordered>
                <thead>
                    <tr>
                        <th>Guest ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Visits</th>
                        <th>Total Spend</th>
                        <th>Allow Marketing</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.guestTableData.map((guestRow) => {
                        return <tr key={guestRow.id}>
                            <td>{guestRow.id}</td>
                            <td>{guestRow.firstName}</td>
                            <td>{guestRow.lastName}</td>
                            <td>{guestRow.email}</td>
                            <td>{guestRow.city}</td>
                            <td>{guestRow.visitCount}</td>
                            <td>{guestRow.totalSpend}</td>
                            <td>{guestRow.allowMarketing}</td>
                            <td>{guestRow.tags}</td>
                        </tr>;
                    })}
                </tbody>
            </Table>
        )
    }
}