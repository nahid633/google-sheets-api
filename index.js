const express = require("express");
const { google } = require("googleapis");

const app = express();
const port = 8080;

app.use(express.json());


async function authSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json",
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const authClient = await auth.getClient();

    const sheets = google.sheets({ version: "v4", auth: authClient });

    return {
        auth,
        authClient,
        sheets,
    };
}

app.get("/", async (req, res) => {
    const { sheets } = await authSheets();
    const getRows = await sheets.spreadsheets.values.get({
        spreadsheetId: '1HXaq5tKia2ASWN-aQ21Vv_zKYTKDhHHY4mleBlExlH8',
        range: "Sheet1",
    });
    res.send(getRows.data);

})

app.get("/add", async (req, res) => {
    const { sheets } = await authSheets();
    const getRows = await sheets.spreadsheets.values.append({
        spreadsheetId: '1HXaq5tKia2ASWN-aQ21Vv_zKYTKDhHHY4mleBlExlH8',
        range: "Sheet1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [["Hello", 'Moon']],
        },
    });
    res.send(getRows.data);

})

app.get("/update", async (req, res) => {
    const {sheets} = await authSheets();
    const getRows = await sheets.spreadsheets.values.append({
        spreadsheetId: '1HXaq5tKia2ASWN-aQ21Vv_zKYTKDhHHY4mleBlExlH8',
        range: "Sheet1!B2",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [["Mars"]],
        },
    });
    res.send(getRows.data);

})

app.get("/clear", async (req, res) => {
    const { sheets } = await authSheets();
    const getRows = await sheets.spreadsheets.values.clear({
        spreadsheetId: '1HXaq5tKia2ASWN-aQ21Vv_zKYTKDhHHY4mleBlExlH8',
        range: "Sheet1!A2:B2",
    });
    res.send(getRows.data);
});



app.listen(port, () => console.log(`Listening on port ${port}`));
