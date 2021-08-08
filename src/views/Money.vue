<template>
    <div class="content">
          
            <Tabs :data-source='recordTyedList' :value.sync="record.type" class="Tabs"/>
            <div class="layout">
               
                <div class="wrapper" :class="showInput ? 'show' : 'hidden' ">
                    <main >
                         
                        <div class="option">
                            
                            <select id="group" @input="updateAccount">
                                <option v-for="account in this.accounts" :key="account.id" >
                                    {{account.title}}
                                </option>
                                
                            </select>
                           <div class="triangle"></div>

                        </div>

                       
                        <div class="date">
                            <Dates 
                            type="date"
                            placeholder="在这里输入日期"
                            :value.sync="record.createdAt"/>
                        </div>
                        

                        <div class="notes">
                            <Notes fieldName="备注"
                            placeholder="点击填写备注"
                            :value.sync="record.notes"/>
                        </div>
                    </main>
                    <!-- 计算器 -->
                    <NumberPad :value.sync="record.amount" @submit="saveRecord" @output="show" class="NumberPad" :class="showInput ? 'show' : 'hidden' "/>
                </div>
                <Tags @update:value="record.tags = $event" class="Tags"/>
                <div class="output" @click="visibilty">
                    <input id="onInput" type="text" :value="output" style="direction: rtl;"/>
                </div>

                
            </div>
            
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NumberPad from "@/components/Money/NumberPad.vue"
import FormItem from "@/components/Money/FormItem.vue"
import Tags from "@/components/Money/Tags.vue"
import {Component} from 'vue-property-decorator'
import recordTyedList from '@/constant/recordTyedList';
import Tabs from "@/components/Tabs.vue"
import Dates from "@/components/Money/Dates.vue"
import Notes from "@/components/Money/Notes.vue"
import createId from '@/lib/createId'
import Layout from '@/components/Layout.vue'


@Component({
    components:{NumberPad,Tabs,FormItem,Tags,Dates,Notes, Layout}
})
export default class Money extends Vue{
    updateAccount(e: { target: { value: string } }){
        this.record.account = e.target.value
    }
    get recordList(){
         return this.$store.state.recordList
        
    }
    get accounts(){
        return this.$store.state.accountList
    }
    recordTyedList = recordTyedList
    
    record: RecordItem = {
        tags:[],notes:'',type:'-',amount:0,createdAt:new Date().toISOString(),id:'',
        account:''
    }
    output = '0'

    created(){
        this.$store.commit('fetchRecords')
        this.$store.commit('fetchAccount')
        this.record.account = this.accounts[0].title
    }
    onUpdateNotes(value: string){
        this.record.notes = value
    }
    onUpdateAmount(value: string){
        this.record.amount = parseFloat(value)
    }

    saveRecord(){
        if(!this.record.tags || this.record.tags.length === 0){
            return window.alert('请至少选择一个标签')
        }
        this.record.id = createId().toString()
        this.$store.commit('createRecord',this.record)
        if(this.$store.state.createRecordError === null){
            window.alert('已保存')
            this.record.notes = ''
        }
        this.$router.push('/statistics')
    }

    show(value:string){
       this.output = value
    }

    showInput = true
    visibilty(){
        this.showInput = !this.showInput
        console.log(this.showInput);
        
    }

}
</script>

<style lang="scss" scoped>
.layout{
    display: flex;
    flex-direction: column-reverse;
    // border: 1px solid red;
    
    .wrapper{
        // border: 1px solid black;
        z-index: 1;
        bottom: 0;
        left: 0;
        position: absolute;
        width: 100%;
        // opacity: 0.5;
        main{

            height: 44.57px;
            background: #fff;
            display: flex;
            background: #FFFFFF;
            border-bottom: 2px solid rgba(0, 0, 0, 0.055);
            line-height:44.57px ;
            text-align: center;
            justify-content: center;
            align-content: center;
            .option{
                width: 33.33%;
                // border: 1px solid red;
                position: relative;
                >.triangle{
                    
                    position: absolute;
                    border-width: 5px;
                    top: 20px;
                    right: 15px;
                    border-style: solid; 
                    border-color: #1CB2EB transparent  transparent  transparent ;
                    
                }
                >select{
                        border: none;
                        outline: none;
                        color: #1CB2EB;
                        text-align: center;
                         appearance: none;
                        //  border: 1px solid red;
                           font-size: 16px;

                        option{
                            
                            // background: #1CB2EB;
                            color: #1CB2EB;
                            // border-bottom:5px solid red ;
                            // outline:1px solid red
                        }
                        
                }
            }
            .date{
                width: 33.33%;
                // border: 1px solid red;
                background: #fff;
                overflow: hidden;
            }
            .notes{
                overflow: hidden;
                width: 33.33%;
            }
        }
    }
    .output{
    // border: 1px solid red;
    background: #fff;  
    margin:15px 22px;
    height: 85px;
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    text-align: center;
    // line-height: 85px;
    input{
    //   border: 1px solid red;
        border:none;
        height: 50%;
        float: right;
        margin-top: 7%;
        margin-right: 15px;
        text-align: cen;
    }
    }
    .Tags{
        height: 150px;
        overflow:auto;
    }
}
.hidden{
    display: none;
}

#onInput{
    // border: 1px solid red;
    pointer-events: none;
}

@media screen and (max-width: 414px) { //小于 414px 像素则修改
    .layout{
        // padding-bottom:330px; 
    }
}

@media screen and (max-width: 320px) { //小于 320px 像素则修改
    .layout{
      .wrapper{
          height: 250px;
      }
    }
}

</style>
