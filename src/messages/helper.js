const fs = require("fs").promises;
const MESSAGE_PATH = `${__dirname}/messages.json`;

const getData = async () => {
    const data = await fs
        .readFile(MESSAGE_PATH, "utf8")
        .catch((err) => console.log("Fail", err));

    return JSON.parse(data.toString());
};

const saveData = async (newData) => {
    const dataString = JSON.stringify(newData);
    const status = await fs
        .writeFile(MESSAGE_PATH, dataString)
        .catch((err) => console.log("fail", err));

    console.log(status);

    return status;
};

const getResponse = async (msg) => {
    const res = await getData();
    return await res[msg];
};

const addMessagePool = async (msg, res) => {
    const data = await getData();

    data[msg] = res;
    const status = await saveData(data);

    return "Oke rồi. Dcmm";
};

const removeMessagePool = async (msgs) => {
    const data = await getData();
    const success = [];
    const fail = [];
    let message = '';

    msgs.map((msg) => {
        if (!data[msg]) {
            fail.push(msg);
            return;
        }
        delete data[msg];
        success.push(msg);
    });

    const status = await saveData(data);

    message += success.length ? `Xoá oke cho ${success.join(', ')}. ` : '';
    message += fail.length ? `Có cl  ${fail.join(', ')}.` : '';

    return message
};

const listMessages = async () => {
    const data = await getData();

    let message = 'List cắn:\n'

    Object.keys(data).map(key => {
        message += `${key}: ${data[key]}\n`
    }) 

    return message
}

const updateMessagePool = (msg, res) => {};

module.exports = {
    getResponse,
    addMessagePool,
    removeMessagePool,
    updateMessagePool,
    listMessages
};
