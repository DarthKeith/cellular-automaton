module ArrayUtil
( buildZeroArray
, buildZeroArray2D
, randInt
, buildRandCubeArray
, buildRandColorArray
) where

import Prelude
import Data.Int (floor, toNumber)
import Data.Traversable (sequence, traverse)
import Data.Unfoldable (replicate)
import Effect (Effect)
import Effect.Random (random)

type Array2D a = Array (Array a)
type Array3D a = Array (Array (Array a))
type Color = Array Int

buildZeroArray :: Int -> Array Int
buildZeroArray len = replicate len 0

buildZeroArray2D :: Int -> Int -> Array2D Int
buildZeroArray2D rows cols = replicate rows (buildZeroArray cols)

randInt :: Int -> Effect Int
randInt n = do
    r <- random
    pure $ floor (toNumber n * r)

buildRandArray :: Int -> Int -> Effect (Array Int)
buildRandArray len n = traverse (\_ -> randInt n) $ buildZeroArray len

buildRandArray2D :: Int -> Int -> Int -> Effect (Array2D Int)
buildRandArray2D rows cols n =
    traverse (\_ -> buildRandArray cols n) $ buildZeroArray rows

buildRandCubeArray :: Int -> Effect (Array3D Int)
buildRandCubeArray n =
    traverse (\_ -> buildRandArray2D n n n) $ buildZeroArray n

randColor :: Effect Color
randColor = sequence [byte, byte, byte]
    where byte = randInt 256

buildRandColorArray :: Int -> Effect (Array Color)
buildRandColorArray len = traverse (\_ -> randColor) $ buildZeroArray len

