// ___________________ Convertion du prix en € au format français __________________________________________

class Utils {
    static convertPrice(price) {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price/100)
    }
}