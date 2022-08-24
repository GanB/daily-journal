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
      "I tried to have an element in my Flexbox layout also be another Flexbox layout.",
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

export const getJournalEntries = () => {
  return journalEntries.map((entry) => ({ ...entry }));
};
