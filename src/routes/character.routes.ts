import { Router } from 'express'

import { createCharacter, deleteCharacter, getCharacters } from '../controllers/character.controller'

const routerCharacter = Router()

routerCharacter.post( '/', createCharacter )

routerCharacter.get( '/', getCharacters )

routerCharacter.delete( '/:id', deleteCharacter )

export default routerCharacter
