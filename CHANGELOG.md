# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Optimize Docker development setup for faster container startup and smaller context size ([#79](https://github.com/GabFiterman/sete-janelas/issues/79))

### Fixed

- Prevent app state reset when minimizing/restoring windows — windows are now hidden via CSS instead of unmounted from the DOM, preserving iframe navigation, video playback position, and PDF viewer state (including preventing PDF page unmounts and zoom level recalculation when minimized) ([#56](https://github.com/GabFiterman/sete-janelas/issues/56))
- Restore minimized windows (like File Explorer) when double-clicking workspace directory shortcuts or launching them again ([#57](https://github.com/GabFiterman/sete-janelas/issues/57))

## [1.1.2] - 2026-06-05

### Added

- InternetExplorer added to maximized-start list and initial workspace items
- Dynamic window titles for Internet Explorer based on current URL
- Image thumbnails in File Explorer
- Persistent focus for Internet Explorer webview
- Acrobat Reader PDF viewer with auto-zoom, page navigation, and lazy rendering
- Search functionality in File Explorer with VFS fuzzy lookup
- Mobile responsive File Explorer with sidebar toggling

### Changed

- Challenge Lett project URL updated
- VS Code theme colors refined
- Mobile layout responsiveness improved
- LokaWeb renamed (from LocaWeb)
- Media center image/video flow modularized into hooks and reusable components
- Agent rule docs reorganized into new rules directory
- Start menu layout and base styles improved

### Fixed

- Acrobat Reader file path handling corrected
