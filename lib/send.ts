'use server'
import {sendMail} from "@/utils/nodemailer/sendMail";

export default async function send(formData:any) {

    let fullName = '';
    if(formData.get('name')) {
        fullName = formData.get('name')
    } else {
        fullName = formData.get('info-name') + ' ' + formData.get('info-lastname');
    }
        const email = formData.get('email') ?? formData.get('info-email');
        const newsletter = formData.get('newsletter') ?? formData.get('info-newsletter');

        if(newsletter === 'false') {
            const message = formData.get('info-message');
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