const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEdpUFF2ckZTQVZSU1lVOVJQdHFZb2ZRL1RpaWRLWmo2bHh3bmJ0VTdXMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUmN4cHdQYlU3RUo1cGJPUVMydVpVRnRiYUlEbUZRY3VkR04xRDc3ZXAzND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTR0h3bDZMdldLZWQ5Rk5wLzlOTVFHM2ZUS0F2Y0IxV0hMQjU0YmduWFdFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGTzUwN01BZDRhWXQzcjFKdHFoRFd0T3FIUzVEcTNtUVVBUUEwVHVqeFZJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVNUm5VWG1RNGlaT0ZaUkNmTGpxRVl3VUpwYmZwQ21IU2djRG0yUFY2MFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxIQkFFK2dxc2V2Vko5eW1UZXE1UGluQ2k1Ty83RXZKS01aTGN0cXZGejA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0dNaHdQblFpSEt4NVdwQ3ZMd0VNaHRaZlo0MnhiVWovSUdPc2ZldXVVST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidkRsaU1XemNDV3AvekdmUUhDQXRTdDlTamtUaXFxZXh1L1JjODhGbG93cz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlcydW5xMDdMbkxjaEZZMlI1RVlyYVZrZElxTks3YWVBTithSGtjQmV3RVE4ckJBaEltSkpBc25BS25ESWs4T1JPZ0hLK1ExMWtTV2I0QjVPaHB5Zmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTIsImFkdlNlY3JldEtleSI6InRMQlQ2WFhSOGxjdGpTd0tOT05NcXQ3NGd3WVdTTGdUb0FLaTgyK1RtREk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0NzAxNTk4MzMzMEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCMzlFODNFMTI4NUVFNDk3MkYzMEU2RkE2NEVDMzM1RiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxMzc5MzM4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ3MDE1OTgzMzMwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjA0NDAxMDU1MkI5QzRFRjEwNzI4M0FBMkVCMEUxODUxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjEzNzkzMzh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNDcwMTU5ODMzMzBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQzkxMjZCQkRCMTlDOTVCNDc5NzE0NTJDNjdCQjEyNzMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMTM3OTM0MH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0NzAxNTk4MzMzMEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3RUQwM0ZENTA0Mzg4RDBFQjI2RDY4QURBREZBMkVGMyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxMzc5MzQwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJWV2V3dWdLVFNhQ1E3YmZ4Zm1Nc3pBIiwicGhvbmVJZCI6IjU1YmE4NjM3LWViYTEtNDM4YS1hNDIxLTliYTQ4M2QyN2Y0MiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4V0d1ZDJTQllkUG5iWmlhWTdSSUplcEhDZTA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSWJLZEZNQ3gyOTRRQ3VXRFZ4Tm5qYXZZUGRZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjJYQjJIVDNEIiwibWUiOnsiaWQiOiIyMzQ3MDE1OTgzMzMwOjJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTGlnaHQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xESTRCZ1ErOVBvdEFZWUFpQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik5WcCttNHVwVWRQOTR6dkFySXZTVWg0WnhaWmFPakZrRjZEZ0UvSk15Mkk9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik9qMjZJV1dWY2xYMHdDUC92OGdseGtEdDBXOU5aM2M4czNnWTNXdFJYdVNvM0I4NC9vOEN4dm5HNGhqYXNOV0NkK1B5SEVHVUd0MVdCNGVLZnJ5VEJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJMS21yRU1TNjlKK2ZjL3pxaWN5YkErWXI4MGhnQnM4aVAzMzdmNFlSaG44L0J2SGRVVEsxc1p2SEdmdHM5cmZYUExqTzVTT3VvNDRDa2gyeXRqWGZndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwMTU5ODMzMzA6MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUVmFmcHVMcVZIVC9lTTd3S3lMMGxJZUdjV1dXam94WkJlZzRCUHlUTXRpIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMzc5MzM2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1BUyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Bamireid",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2347015983330,2348102925093",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'oui',
    BOT : process.env.BOT_NAME || 'Bamireid MD V5',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/85e313d2c43111193f9bc.jpg,https://telegra.ph/file/d04abf5e17b331ab46871.jpg,https://telegra.ph/file/2ab35f2759d081657d286.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://bamireid0_user:iqn5HzAEzBx7G66ywhZuHewcdfd0xyIJ@dpg-cqbi3r8gph6c73c0pkvg-a.oregon-postgres.render.com/bamireid0",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
