import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
export default {
  components: {},
  mixins: [],
  data () {
    return {
    }
  },
  computed: {
    ...mapState([]),
    // [key]: '[module]/[state]',
    ...mapState({}),
    ...mapGetters([])
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    ...mapMutations([]),
    ...mapActions([]),
    // [key]: '[module]/[state]',
    ...mapActions({}),
  }
}
