<template>
    <Layout>
        <nav>
                <div class="tabs">
                    <router-link :to="`/statistics`" >
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#goback"></use>
                        </svg>
                    </router-link>
                </div>

                <div class="user">
                    <router-link :to="`/statistics`" >
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#user"></use>
                        </svg>
                    </router-link>
                    
                </div>
        </nav>

        <div class="form-wrapper">
            <div class="input">
                <FormItem  
                fieldName="账户类型"
                placeholder="请输入账户类型" 
                :value ="this.currentRecord[0].account"
                />
            </div>
            <div class="input">
                <FormItem  
                fieldName="金额"
                placeholder="请输入金额" 
                :value ="this.currentRecord[0].amount"
                />
            </div>
            <div class="input">
                <FormItem  
                fieldName="类型"
                placeholder="请输入类型" 
                :value ="this.currentRecord[0].type === '-'? '支出': '收入' "
                />
            </div>
            <div class="input">
                <FormItem  
                fieldName="备注"
                placeholder="暂无备注" 
                :value ="this.currentRecord[0].notes"
                />
            </div>
            <div class="input">
                <FormItem  
                fieldName="日期"
                placeholder="请输入日期" 
                :value ="beautify(this.currentRecord[0].createdAt)"
                />
            </div>
        </div>
        
        <div class="removeTag">
            <Button class="button" @click="remove">删除标签</Button>
        </div>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator';
import FormItem from '../components/Money/FormItem.vue';
import Button from '../components/Money/Button.vue';
import store from '@/store';
import router from '../router/index';
import day from 'dayjs'
import dayjs from 'dayjs'
@Component({
    components:{FormItem,Button},
})
export default class EditAccount extends Vue{
    created() {
        store.commit('fetchRecords')
        const id = this.$route.params.id
        store.commit('setcurrentRecord',id)
    }
    get currentRecord(){
        return this.$store.state.currentRecord
    }
    beautify(string: string){
        const day = dayjs(string)
        return day.format('MM月DD日')
    }
    remove(){
        console.log('删除标签');
        const id = this.$route.params.id
        store.commit('removeCurrentRecord',id)
        
    }
}
</script>

<style lang="scss" scoped>
nav{
display: flex;
// align-items: center;
justify-content: space-between;
color: #1CB2EB;
width: 100vw;
padding: 0 22px;
padding-top:32px;
.tabs{
    background: #fff;
    width: 90px;
    height: 30px;
    border-radius: 50px;
    line-height: 30px;
    text-align: center;
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));
    text-align: center;
    .icon{

        width: 30px;
        height: 30px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
    .title{
        font-family: ABeeZee;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
    }
}
.user {
    color:#fff;
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));
    .icon{
        width: 36px;
        height: 36px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
    
}
}
.form-wrapper{


    border-radius: 10px;
    margin:15px  auto 30px auto;
    width: 90%;
    color: #1D3D57;
    .input{
        box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.1);
        margin-bottom:10px ;
    }
}
.button-wrapper{
position: fixed;
width: 100%;
text-align: center;
filter: drop-shadow(4px 4px 5px rgba(0, 0, 0, 0.1));
.button {
    background: white;
    border-radius: 50%;
    width: 57.61px;
    height: 57.61px;
    margin: 0 15px;
    padding-top:5px;
    .icon{

        width: 25px;
        height: 25px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
}
}
.removeTag{

    position: fixed;
    bottom: 90px;
    width: 100%;
    text-align: center;
    button{

        border-radius: 25px;
    }
}
</style>