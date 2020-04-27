import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import GetTransactionsService from '../services/GetTransactionsService';
import GetBalanceService from '../services/GetBalanceService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(transactionsRepository);
const getTransactionsService = new GetTransactionsService(transactionsRepository);
const getBalanceService = new GetBalanceService(transactionsRepository);

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = getTransactionsService.execute();
    const balance = getBalanceService.execute();

    return response.json({
      transactions,
      balance
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const transaction = createTransactionService.execute({
      title,
      value,
      type
    });

    return response.status(201).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
