const fs = require('fs');
const path = './birthdays.json';

class BirthdayManager {
    static getAllBirthdays() {
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify({}));
        }
        const data = fs.readFileSync(path);
        return JSON.parse(data);
    }

    static addBirthday(userId, date) {
        const birthdays = this.getAllBirthdays();
        birthdays[userId] = date;
        fs.writeFileSync(path, JSON.stringify(birthdays, null, 2));
    }

    static removeBirthday(userId) {
        const birthdays = this.getAllBirthdays();
        delete birthdays[userId];
        fs.writeFileSync(path, JSON.stringify(birthdays, null, 2));
    }

    static updateBirthday(userId, newDate) {
        this.addBirthday(userId, newDate);
    }
}

module.exports = BirthdayManager;
