module Test.ArrayUtil (run) where

import Prelude
import ArrayUtil as A

import Data.Array (length)
import Data.Foldable (all)
import Data.Int (pow)
import Effect (Effect)
import Effect.Class.Console (log)
import Effect.Unsafe (unsafePerformEffect)
import Test.QuickCheck (Result, quickCheck, (<?>))
import Test.QuickCheck.Arbitrary (class Arbitrary, arbitrary)

newtype PosInt = PosInt Int
newtype PosInt50 = PosInt50 Int
newtype NatNum2k = NatNum2k Int

instance Arbitrary PosInt where
    arbitrary = PosInt <<< (_ + 1) <<< (_ `mod` maxInt) <$> arbitrary
        where maxInt = pow 2 31 - 1

instance Arbitrary PosInt50 where
    arbitrary = PosInt50 <<< (_ + 1) <<< (_ `mod` 50) <$> arbitrary

instance Arbitrary NatNum2k where
    arbitrary = NatNum2k <<< (_ `mod` 2000) <$> arbitrary

prop_ZeroArray :: NatNum2k -> Result
prop_ZeroArray (NatNum2k len) =
    (len == length arr) && (all (_ == 0) arr) <?> msg
    where
    arr = A.buildZeroArray len
    msg = "len = " <> show len
       <> "\nbuildZeroArray len:\n" <> show arr

prop_ZeroArray2D :: PosInt50 -> PosInt50 -> Result
prop_ZeroArray2D (PosInt50 rows) (PosInt50 cols) =
    (rows == length arr) && (all (\row -> length row == cols) arr) <?> msg
    where
    arr = A.buildZeroArray2D rows cols
    msg = "rows = " <> show rows <> "\n"
       <> "cols = " <> show cols <> "\n"
       <> "buildZeroArray2D rows cols:\n" <> show arr

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
    log "Test: buildZeroArray"
    quickCheck prop_ZeroArray
    log "Test: buildZeroArray2D"
    quickCheck prop_ZeroArray2D
    log "Test: 0 <= randInt n < n (for positive n)"
    quickCheck prop_randIntRange
    log "Test: randInt 1 == 0"
    quickCheck prop_randInt1

