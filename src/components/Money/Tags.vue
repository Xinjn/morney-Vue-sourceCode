<template>
    <div class="tags">
        <ul class="current">
            <li v-for="tag in tagList" :key="tag.id" :class="{selected:selectedTags.indexOf(tag)>=0}" @click="toggle(tag)" >
              
                    <div class="iconWrapper">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="`#${tag.icon}`"></use>
                        </svg>
                    </div>
                    <span>{{tag.name}}</span>
            </li>
            <li>        
                <div class="new">
                    <Icon name="add"  class="add"  @click="createTag"/>
                </div>
            </li>
        </ul>

    </div>
</template>

<script lang="ts">

import TagHelper from '@/mixins/TagHelper'

import { mixins } from 'vue-class-component'
import {Component} from 'vue-property-decorator'

@Component
export default class Tags extends mixins(TagHelper){
    get tagList(){
        return this.$store.state.tagList
    }
    created(){
        this.$store.commit('fetchTags')
    }
  
  selectedTags:string[] = []

  toggle(tag:string){
      const index = this.selectedTags.indexOf(tag)
      if(index >= 0){
          this.selectedTags.splice(index,1)
      }else {
          this.selectedTags.push(tag)
      }
      this.$emit('update:value',this.selectedTags)
  }
}
</script>

<style lang="scss" scoped>
 .tags {
    // border: 1px solid red;
    display: flex;
    // height: 160px;
    // overflow:auto;
    .new{
        .add{
            width: 47px;
            height:69px ;
            line-height:60px;
        }
    }
    > .current {
        color: #fff;
        display: flex;
        flex-wrap: wrap;
        > li{  

            margin:0 17px 10px 17px;
            margin-right:10px ;
            text-align: center;
            .iconWrapper{

                width: 47px;
                height:47px ;
                line-height: 55px;
                border-radius: 12px;
                background:#1CB2EB;
                .icon{
                    margin-top: 9px;
                    width:30px;
                    height: 30px;
                    vertical-align: -0.15em;
                    fill: currentColor;
                    overflow: hidden;
                }
            }
        }
        >li.selected >.iconWrapper{
    
                background:#F5C23B;
        }
    }
 }
</style>