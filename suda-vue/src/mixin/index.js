export const mixins = {
    data() {
        return {
            msg: "mixins数据"
        }
    },
    methods: {
        onClick() {
            console.log("我是mixin中的点击事件")
        }
    },
    computed: {},
    mounted() {
        console.log("我是mixin的mounted")
    }
}