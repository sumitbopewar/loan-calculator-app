
const conversionRates = {
    USD: 1,
    INR: 83,
    EUR: 0.93,
    GBP: 0.79,
    JPY: 155.31,
    AUD: 1.53,
  };
  
  export const useEMICalculator = (P, R, N, Currency) => {
    console.log(P, R, N, Currency)
    const months = N * 12;
    const r = R / 12 / 100;
    const emiRaw = (P * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);

    console.log(emiRaw)
    const schedule = [];
    let balance = P;
  
    const rate = conversionRates[Currency] || 1;
    const convert = (value) => +(value * rate).toFixed(2);
  
    for (let month = 1; month <= months; month++) {
      const interest = +(balance * r).toFixed(2);
      const principal = +(emiRaw - interest).toFixed(2);
      balance = +(balance - principal).toFixed(2);
  
      schedule.push({
        month,
        principal: convert(principal).toFixed(2),
        interest: convert(interest).toFixed(2),
        remaining: balance < 0 ? '0.00' : convert(balance).toFixed(2),
      });
    }
  
    return { emi: convert(emiRaw).toFixed(2), schedule, static: emiRaw.toFixed(2)};
  };
  