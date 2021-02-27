<template>
    <div class="wrapper" ref='wrapper'>
    </div>
</template>

<script lang='ts'>
import {Component,Prop,Vue} from 'vue-property-decorator'
import echarts,{EChartsOption} from 'echarts';


@Component
export default class Chart extends Vue {
    @Prop() options?:EChartsOption
    mounted(){
        console.log(this.$refs.wrapper)
        if(this.options === undefined){
            return console.error('option 为空')
        }
        const chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
        chart.setOption(this.options!)
    }
    
}
</script>

<style lang="scss" scoped>
    .wrapper{
        height:400px
    }
</style>1