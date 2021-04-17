import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface ITransaction {
    title: string
    category: string
    type: string
    amount: number
    createdAt: string
    id: number
}
type TransactionRequest = Omit<ITransaction, 'id' | 'createdAt'>

interface TransactionProviderProps{
    children: ReactNode
}

interface ITransactionsContext{
    transactions: ITransaction[],
    createTransaction: (transaction: TransactionRequest) => void
}
const TransactionsContext = createContext<ITransactionsContext>({} as ITransactionsContext)


export function TransactionsProvider({children}: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<ITransaction[]>([])

    useEffect(() => {
        api.get('/transactions')
            .then(response => {
                setTransactions(response.data.transactions)
            })
    }, [])

    function createTransaction(transactionRequest: TransactionRequest){
        api.post('/transactions', {...transactionRequest, createdAt: new Date()}).then(({data}) => {
            const {transaction} = data
            setTransactions([...transactions, transaction])
        })
    }
    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext)

    return context
}