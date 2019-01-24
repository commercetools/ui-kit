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

  let style_of_constraint = c => {
    let def =
      switch (c) {
      | Scale => width(`percent(100.))
      | Xs => minWidth(CustomProperties.constraintXs)
      | S => minWidth(CustomProperties.constraintS)
      | M => minWidth(CustomProperties.constraintM)
      | L => minWidth(CustomProperties.constraintL)
      | Xl => minWidth(CustomProperties.constraintXl)
      };
    style([def]);
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