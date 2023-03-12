import { model, Schema } from 'mongoose';

interface ICharacter {
  image: string
  name: string
  ranking: number
  comment: string
}

const characterSchema = new Schema<ICharacter>({
  image: {
    type: String,
    required: [true, 'The image is required'],
  },
  name: {
    type: String,
    required: [true, 'The name is required'],
  },
  ranking: {
    type: Number,
    required: [true, 'The ranking is required'],
  },
  comment: {
    type: String,
    required: [true, 'The comment is required'],
  },
})

characterSchema.methods.toJSON = function modifyObject() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...character } = this.toObject();

  character.id = _id;

  return character;
}

const CharacterModel = model( 'Character', characterSchema )

export {
  CharacterModel,
  ICharacter
}
