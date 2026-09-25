import { getState } from "./TransientState.js";
const baseURL = "https://localhost:5001/api";

export const colonyInventory = async () => {
  const state = getState();
  //if no governor has been selected it returns an empty string, this prevents an attenpt to find data to display
  if (!state.selectedGovernor) {
    return "<h2>Colony Minerals</h2>";
  }

  const governorResponse = await fetch(
    `${baseURL}/governors/${state.selectedGovernor}`,
  );
  const governor = await governorResponse.json();

  const colonyMineralsResponse = await fetch(
    `${baseURL}/colonyInventory?_expand=mineral`,
  );
  const allColonyMinerals = await colonyMineralsResponse.json();

  const matchingColonyMinerals = allColonyMinerals.filter(
    (colonyMineral) => colonyMineral.colonyId === governor.colonyId,
  );

  let html = `<h2>${governor.colony.name} Minerals</h2>
    <ul>`;
  for (const colonyMineral of matchingColonyMinerals) {
    html += `<li>${colonyMineral.quantity} tons of ${colonyMineral.mineral.name}</li>`;
  }
  html += `</ul>`;

  return html;
};
