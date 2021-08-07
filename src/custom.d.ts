type RootState = {
    accountList:Account[] ,
    recordList: RecordItem[],
    createRecordError: Error | null,
    createTagError:Error | null,
    tagList: Tag[],
    currentTag?: Tag
    currentAccount?: Account,
    currentRecord:  RecordItem[],
}
type RecordItem = {
    tags:Tag[]
    notes:string
    type:string
    amount:number
    createdAt?: string
    id: string
    account:string
}

type Tag = {
    id: string;
    name: string;
    icon:string
}

type Account = {
    amount: string,
    id: string;
    title: string,
    icon: string,
}

type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => "success" | "duplicated"
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    remove:(id:string) => boolean
    save:() => void
}

interface Window {
}