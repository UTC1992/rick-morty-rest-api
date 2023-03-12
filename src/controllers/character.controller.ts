import { Request, Response } from 'express'

import { CharacterModel, ICharacter } from '../models/character.model'
import { saveCharacter } from '../services/character.services'

export const createCharacter = async ( req: Request, res: Response ): Promise<void> => {
  try{
    const { image, name, ranking, comment } = req.body as ICharacter

    const character = await saveCharacter({ image, name, ranking, comment })

    res.status( 201 ).json({
      status: 'success',
      data: character
    })

  } catch ( error ) {
    res.status( 500 ).json({
      status: 'error',
      error: 'Ops, it was an error in server'
    })
  }
}

export const getCharacters = async ( req: Request, res: Response ): Promise<void> => {
  try{
    const characters = await CharacterModel.find()

    res.status( 200 ).json({
      status: 'success',
      data: characters
    })

  } catch ( error ) {
    res.status( 500 ).json({
      status: 'error',
      error: 'Ops, it was an error in server'
    })
  }
}

export const deleteCharacter = async ( req: Request, res: Response ): Promise<void> => {
  try{
    const { id } = req.params

    await CharacterModel.findByIdAndDelete( id )

    res.status( 200 ).json({
      status: 'success',
      data: undefined
    })

  } catch ( error ) {
    res.status( 500 ).json({
      status: 'error',
      error: 'Ops, it was an error in server'
    })
  }
}
