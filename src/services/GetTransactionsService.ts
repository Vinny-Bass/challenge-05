import TransactionRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class GetTransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute(): Transaction[] {
    const transactions = this.transactionRepository.all();
    return transactions;
  }
}

export default GetTransactionService;
