import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface ActorModel extends Base {}

export class ActorModel extends TimeStamps {
  @prop({ unique: true })
  slug: string

  @prop()
  name: string

  @prop()
  photo: string
}
