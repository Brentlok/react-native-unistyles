import type { UnistylesNavigationBar as NavigationBarSpec } from '../specs/NavigtionBar'
import type { UnistylesStatusBar as StatusBarSpec } from '../specs/StatusBar'

export const StatusBar: StatusBarSpec = {
    width: 0,
    height: 0,
    setStyle: () => {},
    setHidden: () => {},
    setBackgroundColor: () => {},
    equals: () => true,
    toString: () => 'StatusBar',
    __type: 'web',
    name: 'StatusBar'
}

export const NavigationBar: NavigationBarSpec = {
    width: 0,
    height: 0,
    setHidden: () => {},
    setBackgroundColor: () => {},
    equals: () => true,
    toString: () => 'NavigationBar',
    __type: 'web',
    name: 'NavigationBar'
}

export const UnistylesShadowRegistry = {
    name: 'UnistylesShadowRegistry',
    __type: 'web',
    equals: () => true,
    toString: () => 'UnistylesShadowRegistry',
    dispose: () => {},
    add: () => {},
    remove: () => {},
}