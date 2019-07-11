# KaiUI

UI Component library for building KaiOS apps. All components and views are navigable using a phone's d-pad and softkeys.

## Building and Usage

KaiUI has not yet been deployed to NPM. To build and play with the demo app run:

```
npm install
npm start
```

For use in the KaiOS emulator you must build

```
npm build
```

And update the hashes of the JS and CSS files in [index.html](https://github.com/AdrianMachado/KaiUI/blob/master/index.html) manually before running.

## Components

All specs can be found [here](https://developer.kaiostech.com/design-guide/ui-component)

| Name                | Preview                                                                                  | Spec                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Header              | ![alt text](./component_screenshots/kaiui-header.png 'Header')                           | ![alt text](./component_screenshots/kaiui-header-spec.png 'Header spec')       |
| Tabs                | ![alt text](./component_screenshots/kaiui-tabs.gif 'Tabs')                               | ![alt text](./component_screenshots/kaiui-tabs-spec.png 'Header spec')         |
| SoftKey             | ![alt text](./component_screenshots/kaiui-softkey.png 'Tabs')                            | ![alt text](./component_screenshots/kaiui-softkey-spec.png 'Header spec')      |
| Text List Item      | ![alt text](./component_screenshots/kaiui-text-list-item.png 'Text List Item')           | ![alt text](./component_screenshots/kaiui-list-item-spec.png 'List item spec') |
| Body Text List Item | ![alt text](./component_screenshots/kaiui-body-text-list-item.png 'Body Text List Item') |                                                                                |
| Icon List Item      | ![alt text](./component_screenshots/kaiui-icon-list-item.png 'Icon List Item')           |                                                                                |
| Arrow List Item     | ![alt text](./component_screenshots/kaiui-arrow-list-item.png 'Arrow Text List Item')    |                                                                                |
| Separator           | ![alt text](./component_screenshots/kaiui-separator.png 'Separator')                     | ![alt text](./component_screenshots/kaiui-separator-spec.png 'Separator spec') |
| Checkbox            | ![alt text](./component_screenshots/kaiui-cb.png 'Checkbox')                             | ![alt text](./component_screenshots/kaiui-cb-spec.png 'Checkbox spec')         |
| Radio Button        | ![alt text](./component_screenshots/kaiui-rb.png 'Radio button')                         |                                                                                |
| Progress-Download   | ![alt text](./component_screenshots/kaiui-progress-download.png 'Download')              | ![alt text](./component_screenshots/kaiui-progress-spec.png 'Progress spec')   |
| Progress-Buffering  | ![alt text](./component_screenshots/kaiui-progress-buffer.gif 'Buffering')               |                                                                                |
| Slider              | WIP                                                                                      | ![alt text](./component_screenshots/kaiui-slider.png 'Slider')                 |
| Button              | TBD                                                                                      | ![alt text](./component_screenshots/kaiui-button.png 'Button')                 |
| Input               | TBD                                                                                      | ![alt text](./component_screenshots/kaiui-input.png 'Input')                   |

## Views

Navigation details can be found [here](https://developer.kaiostech.com/design-guide/basic-navigation)

| Name     | Preview                                                              |
| -------- | -------------------------------------------------------------------- |
| TabView  | ![alt text](./component_screenshots/kaiui-tab-view.gif 'Tab view')   |
| ListView | ![alt text](./component_screenshots/kaiui-list-view.gif 'List view') |

## Popups

TBD

## Notifications

TBD

## Themes

Standardized colors and font stylings are found in the [themes directory](https://github.com/AdrianMachado/KaiUI/tree/master/src/theme). These follow the KaiOS [typography standard](https://developer.kaiostech.com/design-guide/typography).
Currently you can customize the focus color of components through props, font color is a WIP.

## Icons

KaiUI uses custom icons provided on the KaiOS developer portal. These are included in the kai-icons font and incorporated as [SASS/CSS classes](https://github.com/AdrianMachado/KaiUI/tree/master/src/kai-font).

# Contributing

There's much work to be done on building out more UI components, writing tests, and integrating typing (probably using flow).
