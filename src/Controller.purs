module Controller (init, mainLoop) where

import Prelude
import Effect (Effect)

foreign import init :: Effect Unit
foreign import mainLoop :: Effect Unit

