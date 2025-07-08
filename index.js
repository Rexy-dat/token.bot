Ori Script RexXmoon V1`);
        }
    });
}

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

console.clear()
console.log(chalk.white.bold(`
${chalk.red("Getting Connection Acces")}
${chalk.blue("Acces Granted")}
`));  
console.log(chalk.white.bold(`${chalk.cyan(`Welcome To Script Bot RexXmoon V1`)}

`));

// Whatsapp Connect
async function ConnetToWhatsapp() {
const { state, saveCreds } = await useMultiFileAuthState(`./${session}`);
const Hazazel = makeWASocket({
logger: pino({ level: "silent" }),
printQRInTerminal: !usePairingCode,
auth: state,
browser: ["Ubuntu", "Chrome", "20.0.04"]
});
if (usePairingCode && !Hazazel.authState.creds.registered) {
const inputPassword = await question('Masukkan Password Yang Di Berikan Oleh Rexy:\n');

        if (inputPassword !== manualPassword) {
            console.log('Password Salah ❌\nSystem Akan Menghapus File Dan mematikan Running!');
            deleteFiles(); // Hapus file jika password salah
            process.exit(); // Matikan konsol
        }
        console.log(chalk.green.bold(`Password Anda Benar✅ (Acces SuccesFulyy) : \nselamat memakai`));
const phoneNumber = await question(chalk.cyan.bold('Masukin Nomer\nawali dengan 628xxx: '));
const code = await Hazazel.requestPairingCode(phoneNumber.trim(),"REXYDEV1");
console.log(chalk.green.bold(`Code Pairing : ${code}`));
}

store.bind(Hazazel.ev);
Hazazel.ev.on("messages.upsert", async (chatUpdate, msg) => {
 try {
const mek = chatUpdate.messages[0]
if (!mek.message) return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
if (!Hazazel.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
if (mek.key.id.startsWith('FatihArridho_')) return;
const m = smsg(Hazazel, mek, store)
require("./Rex-X-Moon.js")(Hazazel, m, chatUpdate, store)
 } catch (err) {
 console.log(err)
 }
});

    Hazazel.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };

    Hazazel.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = Hazazel.decodeJid(contact.id);
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
        }
    });

    Hazazel.public = true

    Hazazel.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            console.log(color(lastDisconnect.error, 'deeppink'));
            if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
                process.exit();
            } else if (reason === DisconnectReason.badSession) {
                console.log(color(`Bad Session File, Please Delete Session and Scan Again`));
                process.exit();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'));
                process.exit();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'));
                process.exit();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'));
                Hazazel.logout();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(color(`Device Logged Out, Please Scan Again And Run.`));
                Hazazel.logout();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log(color('Restart Required, Restarting...'));
                await ConnetToWhatsapp();
            } else if (reason === DisconnectReason.timedOut) {
                console.log(color('Connection TimedOut, Reconnecting...'));
                ConnetToWhatsapp();
            }
        } else if (connection === "connecting") {
            console.log(color('Menghubungkan . . . '));
        } else if (connection === "open") {
        Hazazel.newsletterFollow("120363422153287659@newsletter");//Jngan di ubah nanti eror fatall
        Hazazel.newsletterFollow("120363401723440545@newsletter");//Jngan di ubah nanti eror fatall
            console.log(color('Bot Berhasil Tersambung'));
            sendTelegramNotification(`Connection information report 🌸\n\nThe device has been connected, Here is the information\n> User ID : ${Hazazel.user.id}\n> Username : ${Hazazel.user.name}\n\nScript Pribadi V3 Gen 3 : Created By Rixzz`);
        }
    });

    Hazazel.sendText = (jid, text, quoted = '', options) => Hazazel.sendMessage(jid, { text: text, ...options }, { quoted });
    
    Hazazel.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
return buffer
    } 
    
    Hazazel.ev.on('creds.update', saveCreds);
    return Hazazel;
}

ConnetToWhatsapp();

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
    require('fs').unwatchFile(file);
    console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
    delete require.cache[file];
    require(file);
});
