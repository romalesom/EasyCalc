import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser(payload: any) {
    return payload; // Return Token Payload
  }
}
