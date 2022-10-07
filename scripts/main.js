// import { getJournalEntries } from "./entries.js";
import { getJournalEntries, sendRequest } from "./dataAccess.js";
import { splitArray } from "./utilities.js";

const createElement = (elementName, cssId, cssClass, content) => {
  let htmlElement = document.createElement(`${elementName}`);
  if (cssId.trim()) htmlElement.id = cssId.trim();
  if (cssClass.trim()) htmlElement.className = cssClass.trim();
  if (content.trim()) htmlElement.textContent = content.trim();

  return htmlElement;
};

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const mainContainer = document.querySelector("#container");
const previousEntriesParent = document.getElementById(`entries`);
const previousEntriesParentContainer = createElement(
  `div`,
  ``,
  `previous-entries-parent-container`,
  ``
);
previousEntriesParent.appendChild(previousEntriesParentContainer);

const previousEntriesTitle = createElement(
  `div`,
  ``,
  `previous-entries-title`,
  ``
);
previousEntriesParentContainer.appendChild(previousEntriesTitle);

const previousEntriesTitleH2 = createElement(`h2`, ``, ``, `Previous Entries`);
previousEntriesTitle.appendChild(previousEntriesTitleH2);

const previousEntriesCardsContainer = createElement(
  `div`,
  ``,
  `previous-entries-cards-container`,
  ``
);
previousEntriesParentContainer.appendChild(previousEntriesCardsContainer);

const renderPreviousEntries = async () => {
  // console.log(chunckedEntries);
  removeAllChildNodes(previousEntriesCardsContainer);
  const journalEntries = await getJournalEntries();
  const chunckedEntries = splitArray(journalEntries, 3, false);

  for (let i = 0; i < chunckedEntries.length; i++) {
    // console.log(`main loop ${chunckedEntries.length}`);
    // console.log(`main loop iter:${i} item: ${chunckedEntries[i]}`);

    const previousEntriesCardItemsContainer = createElement(
      `div`,
      ``,
      `previous-entries-card-items-container`,
      ``
    );
    previousEntriesCardsContainer.appendChild(
      previousEntriesCardItemsContainer
    );

    for (let j = 0; j < chunckedEntries[i].length; j++) {
      const previousEntriesCardItem = createElement(
        `div`,
        ``,
        `previous-entries-card-item${j + 1}`,
        ``
      );
      previousEntriesCardItemsContainer.appendChild(previousEntriesCardItem);

      const previousEntriesCardComponentContainer = createElement(
        `div`,
        ``,
        `previous-entries-card-component-container`,
        ``
      );
      previousEntriesCardItem.appendChild(
        previousEntriesCardComponentContainer
      );

      const previousEntriesCardComponentTitle = createElement(
        `div`,
        ``,
        `previous-entries-card-component-title`,
        `${chunckedEntries[i][j].concept}`
      );
      previousEntriesCardComponentContainer.appendChild(
        previousEntriesCardComponentTitle
      );

      const previousEntriesCardComponentDate = createElement(
        `div`,
        ``,
        `previous-entries-card-component-date`,
        `${chunckedEntries[i][j].date}`
      );
      previousEntriesCardComponentContainer.appendChild(
        previousEntriesCardComponentDate
      );

      const previousEntriesCardComponentMood = createElement(
        `div`,
        ``,
        `previous-entries-card-component-mood`,
        `${chunckedEntries[i][j].mood}`
      );
      previousEntriesCardComponentContainer.appendChild(
        previousEntriesCardComponentMood
      );

      const previousEntriesCardComponentContentDetails = createElement(
        `div`,
        ``,
        `previous-entries-card-component-content-details`,
        `${chunckedEntries[i][j].entry}`
      );
      previousEntriesCardComponentContainer.appendChild(
        previousEntriesCardComponentContentDetails
      );
    }
  }
};
const previousEntriesSidebar = createElement(
  `div`,
  ``,
  `previous-entries-sidebar`,
  ``
);
previousEntriesParentContainer.appendChild(previousEntriesSidebar);

renderPreviousEntries();

mainContainer.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "submitRequest") {
    // Get what the user typed into the form fields
    const entryDate = document.querySelector("input[name='entryDate']").value;
    const entryConceptsCovered = document.querySelector(
      "input[name='entryConceptsCovered']"
    ).value;
    const entryJournalEntry = document.querySelector(
      "textarea[name='entryJournalEntry']"
    ).value;
    const entryMoodForTheDay = document.querySelector(
      "select[name='entryMoodForTheDay']"
    ).value;

    // Make an object out of the user input
    const dataToSendToAPI = {
      date: entryDate,
      concept: entryConceptsCovered,
      entry: entryJournalEntry,
      mood: entryMoodForTheDay,
    };

    // Send the data to the API for permanent storage
    sendRequest(dataToSendToAPI);
  }
});

mainContainer.addEventListener("stateChanged", (customEvent) => {
  renderPreviousEntries();
});
