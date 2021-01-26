export const updateProgress = (event) => {
    if (event.lengthComputable) {
        let percentComplete = (event.loaded / event.total) * 100;
    } else {
        console.log('unable to compute progress, size unknown');
    }
};

export const transferComplete = (evt) => {
    console.log('transfer complete', evt);
    console.log(evt.target.XMLHttpRequest.response);
    return evt.target.response;
};

export const addXMLReqListeners = (request) => {
    request.addEventListener('progress', updateProgress);
    request.addEventListener('load', transferComplete);
};

export const getPhotosXML = (num) => {
    const xhrToApi = new XMLHttpRequest();
    addXMLReqListeners(xhrToApi);
    xhrToApi.open('GET', `http://localhost:5500/${num}`, true);
    xhrToApi.responseType = 'text';
    xhrToApi.onload = () => {
        if (xhrToApi.readyState === xhrToApi.DONE) {
            if (xhrToApi.status === 200) {
                // console.log(xhrToApi.response);
            }
        }
    };
    xhrToApi.send();
    return xhrToApi;
};

export const extractXMLreq = async (n) => {
    const result = getPhotosXML(n);
    let parser = { data: null };

    if (result.readyState === result.DONE) {
        console.log(result.response);
        parser.data = result.response;
        parser.arr = JSON.parse(parser.data);
    } else {
        console.log('not done. Sadness.');
    }
    return parser;
    // return result;
};

console.log(extractXMLreq(3));
// extractXMLreq(3);
