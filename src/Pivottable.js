import TableRenderer from './TableRenderer'
import defaultProps from './helper/defaultProps'
export default {
  name: 'vue-pivottable',
  props: ['tableMaxWidth'],
  mixins: [defaultProps],
  computed: {
    renderers () {
      // ORIGINAL LINE:
      // return TableRenderer[this.rendererName in TableRenderer ? this.rendererName : Object.keys(TableRenderer)[0]]
      return this.rendererName in TableRenderer ?
        TableRenderer[this.rendererName] :
        this.rendererName in PlotlyRenderer ?
          PlotlyRenderer[this.rendererName] :
          Object.keys(TableRenderer)[0];
    }
  },
  methods: {
    createPivottable (h) {
      const props = this.$props
      return h(this.renderers, {
        props
      })
    },
    createWrapperContainer (h) {
      return h('div', {
        style: {
          display: 'block',
          // width: '100%',
          'overflow-x': 'auto',
          'max-width': `${this.tableMaxWidth}px`
        }
      }, [
        this.createPivottable(h)
      ])
    }
  },
  render (h) {
    return this.tableMaxWidth > 0 ? this.createWrapperContainer(h) : this.createPivottable(h)
  }
}
