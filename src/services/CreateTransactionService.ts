/**
 * STRUCTURE:
 * 1 - IMPORTS
 * 2 - TYPING (INTEFACE)
 * 3 - CLASS
 * 3.1 - DECLARE
 * 3.2 - INSTANTIATE
 * 3.3 - FUNCIONALITIES
 * 4 - EXPORT CLASS
 */

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (typeof value !== 'number') {
      throw Error('Value must be a number.');
    }

    if (typeof title !== 'string') {
      throw Error('Title must be a string.');
    }

    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type must be income or outcome.');
    }

    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > total) {
      throw Error("You don't have enought balance.");
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
