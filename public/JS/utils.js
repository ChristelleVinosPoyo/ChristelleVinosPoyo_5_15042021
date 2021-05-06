// ___________________ Convertion du prix en € au format français __________________________________________

function convertPrice(priceToConvert) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(priceToConvert/100);
}

