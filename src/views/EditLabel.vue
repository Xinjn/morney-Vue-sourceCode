<template>
    <Layout>

        <nav>
                <div class="tabs">
                    <router-link :to="`/labels`" >
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
            <p>
                <FormItem :value="currentTag.name" @update:value="update" fieldName="标签名"
                placeholder="请输入标签名" />
            </p>
        </div>

        <div class="button-wrapper">
            <Button class="button" @click="submit"> 
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#true"></use>
                </svg>
            </Button>

            <Button class="button" @click="cancel">
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#false"></use>
                </svg>
            </Button>
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

@Component({
    components:{FormItem,Button},
})
export default class EditLabel extends Vue{
    initName = ''
    updateName = ''
    get currentTag(){
        return this.$store.state.currentTag
    }

    created(){
        const id = this.$route.params.id
        this.$store.commit('fetchTags')
        this.$store.commit('setCurrentTag',id)
        if(!this.currentTag){
            this.$router.replace('/404')
        }
        this.initName = this.currentTag.name 
    }
    update(name:string){
        this.updateName = name

    }
    remove(){
        if(this.currentTag){
            this.$store.commit('removeTag',this.currentTag.id)
        }
    }
    submit(){
       
        
        if(this.currentTag){
            this.$store.commit('updateTag',{id:this.currentTag.id,name:this.updateName === '' ? this.initName : this.updateName})
        }
       this.$router.push('/')
    }
    cancel(){
      return this.$router.push('/')
    }
    goback(){
        this.$router.back()
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
background: #FFFFFF;
box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.1);
border-radius: 10px;
margin:15px  auto 30px auto;
width: 90%;
color: #1D3D57;
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