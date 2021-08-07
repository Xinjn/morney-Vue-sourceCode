<template>
<div class="numberPad">
    <div class="buttonwrapper">
        <div class="buttons">
            <button @click="inputContent" >1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="clear">清空</button>
            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            
            <button @click="remove">+</button>
            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button @click="clear">-</button>
           
          
            <button @click="inputContent">.</button>
            <button @click="inputContent" class="zero">0</button>
            <button @click="remove">删除</button>
            
            <button @click="ok" class="ok">完成</button>
        </div>
    </div>
</div>

</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator';


@Component
export default class NumberPad extends Vue{
  @Prop(Number) readonly value!: number;
  output = this.value.toString()

  inputContent(event: MouseEvent){
      const button = (event?.target as HTMLButtonElement)
      const input = button.textContent!
      if(this.output.length === 16){return}
      if(this.output === '0'){
          if('0123456789'.indexOf(input)>= 0){
              this.output = input
          }else {
              this.output += input
          }
          return
      }
      if(this.output.indexOf('.') >= 0 && input === '.'){return}
      this.output += input

        
        // const but = document.getElementsByTagName("button");
        // console.log(but);
        
        // but[0].addEventListener("touchstart", function(){
        // console.log('1')
        // but[0].style.background="#f5c23b"
        // });

        // but[0].addEventListener('touchend',function(){
        // but[0].style.background="#fff"
        // })
        
  }
  remove(){
      if(this.output.length === 1){
           this.output = '0'
      }else{
            this.output = this.output.slice(0,-1)
      }
  }
  clear(){
      this.output = '0'
  }

  
  ok(){
      const number = parseFloat(this.output)
      this.$emit('update:value',number)
      this.$emit('submit',number)
      this.output = '0'
  }
    @Watch('output')
    getOutput(){
        this.$emit('output',this.output)
    }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
 .numberPad {

     background: #fff;
     .buttonwrapper{
         display: flex;
         justify-content: center;
        .buttons{
            // border: 1px solid red;
            width: 100%;
            height: 290px;
            button {
                background: #fff;
                border: none;
                width: 25%;
                height:72.5px;
            }
            // button:hover{
            //     background: #f5c23b;
            // }
            .ok{
                background: #f5c23b;
     
            }
         }
        
     }
 }
</style>