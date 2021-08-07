<template>
    <div class="tags">
        <nav>
            <div class="tag">
                <router-link :to="`/labels`" >
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#jianhao"></use>
                    </svg>
                </router-link>
                <span class="title">记账</span>
            </div>

            <div class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
               
                    <li v-for="item in dataSource" :key="item.value"
                        class="tabs-item"
                        :class="liClass(item)"
                        @click="select(item)">
                            <span>{{item.text}}</span>
                    </li>
                
            </div>

            <div class="user">
                <router-link :to="`/account`" >
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#user"></use>
                    </svg>
                </router-link>
                
            </div>
        </nav>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

type DataSourceItem = {text:string,value:string}

@Component
export default class Tabs extends Vue{
   @Prop({required:true,type:Array})
   dataSource!:DataSourceItem[]
    @Prop(String) readonly value!:string
    @Prop(String) classPrefix?:string

    liClass(item:DataSourceItem){
        return {
            [this.classPrefix + '-tabs-item']: this.classPrefix,
            selected: item.value === this.value
        }
    }

    select(item:DataSourceItem){
        this.$emit('update:value',item.value)
    }
}
</script>

<style lang="scss" scoped>
.tags{

    display: flex;
    justify-content: space-around;
    nav{
        display: flex;
        justify-content: space-between;
        color: #1CB2EB;
        width: 100vw;
        padding: 0 22px;
        padding-top:32px;
        .tag{

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
        .tabs {
            height: 72%;
            color: #fff;

            display: flex;
            width: 85px;
            justify-content: space-between;
            margin-left: -50px;
            .tabs-item {
                list-style: none;
                &.selected{
                    border-bottom: 3px solid #F5C23B;
                }
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
}
</style>