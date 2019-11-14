import React, { Component } from 'react';
import { Table, Container, Button } from "react-bootstrap";
import { Guest } from "../../objects/Guest";
import 'bootstrap/dist/css/bootstrap.css';
import './GuestsTable.css'

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
            guestTableData: [],
            filterMarketing: false,
            sortTotalCount: false,
            sortTotalSpend: false
        };
        // Get the array of Guest objects from the JSON when the table is created.
        this._populateGuestsArray();
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
        this.setState({filteredData: guestData});
    }

    _renderTableData() {
        // Declare a copy of the data read from the JSON, what is actually displayed according to sort/filtering flags.
        // This allows restoration of the original state after filtering so no data is lost.
        let displayData = this.state.guestTableData;

        if(this.state.filterMarketing) {
            displayData =
                this.state.guestTableData.filter(guests => guests.allowMarketing === "true");
        }
        // Sort Total spend or visit count to show the highest at the top of the table.
        if(this.state.sortTotalCount) {
            displayData.sort((a, b) => (a.visitCount < b.visitCount) ? 1 : -1);
        } else if(this.state.sortTotalSpend) {
            displayData.sort((a, b) => (a.totalSpend < b.totalSpend) ? 1 : -1);
        }

        return (
            <tbody>
            {displayData.map((guestRow) => {
                    return <tr key={guestRow.id}>
                        <td>{guestRow.id}</td>
                        <td>{guestRow.firstName}</td>
                        <td>{guestRow.lastName}</td>
                        <td>{guestRow.email}</td>
                        <td>{guestRow.city}</td>
                        <td>{guestRow.visitCount}</td>
                        <td>{guestRow.totalSpend}</td>
                        <td>{guestRow.allowMarketing}</td>
                        <td>{(guestRow.tags || []).map(tag => {
                            return (
                                <ul>{tag}</ul>
                            );
                        })}</td>
                    </tr>;
                })}
            </tbody>
        )
    }

    render() {
        return (
            <Container fluid={true}>
                <Button onClick={() => this.setState(prevState => ({
                    filterMarketing: !prevState.filterMarketing}))}>
                    Filter Allow Marketing
                </Button>
                <Button onClick={() => this.setState(prevState => ({
                    sortTotalSpend: !prevState.sortTotalSpend}))}>
                    Toggle Sort by Total Spend
                </Button>
                <Button onClick={() =>  this.setState(prevState => ({
                    sortTotalCount: !prevState.sortTotalCount}))}>
                    Toggle Sort by Visit Count
                </Button>
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
                    {this._renderTableData()}
            </Table>
            </Container>
        )
    }
}