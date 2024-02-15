const clientId = document.currentScript.getAttribute('clientId');

const HELP_PAGE = "Visit <eventsapi.com> for more information."

const EventPopUpFunction = ({imgSrc}) => {
    
    // Detect overlay trigger
    const EventPopUpButton = document.getElementById('event-popup-trigger');
    if(!EventPopUpButton) return console.error("Missing element with id=\"event-popup-trigger\"." + `\n${HELP_PAGE}`)

    // Create overlay element
    let EventOverLayElement = document.createElement('div');
    EventOverLayElement.classList.add('event-overlay');
    EventOverLayElement.ariaHidden = true;

    // Create image element
    let EventImageContainer = document.createElement('div');
    EventImageContainer.classList.add('event-image-container')
    EventOverLayElement.appendChild(EventImageContainer);

    // Placing overlay at top of document.
    const firstBodyTag = document.getElementsByTagName('body')[0];
    const firstBodyChild = firstBodyTag.firstElementChild;
    firstBodyTag.insertBefore(EventOverLayElement, firstBodyChild);

    // Overlay close button (X)
    let EventPopUpCloseButton = document.createElement('button');
    EventPopUpCloseButton.innerHTML = "&times;";
    EventPopUpCloseButton.classList.add("event-close-button");
    EventImageContainer.appendChild(EventPopUpCloseButton);

    // Overlay image
    let EventOverlayImage = document.createElement('img');
    EventOverlayImage.src = imgSrc;
    EventImageContainer.appendChild(EventOverlayImage);

    // Initialize state
    let eventPopUpOpened = false;
    let closingPopUpTimeout = setTimeout(() => {}, 200);

    // Initialize functions
    const closeEventPopUp = () => {
        closingPopUpTimeout = setTimeout(() => {
            eventPopUpOpened = false;
            EventOverLayElement.classList.remove("visible");
        }, 20)
    }

    const openEventPopUp = () => {
        eventPopUpOpened = true;
        EventOverLayElement.classList.add("visible");
    }

    const cancelCloseEventPopUp = () => {
        setTimeout(() => clearTimeout(closingPopUpTimeout), 10)
    }

    // Event handlers
    EventOverLayElement.addEventListener('click', () => eventPopUpOpened ? closeEventPopUp() : null);
    EventPopUpButton.addEventListener('click', () => eventPopUpOpened ? closeEventPopUp() : openEventPopUp());
    EventImageContainer.addEventListener('click', cancelCloseEventPopUp);
    EventPopUpCloseButton.addEventListener('click', closeEventPopUp)
}

const EventBannerFunction = () => {
    console.log("here goes all bannerlogic");
}

const init = async () => {
    
    // const res = await fetch(`https://events-api-ddmi.onrender.com?clientId=${clientId}`);
    const date = new Date();
    const currentDate = `${date.getMonth()} - ${date.getDate()}`
    const res = await fetch(`http://localhost:3000/?clientId=${clientId}&date=${currentDate}`);
    const data = await res.json();
    
    const content = `Success<br/>
    <strong>ClientId:</strong> ${clientId}<br/>
    <strong>Date (clinetside):</strong> ${data.date}<br/>
    <strong>Event:</strong> ${data.event}<br/>
    <strong>Theme:</strong> ${data.theme}<br/>
    <strong>Display Option:</strong> ${data.option}`;

    if(res.status === 400) return console.error(data.message);

    switch(data.option) {
        case 'pop-up': EventPopUpFunction({imgSrc: data.imgSrc}); break;
        case 'banner': EventBannerFunction(); break;
        
        default: console.error("You have not chosen type. Please visit <eventsapi.com> for more.")
    }
}

if(!clientId) console.error("\"clientId\" required attribute missing.");
else init();