module Model
( initModel
, iterate
, newRule
, numStates
, randomizeCells
, readCells
) where

import Prelude
import ArrayUtil (Rule, buildRandCubeArray, randInt)
import Data.Array (length)
import Effect (Effect)
import Foreign.Cells as C
import Foreign.Cells (Cells)

type Model = { rule :: Rule , cells :: Cells }

initModel :: Int -> Int -> Effect Model
initModel n len = do
    rule <- buildRandCubeArray n
    cells <- C.makeCells len
    pure { rule: rule, cells: cells }

numStates :: Model -> Int
numStates model = length model.rule

randomizeCells :: Model -> Effect Unit
randomizeCells model = C.generateCells (\_ -> randInt n) model.cells
    where n = numStates model

newRule :: Model -> Effect Model
newRule model = do
    let n = numStates model
    rule' <- buildRandCubeArray n
    pure $ model { rule = rule' }

iterate :: Model -> Effect Unit
iterate model = C.iterateCells model.rule model.cells

readCells :: Model -> Effect (Array Int)
readCells model = C.readCells model.cells

