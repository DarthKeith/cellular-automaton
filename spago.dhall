{ name = "my-project"
, dependencies =
    [ "console"
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
