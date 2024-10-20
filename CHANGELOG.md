# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Management script (`manage-locamera.sh`) for easier project management
- Local HTTPS support for development environment
- SSL certificate generation and renewal scripts
- Docker Compose configurations for both development and production environments
- Nginx configuration for serving the application and handling SSL
- User registration and login functionality with JWT authentication
- ReCAPTCHA integration for user registration
- Incidents management with weekly incident count
- Camera management interface
- Leaflet map integration for displaying camera locations
- Popup and tooltip information for each camera on the map
- Responsive design for better mobile experience

### Changed
- Updated Docker configurations to use environment variables
- Improved error handling and fallback for image loading
- Enhanced security with HTTPS and proper authentication flow

### Fixed
- Image loading issues with fallback to default icon
- CORS issues in API
- Various bug fixes and performance improvements

## [0.1.0] - 2023-10-19
- Initial release

[Unreleased]: https://gitlab.com/your-username/locamera/compare/v0.1.0...HEAD
[0.1.0]: https://gitlab.com/your-username/locamera/releases/tag/v0.1.0
