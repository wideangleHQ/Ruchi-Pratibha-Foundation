import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from '../interfaces';

export const CurrentUser = createParamDecorator(
  (data: keyof AuthenticatedRequest['user'] | string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest & { dashboardSession?: any }>();
    const user = request.user || request.dashboardSession;

    if (!user) {
      return undefined;
    }

    if (data) {
      if (data === 'sub' && !user.sub && (user as any).sessionId) {
        return (user as any).sessionId;
      }
      return (user as any)[data];
    }

    return user;
  },
);
