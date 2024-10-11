import { createElement } from 'react';

const rootElement = createElement('div', { id: 'root' });
const heading = createElement('h1', {}, 'Click the Buttons to Send Requests');
const buttonsContainer = createElement('div', { id: 'buttons-container' });
const buttons = [
    createElement('button', { onclick: () => sendRequest(1) }, 'REGISTER'),
    createElement('button', { onclick: () => sendRequest(2) }, 'PAYMENT'),
    createElement('button', { onclick: () => sendRequest(3) }, 'STATUS'),
    createElement('button', { onclick: () => sendRequest(4) }, 'REFUND'),
    createElement('button', { onclick: () => sendRequest(5) }, 'Button 5'),
    createElement('button', { onclick: () => sendRequest(6) }, 'Button 6'),
    createElement('button', { onclick: () => sendRequest(7) }, 'Button 7'),
    createElement('button', { onclick: () => sendRequest(8) }, 'Button 8'),
    createElement('button', { onclick: () => sendRequest(9) }, 'Button 9')
];
const resultElement = createElement('div', { id: 'result' });

buttonsContainer.append(...buttons);
rootElement.append(heading, buttonsContainer, resultElement);

document.body.appendChild(rootElement);

function sendRequest(buttonId) {
    const commands = {
        1: "register?name=Yerzh",
        2: "payment?amount=1",
        3: "status?processId={{processId}}",
        4: "refund?method=card&amount=1&transactionId={{transactionId}}",
        5: "revoke?name=Yerzh&refreshToken={{refreshToken}}"
    };

    const command = commands[buttonId] || "Unknown";

    const url = `https://192.168.1.77:8081/v2/${command}`;
    const accessToken = "someToken";

    fetch(url, {
        method: 'GET',
        headers: {
            'accesstoken': accessToken,
        },
        redirect: 'follow',
    })
    .then(response => response.text())
    .then(data => {
        resultElement.textContent = `Response from server for Button ${buttonId}: ${data}`;
        // const processId = data.data && data.data.processId;
        // const transactionId = data.data && data.data.transactionId;
    })
    .catch(error => {
        resultElement.textContent = `Error for Button ${buttonId}: ${error}`;
    });
}
