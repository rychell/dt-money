import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';
import { GlobalStyle } from './styles/global';



function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)
  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }
  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false)
  }
  ReactModal.setAppElement('#root')
  return (
    <TransactionsProvider>

      <GlobalStyle />
      <Header
        onOpenNewTransactionModal={handleOpenNewTransactionModal}
      />
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />
      <Dashboard />

    </TransactionsProvider>

  );
}

export default App;
