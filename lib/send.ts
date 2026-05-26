'use server'
import {sendMail} from "@/utils/nodemailer/sendMail";

function getFormValue(formData: FormData, key: string) {
    const value = formData.get(key);

    return typeof value === 'string' ? value : '';
}

export default async function send(formData: FormData) {

    const name = getFormValue(formData, 'name');
    let fullName = '';

    if(name) {
        fullName = name
    } else {
        fullName = getFormValue(formData, 'info-name') + ' ' + getFormValue(formData, 'info-lastname');
    }

    const email = getFormValue(formData, 'email') || getFormValue(formData, 'info-email');
    const newsletter = getFormValue(formData, 'newsletter') || getFormValue(formData, 'info-newsletter');

    if(newsletter === 'false') {
        const message = getFormValue(formData, 'info-message');
        await sendMail({
            // sendTo: 'comunicazione.cremonamusei@comune.cremona.it',
            sendTo: 'sandrolini.barbara@nebbialab.it',
            subject:'Nuova richiesta di informazioni',
            text: fullName + ' ha mandato il seguente messaggio: ' + message,
            replyTo: email
        });
    } else {
        await sendMail({
            // sendTo: 'comunicazione.cremonamusei@comune.cremona.it',
            sendTo: 'sandrolini.barbara@nebbialab.it',
            subject:'Nuova iscrizione alla newsletter',
            text: fullName + ' si è iscritto alla newsletter ',
            replyTo: email
        });
    }
}
