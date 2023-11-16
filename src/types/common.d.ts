import { UserRole } from '@modules/user/user.dto';
import { Session, SessionData } from 'express-session';

export interface CustomSessionFields {
  user?: {
    id: number;
    role: UserRole;
  };
}

export interface RequestWithSession {
  session: Session & Partial<SessionData> & CustomSessionFields;
}

export interface ApolloContext {
  req: RequestWithSession;
}
