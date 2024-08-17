module ControlPanel (component) where

import Prelude
import Halogen as H
import Halogen.HTML as HH

type State = Unit
type Action = Unit

component :: forall q i o m. H.Component q i o m
component =
    H.mkComponent
        { initialState: \_ -> unit
        , render
        , eval: H.mkEval H.defaultEval
        }

render :: forall cs m. State -> H.ComponentHTML Action cs m
render _ = HH.div_
    [ HH.label_
        [ HH.text "Contorl Panel" ]
    , HH.button_
        [ HH.text "Button" ]
    ]

