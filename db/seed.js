const Transaction = require("../models/Transaction.model")
const mongoose = require("mongoose")
require("dotenv/config")

const getRandomNumber = require("../utils/getRandomNumber")
const randomDate = require("../utils/randomDate")
const getRandom = require("../utils/getRandom")

mongoose.connect(process.env.MONGODB_URI)

const titles = [
    "App store",
    "Levis",
    "Raclette",
    "Drinks",
    "Party",
    "Masks",
    "Watch band",
    "Phone protection",
    "Keyboard",
    "Vinyls",
    "Pharmacy",
    "Bottle",
    "E cig",
    "E liquid",
    "Cigarettes",
]

const categories = [
    "party",
    "entertainment",
    "groceries",
    "restaurant",
    "clothes",
    "subscription",
    "utils",
]

// Salaries
const salariesTitles = [
    "Jan 22",
    "Dec 21",
    "Nov 21",
    "Oct 21",
    "Sep 21",
    "Aug 21",
    "Jul 21",
    "Jun 21",
]

const salariesDates = [
    "2022-02-02",
    "2022-01-02",
    "2021-12-02",
    "2021-11-02",
    "2021-10-02",
    "2021-09-02",
    "2021-08-02",
    "2021-07-02",
]

let fakeSalaries = []

for (let i = 0; i < salariesTitles.length; i++) {
    fakeSalaries.push({
        title: `Salary ${salariesTitles[i]}`,
        amount: 2503,
        date: salariesDates[i],
        type: "income",
        category: "salaries",
        dateAdded: salariesDates[i],
        dateShort: "",
    })
}

// Rents
const rentTitles = [
    "Jan 22",
    "Dec 21",
    "Nov 21",
    "Oct 21",
    "Sep 21",
    "Aug 21",
    "Jul 21",
]

const rentDates = [
    "2022-01-01",
    "2021-12-01",
    "2021-11-01",
    "2021-10-01",
    "2021-09-01",
    "2021-08-01",
    "2021-07-01",
]

let fakeRents = []

for (let i = 0; i < rentTitles.length; i++) {
    fakeRents.push({
        title: `Rent ${rentTitles[i]}`,
        amount: 500,
        date: rentDates[i],
        type: "expense",
        category: "rent",
        dateAdded: rentDates[i],
        dateShort: "",
    })
}

// Other expenses
let fakeExpenses = []

for (let i = 0; i < titles.length; i++) {
    fakeExpenses.push({
        title: titles[i],
        amount: getRandomNumber(100),
        date: randomDate(),
        type: "expense",
        category: getRandom(categories),
        dateAdded: randomDate(),
        dateShort: "",
    })
}

Transaction.insertMany(fakeSalaries)
    .then(salaries =>
        console.log(`Success, ${salaries.length} salaries were added to the db`)
    )
    .catch(err => console.log(err))

Transaction.insertMany(fakeRents)
    .then(rents =>
        console.log(`Success, ${rents.length} rents were added to the db`)
    )
    .catch(err => console.log(err))

Transaction.insertMany(fakeExpenses)
    .then(expenses => {
        console.log(`Success, ${expenses.length} other expenses were added to the db`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
