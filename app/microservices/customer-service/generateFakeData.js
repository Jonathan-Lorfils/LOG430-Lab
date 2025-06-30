import Customer from "./models/Customer.js";
import { faker } from '@faker-js/faker';

const GenerateFakeData = {
    async createCustomer(firstName, lastName, email, phone, address) {
        try {
            const customer = await Customer.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address,
            });
            return customer;
        }
        catch (error) {
            console.error('Error creating customer:', error);
            throw error;
        }
    },

    async generate(customersCount = 5) {
        const customers = [];
        for (let i = 0; i < customersCount; i++) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const email = faker.internet.email({ firstName, lastName });
            const phone = faker.phone.number();
            const address = faker.location.streetAddress();

            const customer = await this.createCustomer(firstName, lastName, email, phone, address);
            customers.push(customer);
        }
    },
}

export default GenerateFakeData;