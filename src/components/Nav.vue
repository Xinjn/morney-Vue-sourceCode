<template>
    <nav>

      <div class="top">
        <router-link to="/money" class="item" active-class="selected">
         <!-- <Icon name="zhangben" class="zhangben"/> -->
         <svg class="icon" aria-hidden="true">
            <use xlink:href="#zhangben"></use>
        </svg>
        </router-link>
      </div>


      <div class="side"> 


                        <router-link to="/labels" class="item" active-class="selected">
          <!-- <Icon name="tags"/> -->
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#tags"></use>
        </svg>
          </router-link>
  

    
            <router-link to="/statistics" class="item" active-class="selected">
              <!-- <Icon name="liebiao"/> -->
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#tongji"></use>
            </svg>
          </router-link>


      </div>


    </nav>
</template>

<script lang="ts">
export default {
  name:'Nav'
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
 nav {
  // border: 1px solid red;
  position: fixed;
  bottom: -2px;
  width: 100%;
  background: #fff;
  color:#1CB2EB ;
  filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.25));
   >.top{
     position: fixed;
     left: 50%;
     margin-left: -34px;
    
     background: #fff;
     bottom: 0;
     width: 68px;
     height: 68px;
     border-radius: 50%;
     text-align: center;
     line-height: 95px;
      .icon{
        opacity: .5;
        width:45px;
        height: 45px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
   }
   >.side{
     
     display: flex;
     justify-content: space-between;
     margin: 0 60px;
     height: 45px;
     line-height: 60px;

       .icon{
          opacity: .5;
          width:30px;
          height: 30px;
          vertical-align: -0.15em;
          fill: currentColor;
          overflow: hidden;
      }
   }
   .selected .icon{
     opacity:1;
   }
 }
</style>
