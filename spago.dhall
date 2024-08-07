{ name = "cellular-automaton"
, dependencies =
    [ "arrays"
    , "console"
    , "effect"
    , "foldable-traversable"
    , "functions"
    , "integers"
    , "prelude"
    , "quickcheck"
    , "random"
    , "unfoldable"
    ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
