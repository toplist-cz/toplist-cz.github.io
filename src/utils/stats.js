export default {
	1: {
		id: 1,
		renderer: "graph",
		relative: false,
		seq: 2,
		link: false,
		keyword: "uniqueVisitors",
		long: "Počet unikátních IP",
		short: "unikátní IP",
		y: "unikátní IP",
		key: {
			visits: "počet IP"
		},
		jobGroupId: 1
	},
	2: {
		id: 2,
		renderer: "graph",
		relative: true,
		seq: 4,
		link: false,
		keyword: "browser",
		long: "Podíl prohlížečů",
		short: "prohlížeče",
		y: "prohlížeče",
		ddTable: "cl_name",
		jobGroupId: 1
	},
	3: {
		id: 3,
		renderer: "graph",
		relative: true,
		seq: 10,
		link: false,
		keyword: "visitDepth",
		long: "Hloubka návštěv",
		short: "hloubka návštěv",
		y: "hloubka návštěv",
		jobGroupId: 1
	},
	4: {
		id: 4,
		renderer: "graph",
		relative: true,
		seq: 6,
		link: false,
		keyword: "os",
		long: "Operační systémy",
		short: "op. systémy",
		y: "op. systém",
		ddTable: "os_name",
		jobGroupId: 1
	},
	5: {
		id: 5,
		renderer: "graph",
		relative: false,
		seq: 1,
		link: false,
		keyword: "visits",
		long: "Počet návštěv",
		short: "návštěvy",
		y: "návštěvy",
		key: {
			visits: "návštěvy"
		},
		jobGroupId: 1
	},
	6: {
		id: 6,
		renderer: "graph",
		relative: true,
		seq: 8,
		link: false,
		keyword: "screenResolution",
		long: "Rozlišení monitorů",
		short: "rozlišení monitorů",
		y: "rozlišení",
		jobGroupId: 1
	},
	7: {
		id: 7,
		renderer: "graph",
		relative: true,
		seq: 9,
		link: false,
		keyword: "colorDepth",
		long: "Barevná hloubka monitorů",
		short: "barevná hloubka",
		y: "barevná hloubka",
		jobGroupId: 1
	},
	8: {
		id: 8,
		renderer: "table",
		relative: false,
		seq: 2,
		link: true,
		keyword: "exitPages",
		long: "Výstupní stránky",
		short: "výstupní stránky",
		jobGroupId: 3
	},
	9: {
		id: 9,
		renderer: "table",
		relative: false,
		seq: 1,
		link: false,
		keyword: "entryPages",
		long: "Vstupní stránky",
		short: "vstupní stránky",
		jobGroupId: 3
	},
	10: {
		id: 10,
		renderer: "table",
		relative: false,
		seq: 3,
		link: false,
		keyword: "totalPages",
		long: "Nejnavštěvovanější stránky",
		short: "nejnavštěvovanější",
		jobGroupId: 3
	},
	11: {
		id: 11,
		renderer: "table",
		relative: false,
		seq: 1,
		link: false,
		keyword: "sourceAll",
		long: "Zdroje - všechny",
		short: "zdroje - všechny",
		jobGroupId: 2
	},
	12: {
		id: 12,
		renderer: "table",
		relative: false,
		seq: 2,
		link: false,
		keyword: "sourceDomain",
		long: "Zdroje - domény",
		short: "zdroje - domény",
		jobGroupId: 2
	},
	13: {
		id: 13,
		renderer: "table",
		relative: false,
		seq: 3,
		link: false,
		keyword: "sourceSearch",
		long: "Zdroje - vyhledávače",
		short: "zdroje - vyhledávače",
		jobGroupId: 2
	},
	14: {
		id: 14,
		renderer: "table",
		relative: false,
		seq: 4,
		link: false,
		keyword: "sourceSearchKeyword",
		long: "Zdroje - hledané fráze",
		short: "zdroje - hledané fráze",
		jobGroupId: 2
	},
	15: {
		id: 15,
		renderer: "table",
		relative: false,
		seq: 11,
		link: false,
		keyword: "visitsDomain",
		long: "Návštěvy - domény",
		short: "návštěvy - domény",
		jobGroupId: 1
	},
	16: {
		id: 16,
		renderer: "graph",
		relative: false,
		seq: 12,
		link: false,
		keyword: "visitsDomainTrend",
		long: "Návštěvy - domény (trend)",
		short: "návštěvy - domény (trend)",
		jobGroupId: 1
	},
	17: {
		id: 17,
		renderer: "graph",
		relative: false,
		seq: 3,
		link: false,
		keyword: "pageView",
		long: "Zhlédnutí",
		short: "zhlédnutí",
		key: {
			pageview: "zhlédnutí"
		},
		jobGroupId: 1
	},
	18: {
		id: 18,
		renderer: "graph",
		relative: true,
		seq: 13,
		link: false,
		keyword: "search",
		long: "Vyhledávače",
		short: "vyhledávače",
		jobGroupId: 1
	},
	21: {
		id: 21,
		renderer: "table",
		relative: false,
		seq: 4,
		link: true,
		keyword: "path",
		long: "Cesty",
		short: "cesty",
		jobGroupId: 3
	},
	22: {
		id: 22,
		renderer: "table",
		relative: false,
		seq: 5,
		link: false,
		keyword: "localSearch",
		long: "Lokální hledání - fráze",
		short: "lokální hledání - fráze",
		jobGroupId: 3
	},
	23: {
		id: 23,
		renderer: "graph",
		relative: true,
		seq: 14,
		link: false,
		keyword: "deviceType",
		long: "Typ zařízení",
		short: "typ zařízení",
		apiKeyword: "device",
		ddTable: "device",
		jobGroupId: 1
	},
	24: {
		id: 24,
		renderer: "graph",
		relative: true,
		seq: 15,
		link: false,
		keyword: "browserType",
		long: "Typ aplikace",
		short: "typ aplikace",
		apiKeyword: "cl_type",
		jobGroupId: 1
	},
	25: {
		id: 25,
		renderer: "graph",
		relative: false,
		seq: 16,
		link: false,
		keyword: "visitsHour",
		long: "Návštěvnost během dne",
		short: "návštěvnost během dne",
		y: "návštěvy",
		key: {
			workday: "pracovní dny",
			weekend: "víkend"
		},
		jobGroupId: 1
	},
	26: {
		id: 26,
		renderer: "graph",
		relative: false,
		seq: 17,
		link: false,
		keyword: "visitsWeekday",
		long: "Návštěvnost podle dne v týdnu",
		short: "návštěvnost podle dne",
		y: "návštěvy",
		key: {
			visits: "návštěvy"
		},
		x: {
			1: "pondělí",
			2: "úterý",
			3: "středa",
			4: "čtvrtek",
			5: "pátek",
			6: "sobota",
			7: "neděle"
		},
		jobGroupId: 1
	},
	27: {
		id: 27,
		renderer: "graph",
		relative: false,
		seq: 18,
		link: false,
		keyword: "visitsReloadsVsCategory",
		long: "Porovnání návštěvnosti v rámci kateogrie",
		short: "návštěvnost podle dne",
		y: "návštěvy",
		key: {
			visits: "návštěvy"
		},
		jobGroupId: 1
	}
}
