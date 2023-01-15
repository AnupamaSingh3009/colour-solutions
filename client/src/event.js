function subscribe(eventName, listener, targetElement = document) {
    targetElement.addEventListener(eventName, listener);
}

function unsubscribe(eventName, listener, targetElement = document) {
    targetElement.removeEventListener(eventName, listener);
}

function publish(eventName, data) {
    const event = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe};