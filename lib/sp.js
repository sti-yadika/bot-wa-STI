const DataBase = require("../src/database")
const database = new DataBase()

async function featSP(naze, db, prefix, m, mess, command, text, fkontak) {
	if (!m.isGroup) return m.reply(mess.group)
	if (!m.isAdmin) return m.reply(mess.admin)
	if (!m.isBotAdmin) return m.reply(mess.botAdmin)
	if (!m.quoted) {
		m.reply(`Contoh: ${prefix + command} 62xxx`)
	} else {
		const numbersOnly = m.quoted?.sender
		const isNumberAdmin = m.admins.filter((admin) => admin.id == numbersOnly).length > 0
		console.log(m)
		if (db.users[numbersOnly].group_sp[m.chat] && db.users[numbersOnly].group_sp[m.chat].created_at != null) {
			await m.reply(`@${numbersOnly.split("@")[0]} Telah masuk daftar hitam`)
		}
		db.users[numbersOnly].group_sp[m.chat].sp = db.users[numbersOnly].group_sp[m.chat]?.sp
			? db.users[numbersOnly].group_sp[m.chat].sp + 1
			: 1
		await m.reply(`sp ${db.users[numbersOnly].sp} telah diberikan kepada @${numbersOnly.split("@")[0]}`)
		if (db.users[numbersOnly]?.sp >= 3) {
			await naze.sendMessage(
				m.chat,
				{
					text: `*Mengeluarkan* @${numbersOnly.split("@")[0]}\n\n*Karena telah melakukan pelanggaran sebanyak 3x*`,
					mentions: [numbersOnly],
				},
				{ quoted: m },
			)
			db.users[numbersOnly].group_sp[m.chat].sp = 0
			db.users[numbersOnly].group_sp[m.chat].created_at = Date.now()
		}
		if (db) await database.write(db)
	}
	// 	try {
	// 		await naze.groupParticipantsUpdate(m.chat, [numbersOnly], "add").then(async (res) => {
	// 			for (let i of res) {
	// 				let invv = await naze.groupInviteCode(m.chat)
	// 				if (i.status == 408) return m.reply("Dia Baru-Baru Saja Keluar Dari Grub Ini!")
	// 				if (i.status == 401) return m.reply("Dia Memblokir Bot!")
	// 				if (i.status == 409) return m.reply("Dia Sudah Join!")
	// 				if (i.status == 500) return m.reply("Grub Penuh!")
	// 				if (i.status == 403) {
	// 					await naze.sendMessage(
	// 						m.chat,
	// 						{
	// 							text: `@${numbersOnly.split("@")[0]} Tidak Dapat Ditambahkan\n\nKarena Target Private\n\nUndangan Akan Dikirimkan Ke\n-> wa.me/${numbersOnly.replace(/\D/g, "")}\nMelalui Jalur Pribadi`,
	// 							mentions: [numbersOnly],
	// 						},
	// 						{ quoted: m },
	// 					)
	// 					await naze
	// 						.sendMessage(
	// 							`${numbersOnly ? numbersOnly : "6282113821188@s.whatsapp.net"}`,
	// 							{
	// 								text: `${"https://chat.whatsapp.com/" + invv}\n------------------------------------------------------\n\nAdmin: @${m.sender.split("@")[0]}\nMengundang anda ke group ini\nSilahkan masuk jika berkehendak🙇`,
	// 								detectLink: true,
	// 								mentions: [numbersOnly, m.sender],
	// 							},
	// 							{ quoted: fkontak },
	// 						)
	// 						.catch((err) => m.reply("Gagal Mengirim Undangan!"))
	// 				} else if (i.status !== 200) {
	// 					m.reply("Gagal Add User")
	// 				}
	// 			}
	// 		})
	// 	} catch (e) {
	// 		m.reply("Gagal Add User")
	// 	}
	// }
}

module.exports = { featSP }
