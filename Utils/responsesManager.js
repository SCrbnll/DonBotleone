const fs = require('fs');
const path = './responses.json';

class ResponseManager {
    static getAllResponses() {
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify({}));
        }
        const data = fs.readFileSync(path);
        return JSON.parse(data);
    }

    static addResponse(phrase, response) {
        const responses = this.getAllResponses();
        responses[phrase.toLowerCase()] = response;
        fs.writeFileSync(path, JSON.stringify(responses, null, 2));
    }

    static removeResponse(phrase) {
        const responses = this.getAllResponses();
        delete responses[phrase.toLowerCase()];
        fs.writeFileSync(path, JSON.stringify(responses, null, 2));
    }

    static updateResponse(phrase, newResponse) {
        this.addResponse(phrase, newResponse);
    }
}

module.exports = ResponseManager;
