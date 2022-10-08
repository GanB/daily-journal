const API = "http://localhost:4010";
const applicationState = { journalEntries: [] };

export const fetchJournalEntries = async () => {
  const dataFetch = await fetch(`${API}/journalEntries`);
  const journalEntries = await dataFetch.json();
  // Store the external state in application state
  applicationState.journalEntries = journalEntries;
};

export const getJournalEntries = async () => {
  await fetchJournalEntries();
  return applicationState.journalEntries.map((data) => ({ ...data }));
};

export const sendRequest = async (journalEntryRequest) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(journalEntryRequest),
  };

  const mainContainer = document.querySelector("#container");
  const response = await fetch(`${API}/journalEntries`, fetchOptions);
  const responseJson = await response.json();
  mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  return responseJson;
};

export const deleteRequest = async (id) => {
  const mainContainer = document.querySelector("#container");
  await fetch(`${API}/journalEntries/${id}`, { method: "DELETE" });
  mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
};

export const getJournalEntry = async (id) => {
  // const mainContainer = document.querySelector("#container");
  return await (
    await fetch(`${API}/journalEntries/${id}`, { method: "GET" })
  ).json();
  // mainContainer.dispatchEvent(new CustomEvent("editModal"));
};

export const updateJournalEntry = async (journalEntryRequest) => {
  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(journalEntryRequest),
  };

  const mainContainer = document.querySelector("#container");
  const response = await fetch(
    `${API}/journalEntries/${journalEntryRequest.id}`,
    fetchOptions
  );
  const responseJson = await response.json();
  mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  return responseJson;
};
