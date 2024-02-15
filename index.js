const clientId = document.currentScript.getAttribute('clientId');
const eventElement = document.getElementById('event-control');

const init = async () => {

    // const res = await fetch(`https://events-api-ddmi.onrender.com?clientId=${clientId}`);
    const date = new Date();
    const currentDate = `${date.getMonth()} - ${date.getDate()}`
    const res = await fetch(`http://localhost:3000/?clientId=${clientId}&date=${currentDate}`);
    const data = await res.json();

    if (res.status != 200) {
        eventElement.style.color = "red"
        console.error(data.message)
    }
    else eventElement.style.color = "green"

    if(res.status === 200) eventElement.innerHTML = `Success<br/>
    <strong>ClientId:</strong> ${clientId}<br/>
    <strong>Date (clinetside):</strong> ${data.date}<br/>
    <strong>Event:</strong> ${data.event}<br/>
    <strong>Theme:</strong> ${data.theme}<br/>
    <strong>Display Option:</strong> ${data.option}`
    else eventElement.innerHTML = data.message;

}

if(clientId && eventElement) init()
else if(!eventElement) console.error("\"event-control\" element missing\nPlease create an element and add id=\"event-control\"");
else console.error("\"clientId\" required attribute missing.");