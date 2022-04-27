const names = {
	f: ["Sophia", "Emily", "Harper", "Ava", "Elizabeth", "Isabelle", "Abigail", "Camille", "Avery", "Scarlet"], // Female
	m: ["Oliver", "Liam", "Jack", "Benjamin", "Alexander", "Logan", "Michael", "Ethan", "Owen", "Joeseph", "Zachary"], // Male
	l: ["Wilson", "Jackson", "Harris", "Moore", "Scott", "Hill", "Green", "Adams", "Carter", "Roberts", "Cruz"]  // Last
}

const randBool = (weight = 0.5) => Math.random() > weight
const randRange = (min, max) => Math.round(Math.random() * (max - min) + min)
const alphanum = "abcdefghijklmnopqrstuvwxyz1234567890".split("")

function randomName(sex) {
	let fname
	if (sex) {
		fname = names.m[randRange(0, names.m.length - 1)]
	} else {
		fname = names.f[randRange(0, names.f.length - 1)]
	}

	return {
		first: fname,
		last: names.l[randRange(0, names.l.length - 1)]
	}
}

function generateID() {
	let first = ""
	let last = ""

	for (let i = 0; i < 5; i++) {
		first += alphanum[randRange(0, alphanum.length - 1)]
	}

	for (let i = 0; i < 5; i++) {
		last += alphanum[randRange(0, alphanum.length - 1)]
	}

	return `${first.toUpperCase()}-${last.toUpperCase()}`
}

class Entrant {
	constructor() {
		this.sex = randBool()
		const n = randomName(this.sex)
		this.fname = n.first
		this.lname = n.last
		this.id = generateID()
	}

	getPassport() {
		const infoTypes = ["exp", "fname", "lname", "sex", "id"];
		const isValid = () => {
			const is = randBool()
			let reason = is ? undefined : infoTypes[randRange(0, infoTypes.length - 1)]
			
			return { is, reason }
		}

		const valid = isValid()
		console.log(`${valid.is}, ${valid.reason}`)
		this.answer = valid
		
		let fn = this.fname
		let ln = this.lname
		let g = this.sex ? "Male" : "Female"
		let id = this.id
		let ex = `${randRange(1, 12)}/${randRange(1, 30)}/${(new Date()).getFullYear() + randRange(1, 5)}`

		if (!valid.is) {
			switch(valid.reason) {
				case "fname":
					fn = randomName(this.sex).first
					break
				case "lname":
					ln = randomName(this.sex).last
					break
				case "sex":
					g = !this.sex ? "Male" : "Female"
					break
				case "id":
					id = generateID()
					break
				case "exp":
					ex = `${randRange(1, 12)}/${randRange(1, 30)}/${(new Date()).getFullYear() - randRange(1, 5)}`
			}
		}
		
		return {
			firstname: fn,
			lastname: ln,
			gender: g,
			id: id,
			expire: ex
		}
	}

	getDB() {
		const date = new Date()
		return {
			dbfirst: this.fname,
			dblast: this.lname,
			dbgen: this.sex ? "Male" : "Female",
			dbid: this.id,
			today: `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
		}
	}
}

window.onload = function() {
	const tableorder = ["firstname", "lastname", "gender", "id", "expire"]
	const dborder = ["dbfirst", "dblast", "dbgen", "dbid", "today"]
	
	const person = new Entrant()
	const pass = person.getPassport()
	const db = person.getDB()

	for (let i of dborder) {
		document.getElementById(i).innerText = db[i]
	}

	for (let i of tableorder) {
		document.getElementById(i).innerText = pass[i]
	}

	const yes = document.getElementById("yes")
	yes.addEventListener('click', function() {
		if (person.answer.is == true) {
			window.onload()
		}
	})

	const no = document.getElementById("no")
	const den = document.getElementById("denydd")
	no.addEventListener('click', function() {
		if (person.answer.reason == den.value) {
			window.onload()
		}
	})
}

