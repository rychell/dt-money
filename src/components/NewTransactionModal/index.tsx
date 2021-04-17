import { FormEvent, useContext, useState } from "react";
import ReactModal from "react-modal";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransactions } from "../../hooks/useTransactions";
interface NewTransactionModalProps {
    isOpen: boolean
    onRequestClose: () => void
}
export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const [type, setType] = useState('deposit')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [value, setValue] = useState(0)

    const {createTransaction} = useTransactions()

    function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault()
        const data = {
            title,
            amount: value,
            type,
            category
        }
        createTransaction(data)

        setTitle('');
        setType('deposit')
        setCategory('')
        setValue(0)
        onRequestClose()
    }
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            className='react-modal-content'
        >
            <button className="react-close-modal" type="button" onClick={onRequestClose}>
                <img src={closeImg} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
                <input 
                    type="text"
                    placeholder="Título"
                    onChange={event => setTitle(event.target.value)}
                    value={title}
                />
                <input 
                    type="number"
                    placeholder="Valor"
                    onChange={event => setValue(Number(event.target.value))}
                    value={value}
                />
                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => setType('deposit')}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        onClick={() => setType('withdraw')}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input 
                    type="text"
                    placeholder="Categoria"
                    onChange={event => setCategory(event.target.value)}
                    value={category}
                />
                <button type="submit">Cadastrar</button>
            </Container>

        </ReactModal>
    )
}