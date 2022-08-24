const journalEntries = [
  {
    id: 1,
    date: "08/01/2022",
    concept: "HTML 5 and CSS Styling",
    entry: "I was learning about CSS styling selectors",
    mood: "Happy",
  },
  {
    id: 2,
    date: "08/02/2022",
    concept: "Complex Flexbox",
    entry:
      "I tried to have an element in my Flexbox layout also be another Flexbox layout. It hurt my brain. I hate Steve.",
    mood: "Excited",
  },
  {
    id: 3,
    date: "08/03/2022",
    concept: "CSS Grid layout",
    entry:
      "I practiced some CSS grid layout and HTML. It was very interesting to learn about grid layout.",
    mood: "Happy",
  },
  {
    id: 4,
    date: "08/04/2022",
    concept: "Javascript basics",
    entry: "I was learning and practising javascript basics.",
    mood: "Happy",
  },
  {
    id: 5,
    date: "08/04/2022",
    concept: "Javascript Loops",
    entry: "I was practising javascript basics and loops",
    mood: "Excited",
  },
  {
    id: 6,
    date: "08/05/2022",
    concept: "Javascript Data Structures",
    entry: "Learning about Javascript data structures - arrays and objects",
    mood: "Happy",
  },
  {
    id: 7,
    date: "08/05/2022",
    concept: "Parctising Daily Journal part 2",
    entry: "Implementing javascript in daily journal project",
    mood: "Excited",
  },
];

console.log("-----------All Entries------------------------------");

for (const entry of journalEntries) {
  console.log(entry);
}

console.log("-----------Title------------------------------");

for (const entry of journalEntries) {
  console.log("title: " + entry.concept);
}

console.log("-----------Odd Entries------------------------------");
for (const entry of journalEntries) {
  if (entry.id % 2 !== 0) {
    console.log(entry);
  }
}

// Intro to Data Relationship Practice

console.log("--------Intro to Data Relationship Practice-------------");

const states = [
  {
    id: 1,
    stateCode: "IL",
    stateName: "Illinois",
  },
  {
    id: 2,
    stateCode: "TN",
    stateName: "Tennessee",
  },
  {
    id: 3,
    stateCode: "CA",
    stateName: "California",
  },
  {
    id: 4,
    stateCode: "MN",
    stateName: "Minnesota",
  },
  {
    id: 5,
    stateCode: "FL",
    stateName: "Florida",
  },
];

const cities = [
  {
    id: 1,
    cityName: "Chicago",
    stateId: "1",
  },
  {
    id: 2,
    cityName: "Nashville",
    stateId: "2",
  },
  {
    id: 3,
    cityName: "Los Angeles",
    stateId: "3",
  },
  {
    id: 4,
    cityName: "Minneapolis",
    stateId: "4",
  },
  {
    id: 5,
    cityName: "Memphis",
    stateId: "2",
  },
  {
    id: 6,
    cityName: "Champagne",
    stateId: "1",
  },
  {
    id: 7,
    cityName: "San Francisco",
    stateId: "3",
  },
  {
    id: 8,
    cityName: "Knoxville",
    stateId: "2",
  },
  {
    id: 9,
    cityName: "Orlando",
    stateId: "5",
  },
];

for (const city of cities) {
  console.log(`${city.cityName}, ${states[city.stateId].stateCode}`);
}
