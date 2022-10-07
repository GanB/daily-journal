const API = "http://localhost:4010";

export const fetchJournalEntries = async () => {
  const dataFetch = await fetch(`${API}/journalEntries`);
  const journalEntries = await dataFetch.json();
  // Store the external state in application state
  applicationState.journalEntries = journalEntries;
};

const applicationState = { journalEntries: [] };

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
  await fetch(`${API}/requests/${id}`, { method: "DELETE" });
  mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
};

export const fetchPlumbers = async () => {
  const dataFetch = await fetch(`${API}/plumbers`);
  const plumbers = await dataFetch.json();
  applicationState.plumbers = plumbers;
};

export const getPlummers = async () => {
  await fetchPlumbers();
  return applicationState.plumbers.map((data) => ({ ...data }));
};

export const saveCompletion = async (data) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const mainContainer = document.querySelector("#container");
  const response = await fetch(`${API}/completions`, fetchOptions);
  const responseJson = await response.json();
  mainContainer.dispatchEvent(new CustomEvent("requestCompleted"));
  return responseJson;
};

export const fetchCompletions = async () => {
  const dataFetch = await fetch(`${API}/completions`);
  const serviceRequests = await dataFetch.json();
  applicationState.completions = serviceRequests;
};

export const getCompletions = async () => {
  await fetchCompletions();
  return applicationState.completions.map((data) => ({ ...data }));
};
