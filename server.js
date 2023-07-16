const express = require("express");
const app = express();
const port = 8000;
const { faker } = require('@faker-js/faker');

const createUser = () => {
    const newUser = {
        password: faker.internet.password(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
        _id: faker.database.mongodbObjectId(),
    };
    return newUser;
};

const createCompany = () => {
    const newCompany = {
        _id: faker.database.mongodbObjectId(),
        name: faker.company.name(),
        address: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country(),
        },

    };
    return newCompany;
};

const newFakeUser = createUser();
console.log(newFakeUser);

const newFakeCompany = createCompany();
console.log(newFakeCompany);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/user/new", (req, res) => {
    res.json(newFakeUser);
});

app.get("/api/company/new", (req, res) => {
    res.json(newFakeCompany);
});

app.get("/api/user/company", (req, res) => {
    const userCompany = {
        user: newFakeUser,
        company: newFakeCompany,
    };
    res.json(userCompany)
});

// app.post('/api/users/new', (req, res) => {
//     console.log(req.body);
//     res.json( {status: "ok"});
// });

app.listen(port, () => console.log("Listening on port: ${port}"));