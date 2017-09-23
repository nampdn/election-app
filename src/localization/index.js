const Lang = (options) => {
  this.langData = {}
}

Lang.files = {}

Lang.prototype.setLang = () => {
  for (let i in Lang.files) {
    let langName = i.replace('./', '').replace('.js', '')
    this.langData[langName] = Lang.files[i]
  }
}

Lang.prototype.getLang = () => {
  return this.langData
}

var vm = null

const TranslatePlugin = {
  install (Vue, options) {
    var o = options || {}
    var defaultLang = o.default || 'en'
    var req = o.req || null

    if (typeof options !== 'object') {
      console.error('[Localization]: Options should be an object type.')
      return false
    }
    if (!req) {
      console.error('[Localization]: Missing languages.')
      return false
    }

    req.keys().forEach((d) => {
      Lang.files[d] = req(d)
    })
    var lang = new Lang({ lang: defaultLang })
    lang.setLang()

    if (!vm) {
      vm = new Vue({
        data () {
          return {
            current: defaultLang,
            locales: lang.getLang()
          }
        },
        computed: {
          lang () {
            return this.current
          },
          locale () {
            if (!this.locales[this.lang]) {
              return null
            }
            return this.locales[this.current]
          }
        },
        methods: {
          setLang (val) {
            this.current = val
          },
          text (t) {
            return this.locale[t]
          }
        }
      })
      Vue.prototype.$translate = vm
    }

    Vue.mixin({
      methods: {
        t (t) {
          return this.$translate.text(t)
        }
      }
    })
  }
}

export default TranslatePlugin
