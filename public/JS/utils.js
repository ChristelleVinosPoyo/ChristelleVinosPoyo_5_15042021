// convertion du prix en euros au format française
function convertPrice(priceToConvert) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(priceToConvert/100);
}
