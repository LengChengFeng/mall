import backTop from "@/components/common/backTop/backTop";
const backtoTop = {
    components: {
        backTop
    },
    data() {
        return {
            positionY: ""
        }
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo()
        }
    }
}

export default backtoTop