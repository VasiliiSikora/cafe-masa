import React, { Component } from 'react';
import { Table, Container, Button } from "react-bootstrap";
import { Guest } from "../../objects/Guest";
import 'bootstrap/dist/css/bootstrap.css';
import './GuestsTable.css'

import GuestDataJson from '../../content/Guests'

/**
 * Renders the information in the Guests table from the JSON information.
 * Also defines filtering and sorting functions.
 * As much as possible, data has been ingested automatically using private functions.
 */
export default class GuestsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // The raw JSON data from the JSON Guests file.
            guestRawData: GuestDataJson,
            // An array of Guest objects converted from the JSON data for filtering/sorting.
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
    }

    /**
     * Renders the table headings from the values in the JSON metadata section.
     * This means that if the JSON data changes, the table will as well (however additional fields will have to be
     * populated by adding them to the Guest.js object and rendering them in renderTableData).
     * This is based off the assumption that this metadata provides each field in the data 1 to 1.
     * @returns {*} The render of table headings as ingested from table headers.
     * @private
     */
    _renderTableHeaders() {
        const guestDataHeaders = this.state.guestRawData["meta-data"].payload;
        const guestTableHeaders = [];
        for(let i = 0; i < guestDataHeaders.length; i++) {
            const payloadField = guestDataHeaders[i];
            guestTableHeaders.push(payloadField.label);
        }

        return (
            <thead>
            <tr>
                {guestTableHeaders.map(label => {
                    return <th key={label}>{label}</th>
                })}
            </tr>
            </thead>
        )
    }

    /**
     * Renders all data in the table, according to the state flags set with toggle buttons.
     * @returns {*} the rendered JSON data.
     * @private
     */
    _renderTableData() {
        // Declare a copy of the data read from the JSON, what is actually displayed according to sort/filtering flags.
        // This allows restoration of the original state after filtering so no data is lost.
        let displayData = this.state.guestTableData;

        if(this.state.filterMarketing) {
            displayData = this.state.guestTableData.filter(guests => guests.allowMarketing === "true");
        }
        // Sort Total spend or visit count to show the highest at the top of the table (descending).
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

    // Render the table itself and filtering/sorting buttons.
    render() {
        return (
            <Container fluid={true} align={"left"}>
                <div className={"button-filters"}>
                    <b>Apply Filters:</b>
                    <Button onClick={() => this.setState(prevState => ({
                        filterMarketing: !prevState.filterMarketing}))}>
                        Filter Marketing Guests
                    </Button>
                    <Button onClick={() => this.setState(prevState => ({
                        sortTotalSpend: !prevState.sortTotalSpend}))}>
                        Toggle Sort by Total Spend
                    </Button>
                    <Button onClick={() =>  this.setState(prevState => ({
                        sortTotalCount: !prevState.sortTotalCount}))}>
                        Toggle Sort by Visit Count
                    </Button>
                </div>
                <div>
                    <b>Applied Filters: </b>
                    <p>
                        Filter Marketing: <b>{this.state.filterMarketing.toString()}</b> <br/>
                        Sort Total Spend: <b>{this.state.sortTotalSpend.toString()}</b><br/>
                        Sort Visit Count: <b>{this.state.sortTotalCount.toString()}</b>
                    </p>
                </div>
            <Table striped responsive bordered>
                {this._renderTableHeaders()}
                {this._renderTableData()}
            </Table>
            </Container>
        )
    }
}