function getPublicPath() {
	if (process.env.PUBLIC_PATH) {
		return process.env.PUBLIC_PATH
	}
	return ''
}

module.exports = {
	publicPath: getPublicPath(),
	pluginOptions: {
		i18n: {
			locale: "cs",
			fallbackLocale: "cs",
			localeDir: "locales",
			enableInSFC: true
		}
	}
}
