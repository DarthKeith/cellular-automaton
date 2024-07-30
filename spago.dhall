{ name = "my-project"
, dependencies =
    [ "console"
    , "effect"
    , "foldable-traversable"
    , "integers"
    , "prelude"
    , "random"
    , "unfoldable"
    ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
