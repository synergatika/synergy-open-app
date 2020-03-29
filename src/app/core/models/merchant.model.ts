interface Address {
    street: string;
    city: string;
    postCode: string;
    coordinates: string[];
}

interface Contact {
    phone: string;
    websiteURL: string;
}

export interface Merchant {
    _id: string;
    email?: string;

    name: string;
		slug: string;
    imageURL: string;
    sector: string;

    contact: Contact;
    address: Address;
		timetable: string;
		description?: string;
    createdAt?: Date;
}