import { derived, writable } from 'svelte/store';

export const wallet = writable(JSON.parse(localStorage.getItem("wallet")) || []);

wallet.subscribe(value => {
  localStorage.setItem("wallet", JSON.stringify(value));
})

export const displayData = derived(wallet, ($wallet) => {
  let returnData = [];
    $wallet.forEach((holding) => {
      holding.price = parseFloat(holding.priceUsd);
      holding.value = (parseFloat(holding.priceUsd) * parseFloat(holding.amountHeld));
      returnData.push(holding);
    });
  
  return returnData;
});

export const totalValue = derived(wallet, $wallet => {
  let total = 0;
  $wallet.forEach(holding => {
    total += holding.value;
  })
  return total
});