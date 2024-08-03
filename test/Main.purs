module Test.Main where

import Prelude

import Effect (Effect)
import Effect.Class.Console (log)
import Test.ArrayUtil as ArrayUtilTest

main :: Effect Unit
main = do
    log "Testing module ArrayUtil"
    ArrayUtilTest.run

