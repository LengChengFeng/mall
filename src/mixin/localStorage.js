import localStorage from '@/utils/localStorage'

const storage = {
    data() {
        return {
            token: ""
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.token = localStorage.getToken('token').token
        })

    }
}

export default storage