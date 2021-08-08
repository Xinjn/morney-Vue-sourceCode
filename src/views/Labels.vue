<template>
    <Layout>
        <div class="tags">

            <nav>
                <div class="tabs">
                    <router-link :to="`/labels`" >
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#jianhao"></use>
                        </svg>
                    </router-link>
                    <span class="title">标签</span>
                </div>

                 <div class="user">
                    <router-link :to="`/account`" >
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#user"></use>
                        </svg>
                    </router-link>
                    
                </div>
            </nav>

            <div class="tagwrapper">
                <router-link class="tagmain" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`" >

                <div class="tag">
                    <p>{{tag.name}}</p>
                    <div class="iconWrapper">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="`#${tag.icon}`"></use>
                        </svg>
                    </div>
                    <p><Icon name="shenglue" class="shenglue"/></p>
                </div>
                
            </router-link>
            </div>
        </div>
        
        
        <div class="createTag-wrapper">
            <div class="createTag" @click="createTag">
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#add"></use>
                </svg>
            </div>
        </div>
    </Layout>
</template>

<script lang="ts">

import { mixins } from 'vue-class-component';
import {Component} from 'vue-property-decorator'
import Button from '../components/Money/Button.vue';
import TagHelper from '../mixins/TagHelper';

@Component ({
    components:{Button},

})
export default class Labels extends mixins(TagHelper){
    beforeCreate(){
        this.$store.commit('fetchTags')

    }

    get tags(){
        return this.$store.state.tagList
    }

}
</script>

<style lang="scss" scoped>
 .tags{
     
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap ;
                   
    nav{
            display: flex;
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
  
    .tagwrapper{
                    // border: 1px solid red;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap ;
        margin: 15px  22px  95px 22px;
        // margin-right:-10px ;
        .tagmain {
            
            margin-bottom: 22px;
            // margin-right:15px ;
            .tag{
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
    
 }
 .createTag-wrapper{
    position: fixed;
    bottom:67px;
    right:19px;
    text-align: center;
    filter: drop-shadow(4px 4px 5px rgba(0, 0, 0, 0.1));
    .createTag {
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

</style>