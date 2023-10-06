import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export const UserAuth = createParamDecorator(
  (filterData: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.usuario) {
      if (filterData) {
        return request.usuario[filterData];
      } else {
        return request.usuario;
      }
    } else {
      throw new ForbiddenException(
        'Usuário logado não encontrado no banco de dados, Use o AuthGuard para obter o usuário',
      );
    }
  },
);
