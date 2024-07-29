module Main where

import Prelude
import Effect (Effect)
import Controller (init, mainLoop)

main :: Effect Unit
main = init *> mainLoop

