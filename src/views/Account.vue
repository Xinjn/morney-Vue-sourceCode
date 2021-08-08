<template>
    <Layout>
            <nav>
                <div class="tabs">
                    <router-link :to="``" >
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#jianhao"></use>
                        </svg>
                    </router-link>
                    <span class="title">账户</span>
                </div>
                <div class="user">
                    <router-link :to="`/account`" >
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#user"></use>
                        </svg>
                    </router-link>
                    
                </div>

            </nav>

            <div class="head">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#user"></use>
                </svg>
                <p class="name">用户</p>
            </div>
            <div class="acTotal">
                <span>资金账户</span><span>余额：{{this.total}}</span>
            </div>
            <div class="accountwrapper">
                <router-link class="accountmain" v-for="account,index in accounts" :key="index" :to="`/account/edit/${account.id}`" >
                
                <div class="account">
                    <p>{{account.title}}</p>
                    <div class="iconWrapper">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="`#card`"></use>
                        </svg>
                    </div>
                    <p><Icon name="shenglue" class="shenglue"/></p>
                </div>
                
            </router-link>
            
            </div>

            <div class="createAccount-wrapper">
                <router-link :to="`/createAccount`" >
                <div class="createAccount">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#add"></use>
                    </svg>
                </div>
                </router-link>
            </div>

    </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import Button from '../components/Money/Button.vue';

@Component ({
    components:{Button},
})
export default class Account extends Vue{
    beforeCreate(){
        this.$store.commit('fetchAccount')
    }
    get accounts(){
        return this.$store.state.accountList
    }
    get total(){
        let result =  0
        const newList= this.$store.state.accountList 
        console.log(newList);
        for (let i = 0; i < newList.length; i++) {
           result += parseInt(newList[i].amount)
        }
        return result
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
                position: relative;
                text-align: center;
                filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));
                .icon{
                    margin-top: 5px;
                    margin-left: 5px;
                    left: 0;
                    position: absolute;
                    width:20px;
                    height: 20px;
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
.head{

    text-align: center;
    color:#fff;
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));
    .icon{
        margin-top:15px;
        width: 94px;
        height: 94px;

        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
    .name{
        margin-top:10px ;
        font-family: ABeeZee;
        font-weight: normal;
        font-size: 20px;
        line-height: 22px;
        color: #FFFFFF;
    }
}
.acTotal{
    // border: 1px solid red;
    color: #fff;
    display: flex;
    justify-content: space-between;
    margin: 0 22px;
}
.createAccount-wrapper{
    position: fixed;
    bottom:67px;
    right:19px;
    text-align: center;
    filter: drop-shadow(4px 4px 5px rgba(0, 0, 0, 0.1));
    .createAccount {
        background: white;
        border-radius: 50%;
        width: 57.61px;
        height: 57.61px;
        display: flex;
        justify-content: center;
        color: #1cb2eb;
        .icon{
            margin-top:15px ;
            width: 25px;
            height: 25px;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        }
    }
}
@media(min-width:360px){
        .icon{
            // border: 1px solid red;
        }
}

.accountwrapper{
display: flex;
justify-content: space-between;
flex-wrap: wrap ;
margin: 5px  22px  95px 22px;
// margin-right:-10px ;
// border: 1px solid red;
.accountmain {

    margin-bottom: 22px;
    // margin-right:15px ;
    .account{
        font-size:16px;
        width: 100px;
        height: 128px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        background: white;
        color: #1D3D57;
        .iconWrapper{
            // border: 1px solid red;
            background: #1CB2EB;
            border-radius: 100%;
            width: 36px;
            height: 36px;
            text-align: center;
            line-height: 43px;
            .icon{
                width: 25px;
                height: 25px;
                vertical-align: -0.15em;
                fill: currentColor;
                overflow: hidden;
                color: #fff;
            }
        }
        .shenglue{
        display: inline;
        color: #1CB2EB;
        }
    }
    
}
}
</style> 
