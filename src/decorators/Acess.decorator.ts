import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enums';

export const ACESS_KEY = 'roles';
export const Acess = (...role: Role[]) => SetMetadata(ACESS_KEY, role);
