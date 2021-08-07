<template>
            <div>
                <label class="formItem">
                        <input :type="type || 'text'" :value="x(value)"
                        @input="onValueChanged($event.target.value)" :placeholder="placeholder"/>
                </label>
            </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import Vue from 'vue'
import {Component,Prop,Watch} from 'vue-property-decorator'

@Component
export default class FormItem extends Vue{
    @Prop({default:''}) readonly value!:string
    @Prop() placeholder?:string
    @Prop() type?:string
    
    onValueChanged(value:string){
       this.$emit('update:value',value)
    }
    x(isoString:string){
        return dayjs(isoString).format('YYYY-MM-DD')
    }
}
</script>

<style lang="scss" scoped>
 .formItem{

     input{
               border: 1px solid red;
        background: #fff;
        text-align: center;
        color: #1CB2EB;
        border: none;
                    appearance: none;
        // width: 100%;
        // margin-bottom: 10px;
        // padding-left: 10px;
     }
 }
</style>