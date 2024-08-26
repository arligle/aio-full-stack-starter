import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { AuthConfig } from '../config/auth';
import type { IAccessTokenPayload } from '../vo/payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authConfig: AuthConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.accessTokenSecret,
    });
  }

  async validate(payload: IAccessTokenPayload): Promise<IAccessTokenPayload> {
    return payload;
  }
}
