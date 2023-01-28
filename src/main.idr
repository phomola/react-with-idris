module Main

import React

record State where
    constructor MkState
    count : Int

total app : State -> App State
app state = do
    MkApp state $ \context => mkDiv [
        mkH1 "React with Idris",
        mkDiv "Clicked \{ (getState context).count } times",
        mkButton context "Click me" (\state => { count := state.count + 1 } state)
    ]

total main : IO ()
main = do
    runApp $ app $ MkState 0

