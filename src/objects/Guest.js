/**
 * Defines a Guest as an object according to the fields in the metadata JSON.
 */
export class Guest {
    constructor(id, firstName, lastName, email, city, visitCount, totalSpend, allowMarketing, tags) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.city = city;
        this.visitCount = visitCount;
        this.totalSpend = totalSpend;
        this.allowMarketing = allowMarketing;
        this.tags = tags;
    }
}