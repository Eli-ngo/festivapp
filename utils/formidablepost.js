import { IncomingForm } from "formidable";

export async function getInput(formData) {
    const data = await new Promise(function (resolve, reject) {
        const form = new IncomingForm({ keepExtensions: true });
        form.parse(form, function (err, fields, files) {
        if (err) return reject(err);
        resolve({ fields, files });
        });
    });

    return data.fields
}