<template>
    <Layout>
        <nav>
                <div class="tabs">
                    <router-link :to="`/account`" >
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#goback"></use>
                        </svg>
                    </router-link>
                </div>

                <div class="user">
                    <router-link :to="`/account`" >
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#user"></use>
                        </svg>
                    </router-link>
                    
                </div>
        </nav>

        <div class="form-wrapper">
            <div class="input">
                <FormItem  
                fieldName="账户名称"
                placeholder="请输入账户名称" 
                :value="this.initList.title"
                @update:value="updateTitle($event)"
                />
            </div>

            <div class="input">
                <FormItem  
                fieldName="账户余额"
                placeholder="请输入账户余额" 
                :value="this.initList.amount"
                @update:value="updateAmount($event)"
                />
            </div>
        </div>

        <div class="button-wrapper" >
            <Button class="button" @click="submit"> 
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#true"></use>
                </svg>
            </Button>

            <Button class="button" >
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#false"></use>
                </svg>
            </Button>
        </div>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator';
import FormItem from '../components/Money/FormItem.vue';
import Button from '../components/Money/Button.vue';
import store from '@/store';

@Component({
    components:{FormItem,Button},
})
export default class CreateAccount extends Vue{
    get initList(){
        return {
                amount:'0',
                icon:'',
                id:'',
                title:''
            }
    }
    updateTitle(value: string){
       this.initList.title = value
    }
    updateAmount(value: string){
      this.initList.amount = value
    }

    submit(){
        store.commit('createAccount',this.initList)
        this.$router.push('./account')
    }
}
</script>

<style lang="scss" scoped>
.form-wrapper{

    box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin:15px  auto 30px auto;
    width: 90%;
    color: #1D3D57;
    .input{

        margin-bottom:10px ;
    }
}
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
</style>