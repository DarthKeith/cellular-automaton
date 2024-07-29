module Constants where

import Prelude

frameDuration :: Number
frameDuration = 1000.0 / fps
    where fps = 60.0

resizeDelay :: Int
resizeDelay = 200

maxNumStates :: Int
maxNumStates = 5

defaultNumStates :: Int
defaultNumStates = 4

defaultCellSize :: Int
defaultCellSize = 5

scrollDist :: Int
scrollDist = 2

