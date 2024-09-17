import { ColorScheme, Orientation, type AppTheme, type AppThemeName } from '../src/specs/types'
import type { MiniRuntime } from '../src/specs/UnistylesRuntime'
import { WebContentSizeCategory } from '../src/types'
import { NavigationBar, StatusBar } from './mock'
import { UnistylesState } from './state'
import { hexToRGBA, isServer, schemeToTheme } from './utils'

class UnistylesRuntimeBuilder {
    private lightMedia = this.getLightMedia()
    private darkMedia = this.getDarkMedia()

    private getLightMedia(): MediaQueryList | null {
        if (isServer()) {
            return null
        }

        if (!this.lightMedia) {
            this.lightMedia = window.matchMedia('(prefers-color-scheme: light)')
        }

        return this.lightMedia
    }

    private getDarkMedia(): MediaQueryList | null {
        if (isServer()) {
            return null
        }

        if (!this.darkMedia) {
            this.darkMedia = window.matchMedia('(prefers-color-scheme: dark)')
        }

        return this.darkMedia
    }

    get colorScheme() {
        switch (true) {
            case this.getLightMedia()?.matches:
                return ColorScheme.Light
            case this.getDarkMedia()?.matches:
                return ColorScheme.Dark
            default:
                return ColorScheme.Unspecified
        }
    }

    get themeName() {
        return UnistylesState.themeName
    }

    get contentSizeCategory() {
        return WebContentSizeCategory.Unspecified
    }

    get breakpoint() {
        return UnistylesState.breakpoint
    }

    get orientation() {
        if (isServer()) {
            return Orientation.Portrait
        }

        return screen.orientation.type.includes('portrait') ? Orientation.Portrait : Orientation.Landscape
    }

    get theme() {
        if (!this.themeName) {
            throw new Error('🦄 No theme selected!')
        }

        const theme = UnistylesState.themes.get(this.themeName)

        if (!theme) {
            throw new Error(`🦄 Theme "${this.themeName}" is not registered!`)
        }

        return theme
    }

    get pixelRatio() {
        return isServer() ? 1 : window.devicePixelRatio
    }

    get screen() {
        if (isServer()) {
            return {
                width: 0,
                height: 0
            }
        }

        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    get fontScale() {
        return 1
    }

    get insets() {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            ime: 0
        }
    }

    get statusBar() {
        return StatusBar
    }

    get rtl() {
        return isServer() ? true : document.documentElement.dir === 'rtl'
    }

    get hasAdaptiveThemes() {
        return UnistylesState.hasAdaptiveThemes
    }

    get navigationBar() {
        return NavigationBar
    }

    get miniRuntime(): MiniRuntime {
        return {
            colorScheme: this.colorScheme,
            themeName: this.themeName,
            contentSizeCategory: this.contentSizeCategory,
            breakpoint: this.breakpoint,
            orientation: this.orientation,
            pixelRatio: this.pixelRatio,
            screen: this.screen,
            fontScale: this.fontScale,
            insets: this.insets,
            statusBar: {
                width: this.statusBar.width,
                height: this.statusBar.height
            },
            navigationBar: {
                width: this.navigationBar.width,
                height: this.navigationBar.height,
            },
            rtl: this.rtl,
            hasAdaptiveThemes: this.hasAdaptiveThemes,
            name: 'MiniRuntime',
            toString: () => 'MiniRuntime',
            __type: 'web',
            equals: () => true,
        }
    }

    setTheme = (themeName: AppThemeName) => {
        if (!isServer()) {
            document.documentElement.classList.replace(UnistylesRuntime.themeName ?? '', themeName)
        }

        UnistylesState.themeName = themeName
    }

    setAdaptiveThemes = (isEnabled: boolean) => {
        UnistylesState.hasAdaptiveThemes = isEnabled

        if (!isEnabled) {
            return
        }

        this.setTheme(schemeToTheme(UnistylesRuntime.colorScheme))
    }

    setRootViewBackgroundColor = (hex: string, alpha?: number) => {
        if (isServer()) {
            return
        }

        document.documentElement.style.backgroundColor = alpha ? hexToRGBA(hex, alpha) : hex
    }

    setImmersiveMode = () => {}

    updateTheme = (themeName: AppThemeName, updater: (currentTheme: AppTheme) => AppTheme) => {
        const oldTheme = UnistylesState.rawThemes ? UnistylesState.rawThemes[themeName] : undefined

        if (!oldTheme || !UnistylesState.rawThemes) {
            throw new Error(`🦄 Theme "${themeName}" is not registered!`)
        }

        UnistylesState.rawThemes[themeName] = updater(oldTheme)
        UnistylesState.updateThemes()
    }

    getSSRUnistyles = () => UnistylesState.tags
}

export const UnistylesRuntime = new UnistylesRuntimeBuilder()
