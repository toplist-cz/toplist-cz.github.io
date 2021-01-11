export default function windowScrollPosition (propertyName) {
	return {
		data () {
			return {
				[propertyName]: [0, 0]
			}
		},
		created () {
			if (!this.$isServer) {
				this._scrollListener = () => {
					this[propertyName] = [
						Math.round(window.pageXOffset),
						Math.round(window.pageYOffset)
					]
				}

				this._scrollListener()

				window.addEventListener("scroll", this._scrollListener)
			}
		},
		beforeDestroy () {
			window.removeEventListener("scroll", this._scrollListener)
		}
	}
}
