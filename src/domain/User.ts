class User {
    id: string | undefined;
    name: string;
    username: string;
    email: string;
    phone: string;
    address: Address;
    company: Company;
    password: string;
    role: 'teacher' | 'admin' | 'student';

    constructor(username: string, password: string, role: 'teacher' | 'admin' | 'student', name: string, email: string, phone: string, address: Address, company: Company, id?: string,) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.company = company;
    }
}

class Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;

    constructor(street: string, suite: string, city: string, zipcode: string, geo: Geo) {
        this.street = street;
        this.suite = suite;
        this.city = city;
        this.zipcode = zipcode;
        this.geo = geo;
    }
}

class Geo {
    lat: string;
    lng: string;

    constructor(lat: string, lng: string) {
        this.lat = lat;
        this.lng = lng;
    }
}

class Company {
    name: string;
    catchPhrase: string;
    bs: string;

    constructor(name: string, catchPhrase: string, bs: string) {
        this.name = name;
        this.catchPhrase = catchPhrase;
        this.bs = bs;
    }
}

export default User;
