import {
  getJournalEntries,
  sendRequest,
  deleteRequest,
  getJournalEntry,
  updateJournalEntry,
} from "./dataAccess.js";

const createElement = (elementName, cssId, cssClass, content, title = ``) => {
  let htmlElement = document.createElement(`${elementName}`);
  if (cssId.trim()) htmlElement.id = cssId.trim();
  if (cssClass.trim()) htmlElement.className = cssClass.trim();
  if (content.trim()) htmlElement.textContent = content.trim();
  if (title.trim()) htmlElement.title = title.trim();

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

const previousEntriesTitleH2 = createElement(
  `h2`,
  ``,
  `previous-entries-title`,
  `Previous Entries`
);
previousEntriesParentContainer.appendChild(previousEntriesTitleH2);

const previousEntriesCardsContainer = createElement(
  `div`,
  ``,
  `previous-entries-cards-container`,
  ``
);
previousEntriesParentContainer.appendChild(previousEntriesCardsContainer);

const renderPreviousEntries = async () => {
  removeAllChildNodes(previousEntriesCardsContainer);
  const journalEntries = await getJournalEntries();

  for (const entry of journalEntries) {
    const previousEntriesCardItem = createElement(
      `div`,
      ``,
      `previous-entries-card-item`,
      ``
    );
    previousEntriesCardsContainer.appendChild(previousEntriesCardItem);
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
      `${entry.concept}`
    );
    previousEntriesCardComponentContainer.appendChild(
      previousEntriesCardComponentTitle
    );
    const editButton = createElement(
      `span`,
      `editEntry__${entry.id}`,
      `material-symbols-outlined previous-entries-card-component-edit`,
      `edit`,
      `Edit Journal Entry`
    );
    previousEntriesCardComponentContainer.appendChild(editButton);
    const deleteButton = createElement(
      `span`,
      `deleteEntry__${entry.id}`,
      `material-symbols-outlined previous-entries-card-component-delete`,
      `delete`,
      `Delete Journal Entry`
    );
    previousEntriesCardComponentContainer.appendChild(deleteButton);
    const previousEntriesCardComponentDate = createElement(
      `div`,
      ``,
      `previous-entries-card-component-date`,
      `${entry.date}`
    );
    previousEntriesCardComponentContainer.appendChild(
      previousEntriesCardComponentDate
    );
    const previousEntriesCardComponentMood = createElement(
      `div`,
      ``,
      `previous-entries-card-component-mood`,
      `${entry.mood}`
    );
    previousEntriesCardComponentContainer.appendChild(
      previousEntriesCardComponentMood
    );
    const previousEntriesCardComponentContentDetails = createElement(
      `div`,
      ``,
      `previous-entries-card-component-content-details`,
      `${entry.entry}`
    );
    previousEntriesCardComponentContainer.appendChild(
      previousEntriesCardComponentContentDetails
    );
  }
};

renderPreviousEntries();

mainContainer.addEventListener("click", async (clickEvent) => {
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
    await sendRequest(dataToSendToAPI);

    document.querySelector("input[name='entryDate']").value = ``;
    document.querySelector("input[name='entryConceptsCovered']").value = ``;
    document.querySelector("textarea[name='entryJournalEntry']").value = ``;
    document.querySelector("select[name='entryMoodForTheDay']").value = ``;
  }
  if (clickEvent.target.id.startsWith("updateRequest__")) {
    // Get what the user typed into the form fields
    const [, journalEntryId] = clickEvent.target.id.split("__");
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
    const updateRequest = {
      id: journalEntryId,
      date: entryDate,
      concept: entryConceptsCovered,
      entry: entryJournalEntry,
      mood: entryMoodForTheDay,
    };

    // Send the data to the API for permanent storage
    await updateJournalEntry(updateRequest);

    document.querySelector("input[name='entryDate']").value = ``;
    document.querySelector("input[name='entryConceptsCovered']").value = ``;
    document.querySelector("textarea[name='entryJournalEntry']").value = ``;
    document.querySelector("select[name='entryMoodForTheDay']").value = ``;
  }
});

mainContainer.addEventListener("stateChanged", (customEvent) => {
  if (document.querySelector("input[id^='updateRequest__']")) {
    document.querySelector("input[id^='updateRequest__']").value =
      "Record Journal Entry";
    document.querySelector("input[id^='updateRequest__']").id = "submitRequest";
  }

  renderPreviousEntries();
});

mainContainer.addEventListener("click", (click) => {
  if (click.target.id.startsWith("deleteEntry__")) {
    const [, journalEntryId] = click.target.id.split("__");
    deleteRequest(parseInt(journalEntryId));
  }
});

mainContainer.addEventListener("click", async (click) => {
  if (click.target.id.startsWith("editEntry__")) {
    const [, journalEntryId] = click.target.id.split("__");
    const journalEntryToEdit = await getJournalEntry(journalEntryId);
    document.querySelector("input[name='entryDate']").value =
      journalEntryToEdit.date;
    document.querySelector("input[name='entryConceptsCovered']").value =
      journalEntryToEdit.concept;
    document.querySelector("textarea[name='entryJournalEntry']").value =
      journalEntryToEdit.entry;
    document.querySelector("select[name='entryMoodForTheDay']").value =
      journalEntryToEdit.mood;
    document.querySelector("input[id='submitRequest']").value = `Save Changes`;
    document.querySelector(
      "input[id='submitRequest']"
    ).id = `updateRequest__${journalEntryId}`;
    window.scrollTo(0, 0);
  }
});
