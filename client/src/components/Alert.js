export default class Alert {
    static showAlert(text) {
        const alertBox = document.createElement('div');
        alertBox.classList.add('alertBox');
        const alertSpan = document.createElement('span');
        alertSpan.textContent = text;
        alertBox.appendChild(alertSpan);
        document.body.appendChild(alertBox);
    }
}