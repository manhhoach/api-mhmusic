import { SetMetadata } from '@nestjs/common';
import { IS_SKIP_AUTH } from './constants';


export const SkipAuth = () => SetMetadata(IS_SKIP_AUTH, true);
