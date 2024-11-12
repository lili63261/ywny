<script>
import './index.scss'
export default {
    // #ifdef H5
    onLaunch: function() {
        this.show()
        this.$router.beforeEach((to, from, next) => {
            const fromPath = ['/pages/ticketCard/bankList','/pages/ticketCard/tobuyBankCard']
            const toPath = ['/pages/ticketCard/tobuyBankCard','/pages/ticketCard/bankList']
            if (fromPath.includes(from.path) && toPath.includes(to.path)){
                this.hide(next)
            }else{
                next()
            }
        })
        this.$router.afterEach(() => {
            setTimeout(this.show, 50)
        })
    },
    methods: {
        hide(callback) {
            const classList = document.querySelector('uni-page').classList
            classList.add('in')
            setTimeout(() => {
                classList.remove('page-transform', 'in')
                callback && callback()
            }, 300)
        },
        show() {
            const classList = document.querySelector('uni-page').classList
            classList.add('page-transform')
        }
    },
    // #endif
}
</script>