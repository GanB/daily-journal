import { getJournalEntries } from "./entries.js";
import { splitArray } from "./utilities.js";

const createElement = (elementName, cssId, cssClass, content) => {
  let htmlElement = document.createElement(`${elementName}`);
  if (cssId.trim()) htmlElement.id = cssId.trim();
  if (cssClass.trim()) htmlElement.className = cssClass.trim();
  if (content.trim()) htmlElement.textContent = content.trim();

  return htmlElement;
};

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

const journalEntries = getJournalEntries();

const chunckedEntries = splitArray(journalEntries, 3, false);
// console.log(chunckedEntries);

for (let i = 0; i < chunckedEntries.length; i++) {
  // console.log(`main loop ${chunckedEntries.length}`);
  // console.log(`main loop iter:${i} item: ${chunckedEntries[i]}`);

  const previousEntriesCardItemsContainer = createElement(
    `div`,
    ``,
    `previous-entries-card-items-container`,
    ``
  );
  previousEntriesCardsContainer.appendChild(previousEntriesCardItemsContainer);

  for (let j = 0; j < chunckedEntries[i].length; j++) {
    // console.log(chunckedEntries[i].length);
    // console.log(chunckedEntries[i][j]);
    // console.log(`inner loop iter: ${j} item: ${chunckedEntries[j]}`);

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
    previousEntriesCardItem.appendChild(previousEntriesCardComponentContainer);

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

const previousEntriesSidebar = createElement(
  `div`,
  ``,
  `previous-entries-sidebar`,
  ``
);
previousEntriesParentContainer.appendChild(previousEntriesSidebar);
