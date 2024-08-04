{ name = "my-project"
, dependencies =
    [ "arrays"
    , "console"
    , "effect"
    , "foldable-traversable"
    , "integers"
    , "prelude"
    , "quickcheck"
    , "random"
    , "unfoldable"
    ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
