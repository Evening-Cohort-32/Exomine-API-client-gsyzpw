import { state } from "./TransientState.js";
const baseURL = "https://localhost:5001/api";

export const FacilityMinerals = async () => {
  const facilityMineralsResponse = await fetch(`${baseURL}/facilityInventory`);
  const facilityMinerals = await facilityMineralsResponse.json();

  const mineralsResponse = await fetch(`${baseURL}/minerals`);
  const minerals = await mineralsResponse.json();

  const availableMinerals = facilityMinerals.filter((facilityMineral) => {
    return (
      facilityMineral.miningFacilityId === parseInt(state.selectedFacility) &&
      facilityMineral.saleQuantity > 0
    );
  });

  // if no facility selected yet show empty message
  if (availableMinerals.length === 0) {
    return `<div class="facilityMinerals">
            <p>Select a facility to see available minerals</p>
            </div>`;
  }

  //maps each facilityMneral to an HTML string
  const mineralItems = availableMinerals.map((facilityMineral) => {
    const mineral = minerals.find((m) => m.id === facilityMineral.mineralId);
    return `
    
        <div class="mineral-item">
        <input type="radio"
        name="selectedMineral"
        id="mineral-${mineral.id}"
        value="${mineral.id}"
        />
        <label for="mineral-${facilityMineral.id}">
        ${mineral.name} - Quantity: ${facilityMineral.saleQuantity}
        </label>
        </div>
        `;
  });

  return `
    <div class="facilityMinerals">
    ${mineralItems.join("")}
    </div>
    `;
};
