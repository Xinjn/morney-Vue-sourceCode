import clone from '@/lib/clone'
import createId from '@/lib/createId'
import router from '@/router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    accountList:[] as Account[],
    recordList: [] as RecordItem[],
    createRecordError: null,
    createTagError:null,
    tagList: [] as Tag[],
    currentRecord: [] as RecordItem[],
    currentTag: undefined,
    currentAccount:undefined
  } as RootState,
  mutations: {
    //记录
    fetchRecords(state) { 
        state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
    },
    createRecord(state,record:RecordItem){
        const record2 = clone(record)
        record2.createdAt = record2.createdAt || new Date().toISOString()
        state.recordList.push(record2)
        store.commit('saveRecords')
    },
    saveRecords(state) {
        window.localStorage.setItem('recordList',JSON.stringify(state.recordList))
    },
    setcurrentRecord(state, id: string) {

      state.currentRecord =  state.recordList.filter(t => t.id ===id)
    },
    removeCurrentRecord(state,id:string){
        let index = -1
        for (let i = 0; i < state.recordList.length; i++){
            if (state.recordList[i].id === id) {
                index = i
                break
            }
        }
      if (index >= 0) {
        state.recordList.splice(index, 1)
        store.commit('saveRecords') 
        router.back()
      } else {
        window.alert('删除失败')
      }
    },
    //标签
    setCurrentTag(state, id: string) {
      state.currentTag =  state.tagList.filter(t => t.id ===id)[0]
    },
    fetchTags(state){
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]') 
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', {name: '餐饮',icon:'food'})
        store.commit('createTag', {name: '购物',icon:'shop'})
        store.commit('createTag', {name: '居住',icon:'home'})
        store.commit('createTag', {name: '娱乐',icon:'game'})
        store.commit('createTag', {name: '医疗',icon:'hospital'})
        store.commit('createTag', {name: '交通',icon:'traffic'})
        store.commit('createTag', {name: '默认',icon:'star'})
      }
    },
    createTag(state, payload: { name: string, icon: string }) {
      state.createTagError = null 
        const names = state.tagList.map(item => item.name)
      if (names.indexOf(payload.name) >= 0) {
          window.alert('标签名已重复')
          state.createRecordError = new Error('tag name duplicated') 
          return 
        }
      const id = createId().toString()
      state.tagList.push({ id: id, name: payload.name, icon: payload.icon })
      store.commit('saveTags')
        
    },
    updateTag(state, payload: { id: string, name: string }) {
      const { id,name} = payload
     const idList = state.tagList.map(item => item.id)
        if (idList.indexOf(id) >= 0) {
            const names = state.tagList.map(item => item.name)
            if (names.indexOf(name) >= 0) {
            window.alert('标签名已重复')
            } else {
                const tag = state.tagList.filter(item => item.id === id)[0]
                tag.name = name
                store.commit('saveTags') 
            }
        }
    },
    removeTag(state,id:string){
        let index = -1
        for (let i = 0; i < state.tagList.length; i++){
            if (state.tagList[i].id === id) {
                index = i
                break
            }
        }
      if (index >= 0) {
        state.tagList.splice(index, 1)
        store.commit('saveTags') 
        router.back()
      } else {
        window.alert('删除失败')
      }
    },
    saveTags(state) {
        window.localStorage.setItem('tagList',JSON.stringify(state.tagList))
    },
    //账户
    fetchAccount(state){
      state.accountList = JSON.parse(window.localStorage.getItem('accountList') || '[]')
      if (!state.accountList || state.accountList.length === 0) {
        store.commit('createAccount', { id:createId().toString(),title: '现金钱包', icon: '', amount: '0' })
        store.commit('createAccount', { id:createId().toString(),title: '储蓄卡', icon: '', amount: '0' })
        store.commit('createAccount', { id:createId().toString(),title: '信用卡', icon: '', amount: '0' })
        store.commit('createAccount', { id:createId().toString(),title: '支付宝', icon: '', amount: '0'})
      }
      
    },
    createAccount(state, payload: { id:any,title:any,icon:any,amount:any }) {
      state.accountList.push({
        id:createId().toString(),
        title:payload.title,
        icon:payload.icon,
        amount:payload.amount
      })
      store.commit('saveAccount')
    },
    updateAccount(state, payload: { id:string,title: string, icon: string, amount: string }) {
      // const { id, title, icon, amount } = payload
      const idList = state.accountList.map(item => item.id) //获取列表
      if (idList.indexOf(payload.id) >= 0) {  //存在
                let List = state.accountList.filter(item => item.id === payload.id)[0]//当前账户
                List.title = payload.title
                List.icon = payload.icon
                List.amount = payload.amount
        List.id = payload.id
        
                

                store.commit('saveAccount') 
            
      }
    },
    removeAccount(state,id:string) {
        let index = -1
        for (let i = 0; i < state.accountList.length; i++){
            if (state.accountList[i].id === id) {
                index = i
                break
            }
        }
      if (index >= 0) {
        state.accountList.splice(index, 1)
        store.commit('saveAccount') 
        router.back()
      } else {
        window.alert('删除失败')
      }
    },
    saveAccount(state) {
        window.localStorage.setItem('accountList',JSON.stringify(state.accountList))
    },
    setCurrentAccount(state, id: string) {
      state.currentAccount =  state.accountList.filter(t => t.id ===id)[0]
    },
  }
})

export default store