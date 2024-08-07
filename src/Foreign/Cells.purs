module Foreign.Cells
( Cells
, generateCells
, iterateCells
, makeCells
, readCells
) where

import Prelude
import ArrayUtil (Rule)
import Data.Function.Uncurried (Fn2, runFn2)
import Effect (Effect)

foreign import data Cells :: Type    -- Mutable integer array type
foreign import generateCellsImpl :: Fn2 (Unit -> Effect Int) Cells (Effect Unit)
foreign import iterateCellsImpl :: Fn2 Rule Cells (Effect Unit)
foreign import makeCellsImpl :: Int -> Effect Cells
foreign import readCellsImpl :: Cells -> Effect (Array Int)

makeCells :: Int -> Effect Cells
makeCells = makeCellsImpl

readCells :: Cells -> Effect (Array Int)
readCells = readCellsImpl

generateCells :: (Unit -> Effect Int) -> Cells -> Effect Unit
generateCells gen cells = runFn2 generateCellsImpl gen cells

iterateCells :: Rule -> Cells -> Effect Unit
iterateCells rule cells = runFn2 iterateCellsImpl rule cells

