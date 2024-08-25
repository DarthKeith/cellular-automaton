module ControlPanel (component) where

import Prelude
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP

type State = Unit
type Action = Unit

component :: forall q i o m. H.Component q i o m
component =
    H.mkComponent
        { initialState: \_ -> unit
        , render
        , eval: H.mkEval H.defaultEval
        }

text :: forall w i. String -> Array (HH.HTML w i)
text s = [HH.text s]

label :: forall w i. String -> HH.HTML w i
label s = HH.label_ $ text s

render :: forall cs m. State -> H.ComponentHTML Action cs m
render _ = HH.div [HP.id "ctrl-panel"]
    [ HH.div [HP.class_ $ HH.ClassName "ctrl-group"]
        [ label "Model Controls"
        , HH.div [HP.class_ $ HH.ClassName "btn-group"]
            [ label "Number of States"
            , HH.div_
                [ HH.button_ $ text "2"
                , HH.button_ $ text "3"
                , HH.button_ $ text "4"
                , HH.button_ $ text "5"
                ]
            ]
        , HH.button [HP.id "rule-btn"] $ text "Change Rule"
        , HH.button [HP.id "reset-btn"] $ text "Randomize Cells"
        ]
    , HH.div [ HP.class_ $ HH.ClassName "ctrl-group" ]
        [ label "Display Controls"
        , HH.div [HP.class_ $ HH.ClassName "btn-group"]
            [ label "Cell Size"
            , HH.div_
                [ HH.button_ $ text "1"
                , HH.button_ $ text "2"
                , HH.button_ $ text "3"
                , HH.button_ $ text "4"
                , HH.button_ $ text "5"
                , HH.button_ $ text "10"
                , HH.button_ $ text "20"
                ]
            ]
        , HH.button [HP.id "color-btn"] $ text "Change Colors"
        , HH.button [HP.id "pause-btn"] $ text "Play/Pause"
        ]
    ]

