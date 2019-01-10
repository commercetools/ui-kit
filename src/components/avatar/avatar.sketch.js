import React from 'react';
import { Avatar } from 'ui-kit';
import Combinations from '../../../test/combinations';
import { Suite, SketchSpec } from '../../../test/percy';

export default (
  <Suite>
    <SketchSpec label="Avatar">
      <Combinations
        name="Avatar"
        config={{ size: ['s', 'm', 'l'] }}
        render={(combi, name) => (
          <React.Fragment key={name}>
            <div data-sketch-symbol={`${name}/unknown-hash/regular`}>
              <Avatar
                gravatarHash="foo"
                firstName="John"
                lastName="Doe"
                size={combi.size}
              />
            </div>

            <div data-sketch-symbol={`${name}/unknown-hash/highlighted`}>
              <Avatar
                gravatarHash="foo"
                firstName="John"
                lastName="Doe"
                size={combi.size}
                isHighlighted={true}
              />
            </div>

            <div data-sketch-symbol={`${name}/known-hash/highlighted`}>
              <Avatar
                gravatarHash="205e460b479e2e5b48aec07710c08d50"
                firstName="John"
                lastName="Doe"
                size={combi.size}
                isHighlighted={true}
              />
            </div>

            <div data-sketch-symbol={`${name}/known-hash/regular`}>
              <Avatar
                gravatarHash="205e460b479e2e5b48aec07710c08d50"
                firstName="John"
                lastName="Doe"
                size={combi.size}
              />
            </div>
          </React.Fragment>
        )}
      />
    </SketchSpec>
  </Suite>
);
