import { Request, Response, NextFunction } from 'express';

export class BaseController<T> {
  protected repository: any;

  constructor(repository: any) {
    this.repository = repository;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await this.repository.findAll(req.query);
      res.json(items);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await this.repository.findById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Not found' });
      res.json(item);
    } catch (err) {
      next(err);
    }
    return;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newItem = await this.repository.create(req.body);
      res.status(201).json(newItem);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await this.repository.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: 'Not found' });
      res.json(updated);
    } catch (err) {
      next(err);
    }
    return;
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await this.repository.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Not found' });
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
    return;
  }
} 