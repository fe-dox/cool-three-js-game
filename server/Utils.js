class Utils {
    static convertBase(value, from_base, to_base) {
        const range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/_.!@$<>%#'.split('');
        const from_range = range.slice(0, from_base);
        const to_range = range.slice(0, to_base);

        let dec_value = value.split('').reverse().reduce(function (carry, digit, index) {
            if (from_range.indexOf(digit) === -1) throw new Error('Invalid digit `' + digit + '` for base ' + from_base + '.');
            return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
        }, 0);

        let new_value = '';
        while (dec_value > 0) {
            new_value = to_range[dec_value % to_base] + new_value;
            dec_value = (dec_value - (dec_value % to_base)) / to_base;
        }
        return new_value || '0';
    }

    static NewId() {
        return Utils.convertBase(String(Date.now()) + String(Math.floor(Math.random() * 100)),10,71)
    }
}
