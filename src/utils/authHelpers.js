export const getCookie = (name) => {
	const matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
	))
	return matches ? decodeURIComponent(matches[1]) : undefined
}

export const getJwtFromUrl = () => {
	const vars = {}
	window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key] = value
	})
	return vars.jwt
}

export const parseJwt = (token) => {
	const base64Url = token.split(".")[1]
	const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
	const jsonPayload = decodeURIComponent(atob(base64).split("").map(function (c) {
		return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
	}).join(""))

	return JSON.parse(jsonPayload)
}
