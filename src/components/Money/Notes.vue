<template>
            <div>
                <label class="formItem">
                    <!-- <span class="name">{{this.fieldName}}</span> -->

                        <input type= 'text' :value="value"
                        @input="onValueChanged($event.target.value)" :placeholder="placeholder" />
                  
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
    
    // @Prop({required:true}) fieldName!:string
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
        text-align: center;
        color: #1CB2EB;
        border-radius: 9px; 
        width: 100%;
        border: none;

    }
 }
</style>