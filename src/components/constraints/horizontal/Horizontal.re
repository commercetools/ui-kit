type constraint_ =
  | Scale
  | Xs
  | S
  | M
  | L
  | Xl;

module Styles = {
  open Css;

  let container = style([width(`percent(100.)), position(`relative)]);

  let style_of_constraint = c =>
    switch (c) {
    | Scale => style([width(`percent(100.))])
    | Xs => style([minWidth(`px(50))])
    | S => style([minWidth(`px(132))])
    | M => style([minWidth(`px(355))])
    | L => style([minWidth(`px(400))])
    | Xl => style([minWidth(`px(768))])
    };
};

let component = ReasonReact.statelessComponent(__MODULE__);

[@genType]
let make = (~constraint_=Scale, children) => {
  ...component,
  render: _self =>
    <div
      className=(
        Css.merge([
          Styles.container,
          Styles.style_of_constraint(constraint_),
        ])
      )>
      children
    </div>,
};

