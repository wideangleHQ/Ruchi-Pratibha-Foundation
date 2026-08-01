import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error' | 'warn'>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
      ],
    });
  }

  async onModuleInit(): Promise<void> {
    this.$on('error', (event) => {
      this.logger.error(`Prisma error: ${event.message}`);
    });

    this.$on('warn', (event) => {
      this.logger.warn(`Prisma warning: ${event.message}`);
    });

    await this.$connect();
    this.logger.log('Database connection established');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.log('Database connection closed');
  }

  async softDelete(model: string, id: string, deletedBy?: string): Promise<void> {
    const data: Record<string, unknown> = { deletedAt: new Date() };
    if (deletedBy) {
      data.deletedBy = deletedBy;
    }

    const delegate = (this as unknown as Record<string, { update: (args: Record<string, unknown>) => Promise<unknown> }>)[model];
    await delegate.update({
      where: { id },
      data,
    });
  }
}
