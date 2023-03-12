import { CharacterModel, ICharacter } from '../models/character.model';

export const saveCharacter = async ( characterData: ICharacter ): Promise<ICharacter> => {
  const character = await new CharacterModel( characterData ).save();

  return character;
}
