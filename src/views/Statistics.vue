<template>
    <Layout>
        <Tabs :data-source='recordTyedList' :value.sync="type"/>
        <div class="total">
            <div class="account">
            <select id="group" @input="updateAccount($event)">
                <option v-for="account in this.accounts" :key="account.id">
                    {{account.title}}
                </option>
            </select>
            <div class="triangle"></div>
            </div>

            <div class="title">
                <span>账户结余</span>
                <span>预算</span>
            </div>
            <div class="amount">
                <span>{{this.balance >0  ? '+'+this.balance:this.balance }}</span>
                <span>{{this.budget.amount}}</span>
            </div>
               
                
            <div class="totalshow">
                <span class="totalRev">总收入</span>
                <span>{{this.total.Rev}}</span>
                <span class="line">|</span>
                <span class="totalExpe">总支出</span>
                <span>{{this.total.Expe}}</span>
            </div>
                

            <div class="behand">

            </div>
        </div>

        <main>
           
            <div class="top">
                <input type="month" :value="this.newDate" @input="updateDate($event)">
                <div class="triangle"></div>
            </div>
            
            <div class="chart-wrapper" ref="chartWrapper">
                <Chart class="chart"  :options='chartOption' />
            </div>

            <div class="chart-wrapper" ref="chartWrapper">
                <Chart class="chart"  :options='chartOption2' />
            </div>
                
            <div class="chart-wrapper" ref="chartWrapper">
                <Chart class="chart"  :options='chartOption3' />
            </div>
            <div class="behand">
            </div>
        </main>
    
        <div class="itemWrapper">
            <div class="amountTitle">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#jianhao"></use>
                </svg>
                <span>账单汇总</span>
                </div>
            <ol v-if="groupedList.length > 0">
                <li v-for="(group,index) in groupedList" :key="index" class="group">
                    <h3 class="title">
                        <span>{{beautify(group.title)}}</span>
                        <span>
                            <span>{{type === '-' ? '支出':'收入'}}</span>
                            {{group.total}}
                        </span>
             
                    </h3>
                    <ol class="record">
                        
                        <router-link v-for="item in group.items" :key="item.id" :to="`/money/edit/${item.id}`">
     
                            <li >
                                <div class="iconWrapper">
                                    <svg class="icon" aria-hidden="true">
                                        <use :xlink:href="`#${iconString(item.tags)}`"></use>
                                    </svg>
                                </div>

                                <span>{{tagString(item.tags)}}</span>
                                <span class="notes">{{item.notes}}</span>
                                <span>{{item.amount}}</span>
                            </li>
                        </router-link>
                    </ol>
                </li>
            </ol>
            <div v-else class='noResult'>
                目前没有相关记录哦~
            </div>
        </div>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import Tabs from '@/components/Tabs.vue';
import recordTyedList from '@/constant/recordTyedList';
import dayjs from 'dayjs'
import clone from '@/lib/clone';
import Chart from '../components/Chart.vue';
import Chart2 from '../components/Chart2.vue';
import Chart3 from '../components/Chart3.vue';
import * as _ from "lodash";
import echarts,{EChartOption, ECharts} from 'echarts';
import Dates from "@/components/Money/Dates.vue"

@Component({
    components:{Tabs,Chart,Chart2,Chart3,Dates}
})
export default class Statistics extends Vue{
    type = '-'
    recordTyedList = recordTyedList
    newDate = dayjs(new Date()).format("YYYY-MM")
    curAccount = ''
    // beforeCreate(){
    //     this.$store.commit('fetchRecords')
    //     this.$store.commit('fetchAccount') 
    // }
    created() {
        this.$store.commit('fetchRecords')
        this.$store.commit('fetchAccount') 
        this.curAccount = this.$store.state.accountList[0].title
        console.log(this.$store.state.accountList);
        
    }
    get accounts(){
        return this.$store.state.accountList
    }
    get total (){  
              const curAccount = this.curAccount
        const recordList = this.$store.state.recordList

        let Rev = 0  //总收入
        let Expe = 0    //总支出
        for (let i = 0; i < recordList.length; i++) {
            if(curAccount === recordList[i].account){
               
                // console.log(recordList[i].amount);
                // console.log(recordList[i].type);
                if(recordList[i].type === '+'){
                    Rev = Rev + recordList[i].amount
                }else{
                    Expe = Expe + recordList[i].amount
                }
            }
        }
        return {Rev,Expe}
    }
    get budget (){
        const curAccount = this.curAccount

        const accountList = this.$store.state.accountList

        for (let i = 0; i < accountList.length; i++) {
            if(curAccount === accountList[i].title){


                return accountList[i]
            }
        }
        return 0
    }
    get balance() { //结余 = 预算+总收入+总支出
        const Rev = this.total.Rev //总收入
        const Expe = this.total.Expe  //总支出
        const budget = parseInt(this.budget.amount) //预算
        const total = budget+Rev-Expe
        return total
    }
    
    updateAccount(e: { target: { value: string }}){
        this.curAccount = e.target.value
    }
    
    updateDate(e: any){
        this.newDate = e.target.value
    }

    tagString(tags: Tag[]){
        return tags.length === 0 ? '无' : tags.map(t => t.name).join('，')
    }

    iconString(tags: Tag[]){
        return tags.length === 0 ? '无' : tags.map(t => t.icon).join('，')
    }
    mounted(){
        const div = (this.$refs.chartWrapper as HTMLDivElement)
        div.scrollLeft = div.scrollWidth
    }
    beautify(string: string){
        const day = dayjs(string)
        
        const now = dayjs()
        
        if(day.isSame(now,'day')){
           
            return day.format('MM月DD日') +' '+ '今天'

        }else if(day.isSame(now.subtract(1,'day'),'day')){
            
            return day.format('MM月DD日') +' '+'昨天'
        }else if(day.isSame(now.subtract(2,'day'),'day')){
            
            return day.format('MM月DD日') +' '+'前天'
        }else if(day.isSame(now,'year')){
            return day.format('MM月DD日')
        }else{
            return day.format('YYYY年M月D日')
        }
    }
    get keyValueList(){
        const array = []

        const curyears = new Date().getFullYear() //当前年
        const curMouth = new Date().getMonth()+1 // 当月
        const mouthdays = dayjs(curMouth).daysInMonth(); //当前月天数

        const mouthLastday = this.newDate.concat('-'+mouthdays.toString()) 

        for(let i = 0;i <= mouthdays-1;i++){
            const dateString = dayjs(mouthLastday)
                .subtract(i,'day').format('YYYY-MM-DD')
            
            const found = _.find(this.groupedList,{title:dateString})

            array.push({
                date:dateString,value:found ? found.total : 0,tags:found ? found.items[0].tags[0].name: ''
            })
        }

        array.sort((a,b) => {
            if(a.date > b.date){
                return 1
            }else if(a.date === b.date){
                return 0
            }else{
                return -1
            }
        })
        
        
        return array
    }
    get chartOption() {
        const keys = this.keyValueList.map(item => item.date)
        const values = this.keyValueList.map(item => item.value)
       
        return {
            xAxis: {
            type: 'category',
            data: keys
            },
            yAxis: {
            type: 'value'
            },
            series: [{
            data: values,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
            
            },
            itemStyle: {
            color: "#239BF4"
            }
            }]
        }
    }

    get chartOption2() {
        
        const value =  this.groupedList.map(item => { // {value: 1048, name: '搜索引擎'}
            return {value: item.total, name: item.items[0].tags[0].name}
         } 
        )

        return {
            tooltip: {
            trigger: 'item'
            },
            legend: {
            top: '5%',
            left: 'center'
            },
            series: [
            {
            name: 'zan',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: [10, 10],
                // borderColor: '#fff',
                borderWidth: 2,
                // color: "#239BF4"
            },
            label: {
                show: false,
                position: 'center',
                color: "#239BF4"
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold',
                    
                }
            },
            labelLine: {
                show: false
            },
            data:value
                // [
                //     {value: 1048, name: '搜索引擎'},
                //     {value: 735, name: '直接访问'},
                //     {value: 580, name: '邮件营销'},
                //     {value: 484, name: '联盟广告'},
                //     {value: 300, name: '视频广告'}
                // ]
            }
            ]
        }
    }
    get chartOption3() {
        
        const keys = this.keyValueList.map(item => item.date)

        const values = this.keyValueList.map(item => item.value)
        return {
            color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
            title: {
            // text: '渐变堆叠面积图'
            },
            tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'cross',
            label: {
            backgroundColor: '#6a7985'
            }
            }
            },
            legend: {
            data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
            },

            grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
            },
            xAxis: [
            {
            type: 'category',
            boundaryGap: false,
            data: keys
            }
            ],
            yAxis: [
            {
            type: 'value'
            }
            ],
            series: [
            {
            name: 'Line 1',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
            width: 0
            },
            showSymbol: false,
            areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(128, 255, 165)'
            }, {
                offset: 1,
                color: 'rgba(1, 191, 236)'
            }])
            },
            emphasis: {
            focus: 'series'
            },
            data: values
            },
            ]
        }
    }

    get recordList(){
        return (this.$store.state as RootState).recordList
    }
    get groupedList() {  
        const {recordList} = this
        const newList = clone(recordList)
            .filter(r => r.type === this.type)
            .sort((a,b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
        
        
        type Result = {title:string,total?:number,items:RecordItem[]}[]
        if(newList.length === 0){return []}
        
        const result:Result = [{
            title:dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items:[newList[0]]
        }]
        
        
        for(let i = 1;i<newList.length;i++){
            const current = newList[i]
            
            const last = result[result.length - 1]
            
            if(dayjs(last.title).isSame(dayjs(current.createdAt),'day')){
                last.items.push(current)

            }else{
                result.push({title:dayjs(current.createdAt).format('YYYY-MM-DD'),items:[current]})
            }
        }
        
        result.map(group => {
            group.total = group.items.reduce((sum,item) => sum + item.amount,0)
            
        })


       
        return result
        
    }


}
</script>

<style lang="scss" scoped>
::v-deep {
    .type-tabs-item{
        &.selected {
                background: white;
                &::after{
                    display: none;
                }
        }
    }
    .interval-tabs-item {
        height:48px;
    }
}
.total{
    background: #fff;
    margin:20px 20px 0 20px;
    border-radius: 10px;
    padding: 10px;
    position: relative;
    margin-bottom: 30px;
    
    >.account{
        // border: 1px solid red;
        position: absolute;
        text-align: center;
        top: -15px;
        left: 0;
        width:108px ;
        height: 25px;
        >.triangle{
            
            position: absolute;
            border-width: 5px;
            top: 10px;
            right: 22px;
            border-style: solid; 
            border-color: #1CB2EB transparent  transparent  transparent;
        }
        select{
            margin-right: 15px;
            font-size: 13px;
            appearance: none;
            color: #1CB2EB;
            border: none;
        }
    }
    >.behand{

        position: absolute;
        text-align: center;
        top: -15px;
        left: 0;
        width:108px ;
        height: 50px;
        background: #fff;
        border-radius: 20px;
        overflow: hidden;
        z-index: -1;
    }

    >.title{
            display: flex;
            justify-content:space-between;
            // border: 1px solid red;
            margin-top:20px;
            font-weight: bold;
    }
    >.amount{
            font-family: ABeeZee;
            font-weight: normal;
            font-size: 24px;
            display: flex;
            justify-content:space-between;
            margin:10px 0;
    }
    .totalshow{
        // border: 1px solid red;
        font-family: ABeeZee;

        margin:20px 0;
        >.totalRev{
            background: #95D87E;
            border-radius: 30px;
            padding: 3px 5px;
            font-size: 8px;
            color: #fff;
            margin-right: 5px;
        }
        >.totalExpe{
            background: #F49E9D;
            border-radius: 30px;
            padding: 3px 5px;
            font-size: 8px;
            color: #fff;
            margin-right: 5px;
        }
        >.line{
             margin: 0 10px;
        }
    }
}
main{
    background: #fff;
    margin:20px 20px 0 20px;
    border-radius: 10px;
    position: relative;
    .chart {
    border-radius: 10px;
    margin:17px;
    &-wrapper{
    overflow:auto;
    &::-webkit-scrollbar{
        display:none;
    }
    }
    }
    .top{
        position: absolute;
        text-align: center;
        top: -13px;
        width:100px;
        height: 50px;
        left: 18px;
        >.triangle{
            position: absolute;
            border-width: 5px;
            top: 10px;
            right: 7px;
            border-style: solid; 
            border-color: #1CB2EB transparent  transparent  transparent;
        }
        input{
            width: 112%;
           border:none;
           color: #1CB2EB;
           background: none;
           font-size: 14px;
        }
    }
    .behand{
        position: absolute;
        text-align: center;
        top: -15px;
        left: 0;
        width:120px ;
        height: 50px;
        background: #fff;
        border-radius: 20px;
        overflow: hidden;
        z-index: -1;
    }
}
.itemWrapper{

padding-bottom:23px;
margin: 17px;
border-radius: 10px;
margin-bottom: 67px;
.amountTitle{

    background: #fff;
    height: 33px;
    border-radius: 40px;
    width: 219px;
    margin:  0 auto;
    text-align: center;
    line-height: 33px;
    position: relative;
    font-weight:bold ;
    color: #239BF4;
    .icon{
        margin-top: 6px;
        margin-left: 5px;
        left: 0;
        color: #239BF4;
        position: absolute;
        width:20px;
        height: 20px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        }
}
%item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
}
.group{
    // padding:23px 23px 0 23px;
        color: #fff;
        
    .title {

        display: flex;
        justify-content: space-between;
        text-align: center;
        // margin-bottom: 16px;
        :nth-child(1){
        // background: #239BF4;
        // box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.1);
        border-radius: 50px;
        // width: 150px;
        height: 40px;
        line-height: 40px;
        }
        :nth-child(2){
        // background: #239BF4;
        // box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.1);
        border-radius: 50px;
        // width: 76px;
        height: 40px;
        line-height: 40px;
        }
    }
    .record {

        li{
            box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            background: #fff;
            // border: 1px solid red;
            line-height: 72px;
            height: 72px;
            color: #000000;
            display: flex;
            margin-bottom: 13px;
            justify-content: space-between;
            padding: 0 20px;
                .iconWrapper{
                    margin-top: 18px;
                    margin-right: 15px;
                    background: #1CB2EB;
                    border-radius: 100%;
                    width: 36px;
                    height: 36px;
                    text-align: center;
                    line-height: 43px;
                    .icon{
                        margin-top:6px ;
                        width: 25px;
                        height: 25px;
                        vertical-align: -0.15em;
                        fill: currentColor;
                        overflow: hidden;
                        color: #fff;
                    }
             }

        }
    }
}
.notes {
    margin-right: auto;
    margin-left: 16px;
    color:#999;
}
.noResult{
    padding: 16px;
    text-align: center;
}
}

</style>

