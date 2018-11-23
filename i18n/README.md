# Translations (i18n)

The UI Kit uses `react-intl` to manage the messages and translations. The core messages are defined in `messages.js` files, usually colocated with the related React component.

The translations for the supported languages are then pulled into `./i18n/{en,de,es}.json` files.

> **DO NOT EDIT THOSE FILES DIRECTLY, TRANSLATIONS SHOULD BE DONE ONLY IN TRANSIFEX!!!**

### Translation software (Transifex)

Translations should be managed using the Transifex software: https://www.transifex.com/commercetools/ui-kit/

## Structure

This folder contains the **JSON** files with the translated messages. The key of the messages corresponds to the `message.id` defined in each `messages.js`.

#### Localized files

There is one file for each language (e.g. `en`, `de`, `es`, etc.).

#### Source file

There is one special file `core.json`, which is used by Transifex as the **source file**. The messages in this file are used as the base for translating to the other locale. When you add new messages in the React components, those message keys will first go into the `core.json` (_read below_).

## Adding new messages

When you add new messages in the React components `messages.js`, you need to run `yarn i18n:build` which will extract the new messages and put them into the `core.json`.
Then you can push and merge the changes to `master`. At this point, there is a step in CI that will push the source file `core.json` to Transifex thus making the new keys available to the system.

## Translating messages

When new messages are pushed to Transifex, you can start translating them using the [translation software](https://www.transifex.com/commercetools/ui-kit/).
Once the messages have been translated and reviewed, you can pull them into the repository by running the command `yarn i18n:pull`. The command will sync the `{locale}.json` files in case something changed and will sync `en.json` -> `core.json`. This is to ensure that the english source messages are up-to-date when there needs to be a translation to another language.

## Can I update the JSON files manually?

No, I must not do that! Make sure to always use the scripts `i18n:build` and `i18n:pull` to keep messages in sync.
