// orders.repository.mock.ts

import { Repository } from 'typeorm';
import { Orders } from '../entity/orders.entity';

// Mock OrderRepository
export class OrderRepositoryMock {
  async find() {
    // Implement as needed
  }

  async create() {
    // Implement as needed
  }

  async save() {
    // Implement as needed
  }

  async findOne() {
    // Implement as needed
  }

  async remove() {
    // Implement as needed
  }
}

// Mock ItemRepository
export class ItemRepositoryMock {
  async findByIds() {
    // Implement as needed
  }
}
