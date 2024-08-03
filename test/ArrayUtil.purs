module Test.ArrayUtil (run) where

import Prelude
import ArrayUtil as A

import Data.Int (pow)
import Effect (Effect)
import Effect.Class.Console (log)
import Effect.Unsafe (unsafePerformEffect)
import Test.QuickCheck (Result, quickCheck, (<?>))
import Test.QuickCheck.Arbitrary (class Arbitrary, arbitrary)

newtype PosInt = PosInt Int

instance Arbitrary PosInt where
    arbitrary = PosInt <<< (_ `mod` n) <$> arbitrary
        where n = pow 2 31

prop_randIntRange :: PosInt -> Result
prop_randIntRange (PosInt n) = x >= 0 && x < n <?> msg
    where
    x = unsafePerformEffect $ A.randInt n
    msg = "        n = " <> show n <> "\n"
       <> "randInt n = " <> show x

prop_randInt1 :: Result
prop_randInt1 = x == 0 <?> msg
    where
    x = unsafePerformEffect $ A.randInt 1
    msg = "randInt 1 = " <> show x

run :: Effect Unit
run = do
    log "Test: 0 <= randInt n < n (for positive n)"
    quickCheck prop_randIntRange
    log "Test: randInt 1 == 0"
    quickCheck prop_randInt1

