import { Token } from './token.model';
import { User } from './user.model';

User.hasOne(Token);
Token.belongsTo(User);
