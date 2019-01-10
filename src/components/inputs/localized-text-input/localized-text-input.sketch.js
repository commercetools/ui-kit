import React from 'react';
import { LocalizedTextInput } from 'ui-kit';
import Combinations from '../../../../test/combinations';
import { Suite, SketchSpec } from '../../../../test/percy';

const value = {
  en: '',
  de: '',
  es: '',
};

export default (
  <Suite>
    <SketchSpec label="LocalizedTextInput">
      <Combinations
        name="LocalizedTextInput"
        config={{
          horizontalConstraint: ['s', 'm', 'l', 'xl', 'scale'],
          isDisabled: [true, false],
          hasError: [true, false],
          isReadOnly: [true, false],
          defaultExpandLanguages: [true, false],
          hideLanguageExpansionControls: [true, false],
        }}
        skip={combi =>
          combi.hideLanguageExpansionControls && combi.defaultExpandLanguages
        }
        render={(combi, name) => (
          <div key={name} data-sketch-symbol={name}>
            <LocalizedTextInput
              value={value}
              onChange={() => {}}
              selectedLanguage="en"
              horizontalConstraint={combi.horizontalConstraint}
              isDisabled={combi.disabled}
              isReadOnly={combi.readOnly}
              defaultExpandLanguages={combi.defaultExpandLanguages}
              hideLanguageExpansionControls={
                combi.hideLanguageExpansionControls
                  ? undefined
                  : combi.hideLanguageExpansionControls
              }
            />
          </div>
        )}
      />
    </SketchSpec>
  </Suite>
);
