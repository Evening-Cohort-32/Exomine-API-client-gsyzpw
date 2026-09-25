import { getState, purchaseMaterial } from "./TransientState.js";
const baseURL = "https://localhost:5001/api";

export const makePurchase = async () => {
  let currentState = getState();
  let isNewInventory = false;

  let selectedGovernor = await fetch(
    `${baseURL}/governors/${currentState.selectedGovernor}`,
  ).then((res) => res.json());

  const allColonyMinerals = await fetch(`${baseURL}/colonyInventory`).then(
    (res) => res.json(),
  );

  let selectedColonyMinerals = {};

  for (const colonyMineral of allColonyMinerals) {
    debugger;
    if (
      colonyMineral.colonyId === selectedGovernor.colonyId &&
      parseInt(colonyMineral.mineralId) === currentState.selectedMineral
    ) {
      selectedColonyMinerals = colonyMineral;
      isNewInventory = false;
      break;
    } else isNewInventory = true;
  }

  purchaseMaterial(
    selectedColonyMinerals,
    selectedGovernor.colonyId,
    isNewInventory,
  );
};
